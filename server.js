const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 60 * 1000 } // 2 horas
}));

// Helper para ler/escrever usuários
function readUsers() {
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    // Sincroniza com GitHub de forma assíncrona
    syncUsersToGithub();
}

// Middleware para verificar login
function checkAuth(req, res, next) {
    if (req.session.user) next();
    else res.redirect('/login.html');
}

// Middleware para admin
function checkAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') next();
    else res.status(403).send('Acesso negado');
}

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

async function syncUsersToGithub() {
    try {
        const users = readUsers(); // lê o arquivo local
        const content = Buffer.from(JSON.stringify(users, null, 2)).toString('base64');

        // Tenta atualizar o arquivo se existir
        let sha;
        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner: "carloszerah23",    // seu usuário
                repo: "site_imports",      // nome do repo
                path: "users.json"
            });
            sha = fileData.sha;
        } catch (err) {
            if (err.status !== 404) throw err; // se não for 404, relança
            // se 404, o arquivo não existe; vai criar
            sha = undefined;
        }

        await octokit.repos.createOrUpdateFileContents({
            owner: "carloszerah23",
            repo: "site_imports",
            path: "users.json",
            message: `Atualização do users.json - ${new Date().toLocaleString()}`,
            content,
            sha // undefined se for criar
        });

        console.log("users.json sincronizado com GitHub ✅");
    } catch (err) {
        console.error("Erro ao sincronizar users.json com GitHub:", err);
    }
}

// LOGIN (CORRIGIDO - sem verificação de senha)
app.post('/login', (req, res) => {
    const { username, device_id } = req.body;
    let users = readUsers();
    const user = users.find(u => u.username === username);

    if (!user) return res.json({ success: false, message: 'Usuário não encontrado' });
    if (user.blocked) return res.json({ success: false, message: 'Usuário bloqueado' });
    if (new Date(user.expiry_date) < new Date()) return res.json({ success: false, message: 'Acesso expirado' });
    if (user.device_id && user.device_id !== device_id) return res.json({ success: false, message: 'Device não autorizado' });

    // Registrar device se não houver
    if (!user.device_id) {
        user.device_id = device_id;
        writeUsers(users);
    }

    req.session.user = { username: user.username, role: user.role };
    res.json({ success: true });
});

// LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login.html');
});

// GET user info (para front-end)
app.get('/me', checkAuth, (req, res) => {
    res.json({ username: req.session.user.username, role: req.session.user.role });
});

// ADMIN: listar usuários
app.get('/admin/users', checkAuth, checkAdmin, (req, res) => {
    const users = readUsers();
    res.json(users);
});

// ADMIN: criar usuário (CORRIGIDO - data com horas)
app.post('/admin/users', checkAuth, checkAdmin, (req, res) => {
    let users = readUsers();
    const { username, days, isAdmin } = req.body;

    if (!username) {
        return res.status(400).json({ success: false, message: 'Username é obrigatório' });
    }

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: 'Usuário já existe' });
    }

    // Calcular data de expiração com horas (24 horas por dia)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + (days || 1) * 24);

    const newUser = {
        username,
        password: '', // Senha vazia pois não é mais necessária
        role: isAdmin ? 'admin' : 'user',
        blocked: false,
        expiry_date: expiryDate.toISOString(), // Mantém data completa com horas
        device_id: ''
    };

    users.push(newUser);
    writeUsers(users);
    res.json({ success: true, user: newUser });
});

// ADMIN: eliminar usuário
app.post('/admin/users/:username/delete', checkAuth, checkAdmin, (req, res) => {
    try {
        let users = readUsers();
        const { username } = req.params;

        // Validar parâmetro
        if (!username || username.trim() === '') {
            return res.status(400).json({ success: false, message: 'Username inválido' });
        }

        const userIndex = users.findIndex(u => u.username === username);
        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        // Não permitir deletar o próprio usuário admin logado
        if (username === req.session.user.username) {
            return res.status(400).json({ success: false, message: 'Não pode eliminar a si mesmo' });
        }

        users.splice(userIndex, 1);
        writeUsers(users);
        res.json({ success: true, message: 'Usuário eliminado com sucesso' });
    } catch (error) {
        console.error('Erro ao eliminar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
});

// ADMIN: atualizar usuário (CORRIGIDO - adiciona/remove horas)
app.post('/admin/users/:username', checkAuth, checkAdmin, (req, res) => {
    let users = readUsers();
    const { username } = req.params;
    const { blocked, addDays, removeDays, resetDevice } = req.body;

    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    const user = users[userIndex];

    if (blocked !== undefined) user.blocked = blocked;

    if (addDays) {
        const expiry = new Date(user.expiry_date);
        expiry.setHours(expiry.getHours() + parseInt(addDays) * 24); // Adiciona horas
        user.expiry_date = expiry.toISOString();
    }

    if (removeDays) {
        const expiry = new Date(user.expiry_date);
        expiry.setHours(expiry.getHours() - parseInt(removeDays) * 24); // Remove horas
        user.expiry_date = expiry.toISOString();
    }

    if (resetDevice) user.device_id = '';

    writeUsers(users);
    res.json({ success: true, user });
});

// NOVA ROTA: Atualizar dias considerando hora atual
app.post('/admin/users/:username/days', checkAuth, checkAdmin, (req, res) => {
    try {
        let users = readUsers();
        const { username } = req.params;
        const { days, operation, updateFromNow } = req.body;
        
        // Buscar usuário
        const userIndex = users.findIndex(u => u.username === username);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const user = users[userIndex];
        let newExpiryDate;

        if (updateFromNow) {
            // Calcular a partir da hora atual
            const now = new Date();
            if (operation === 'add') {
                newExpiryDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
            } else if (operation === 'remove') {
                // Se está removendo dias, verifica se a data atual já passou
                const currentExpiry = new Date(user.expiry_date);
                if (currentExpiry < now) {
                    // Se já expirou, começa da hora atual
                    newExpiryDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
                } else {
                    // Se ainda não expirou, remove da data de expiração atual
                    newExpiryDate = new Date(currentExpiry.getTime() - (days * 24 * 60 * 60 * 1000));
                }
            }
        } else {
            // Lógica anterior (para compatibilidade)
            const currentExpiry = new Date(user.expiry_date);
            if (operation === 'add') {
                newExpiryDate = new Date(currentExpiry.getTime() + (days * 24 * 60 * 60 * 1000));
            } else if (operation === 'remove') {
                newExpiryDate = new Date(currentExpiry.getTime() - (days * 24 * 60 * 60 * 1000));
            }
        }

        // Atualizar no array de usuários
        user.expiry_date = newExpiryDate.toISOString();
        writeUsers(users);

        res.json({ 
            success: true, 
            newExpiryDate: newExpiryDate.toISOString(),
            message: `${operation === 'add' ? 'Adicionados' : 'Removidos'} ${days} dias com sucesso`
        });

    } catch (error) {
        console.error('Erro ao atualizar dias:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
