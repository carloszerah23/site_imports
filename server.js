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

// LOGIN
app.post('/login', (req, res) => {
    const { username, password, device_id } = req.body;
    let users = readUsers();
    const user = users.find(u => u.username === username);

    if (!user) return res.json({ success: false, message: 'Usuário não encontrado' });
    if (user.password !== password) return res.json({ success: false, message: 'Senha incorreta' });
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

// ADMIN: criar usuário (CORRIGIDO)
app.post('/admin/users', checkAuth, checkAdmin, (req, res) => {
    let users = readUsers();
    const { username, password, days, isAdmin } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username e senha são obrigatórios' });
    }

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: 'Usuário já existe' });
    }

    // Calcular data de expiração
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (days || 1));

    const newUser = {
        username,
        password,
        role: isAdmin ? 'admin' : 'user',
        blocked: false,
        expiry_date: expiryDate.toISOString().split('T')[0],
        device_id: ''
    };

    users.push(newUser);
    writeUsers(users);
    res.json({ success: true, user: newUser });
});

// ADMIN: eliminar usuário - MELHORADA
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

        // Não permitir deletar outros admins
        // if (users[userIndex].role === 'admin') {
        //     return res.status(400).json({ success: false, message: 'Não pode eliminar outros administradores' });
        // }

        users.splice(userIndex, 1);
        writeUsers(users);
        res.json({ success: true, message: 'Usuário eliminado com sucesso' });
    } catch (error) {
        console.error('Erro ao eliminar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
});

// ADMIN: atualizar usuário (bloquear, desbloquear, dias, device_id) - NOVO
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
        expiry.setDate(expiry.getDate() + parseInt(addDays));
        user.expiry_date = expiry.toISOString().split('T')[0];
    }

    if (removeDays) {
        const expiry = new Date(user.expiry_date);
        expiry.setDate(expiry.getDate() - parseInt(removeDays));
        user.expiry_date = expiry.toISOString().split('T')[0];
    }

    if (resetDevice) user.device_id = '';

    writeUsers(users);
    res.json({ success: true, user });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));