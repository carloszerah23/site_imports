let currentClass = 'Classe A';
let currentCategory = 'Cabeçote';
let selectedParts = {};
let inflation = 1.0000;
let partsData = {};

const classSelect = document.getElementById('class-select');
const categoryButtons = document.querySelectorAll('.category-btn');
const currentCategoryElement = document.getElementById('current-category');
const partsListElement = document.getElementById('parts-list');
const summaryItemsElement = document.getElementById('summary-items');
const inflationInput = document.getElementById('inflation-input');
const inflationSlider = document.getElementById('inflation-slider');

// Elementos da sidebar
const totalPriceSidebarElement = document.getElementById('total-price-sidebar');
const carPriceSidebarInput = document.getElementById('car-price-sidebar');
const paymentPriceSidebarInput = document.getElementById('payment-price-sidebar');
const profitSidebarElement = document.getElementById('profit-sidebar');

fetch('/me')
    .then(res => res.json())
    .then(user => {
        if (user.role === 'admin' || user.role === 'user') {
            document.body.classList.remove('hidden');
            // Inicializar cor do lucro como amarelo
            profitSidebarElement.classList.add('profit-zero');
        } else {
            window.location.href = '/login.html';
        }
    })
    .catch(() => {
        window.location.href = '/login.html';
    });

document.addEventListener('DOMContentLoaded', () => {
    fetch('precos.json')
        .then(res => res.json())
        .then(data => {
            partsData = data;
            loadCategoryParts();
        })
        .catch(err => {
            partsListElement.innerHTML = `<div class="error">Erro ao carregar os dados: ${err}</div>`;
        });

    // Alterar classe
    classSelect.addEventListener('change', () => {
        currentClass = classSelect.value;
        selectedParts = {};

        // Limpar campos de preço (como quando abre o site)
        carPriceSidebarInput.value = "Lp$ ";
        paymentPriceSidebarInput.value = "Lp$ ";

        // MANTER a inflação atual sem alteração

        // Voltar para a primeira categoria (Cabeçote)
        currentCategory = 'Cabeçote';
        currentCategoryElement.textContent = 'Cabeçote';

        // Atualizar botões da categoria
        categoryButtons.forEach(b => b.classList.remove('active'));
        const firstCategoryBtn = document.querySelector('.category-btn[data-category="Cabeçote"]');
        if (firstCategoryBtn) {
            firstCategoryBtn.classList.add('active');
        }

        loadCategoryParts();
        updateSummary();
    });

    // Alterar categoria
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            if (!category) return;
            currentCategory = category;
            currentCategoryElement.textContent = category;
            categoryButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            loadCategoryParts();
        });
    });

    // Controle deslizante de inflação
    inflationSlider.addEventListener('input', () => {
        inflation = parseFloat(inflationSlider.value);
        inflationInput.value = inflation.toFixed(4);
        loadCategoryParts();
        updateSummary();
    });

    // Entrada manual de inflação
    inflationInput.addEventListener('input', () => {
        let value = inflationInput.value;
        value = value.replace(/[^\d,.]/g, '');

        const hasComma = value.includes(',');
        const hasDot = value.includes('.');

        if (hasComma && hasDot) {
            const commaIndex = value.indexOf(',');
            const dotIndex = value.indexOf('.');
            if (commaIndex < dotIndex) {
                value = value.replace('.', '');
            } else {
                value = value.replace(',', '');
            }
        }

        if (value !== inflationInput.value) {
            inflationInput.value = value;
        }
    });

    inflationInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyInflation();
        }
    });

    inflationInput.addEventListener('blur', () => {
        applyInflation();
    });

    // Inputs de preço da sidebar
    carPriceSidebarInput.addEventListener('input', () => {
        formatCurrencyInputSidebar(carPriceSidebarInput);
        updateProfit();
    });

    paymentPriceSidebarInput.addEventListener('input', () => {
        formatCurrencyInputSidebar(paymentPriceSidebarInput);
        updateProfit();
    });

    // Botão limpar seleção no sumário
    document.getElementById('clear-selection-btn').addEventListener('click', () => {
        selectedParts = {};

        // Limpar campos de preço (como quando abre o site)
        carPriceSidebarInput.value = "Lp$ ";
        paymentPriceSidebarInput.value = "Lp$ ";

        // MANTER a inflação atual sem alteração

        // Voltar para a primeira categoria (Cabeçote)
        currentCategory = 'Cabeçote';
        currentCategoryElement.textContent = 'Cabeçote';

        // Atualizar botões da categoria
        categoryButtons.forEach(b => b.classList.remove('active'));
        const firstCategoryBtn = document.querySelector('.category-btn[data-category="Cabeçote"]');
        if (firstCategoryBtn) {
            firstCategoryBtn.classList.add('active');
        }

        updateSummary();
        loadCategoryParts();
    });

    // Botão expandir/recolher sumário
    document.getElementById('expand-summary-btn').addEventListener('click', toggleSummary);
});

function applyInflation() {
    let valueStr = inflationInput.value.replace(',', '.');
    let value = parseFloat(valueStr) || 1.0;

    if (value < 1) value = 1;
    if (value > 3) value = 3;

    inflation = value;
    inflationInput.value = inflation.toFixed(4);
    inflationSlider.value = inflation;

    loadCategoryParts();
    updateSummary();
}

function formatCurrencyInputSidebar(input) {
    let value = input.value.replace(/[^\d]/g, '');

    // Não adiciona "0" automaticamente
    if (value === "") {
        input.value = "Lp$ ";
    } else {
        input.value = "Lp$ " + value;
    }
    updateProfit();
}

function loadCategoryParts() {
    partsListElement.innerHTML = '<div class="loading">Carregando peças...</div>';
    setTimeout(() => {
        partsListElement.innerHTML = '';
        if (!partsData[currentClass] || !partsData[currentClass][currentCategory]) {
            partsListElement.innerHTML = '<p class="error">Nenhuma peça disponível para esta categoria.</p>';
            return;
        }
        const categoryData = partsData[currentClass][currentCategory];


        for (const [subcat, items] of Object.entries(categoryData)) {
            // Título da subcategoria
            const subcatTitle = document.createElement('h3');
            subcatTitle.textContent = subcat;
            subcatTitle.style.gridColumn = '1 / -1';
            subcatTitle.style.margin = '1rem 0 0.5rem 0';
            subcatTitle.style.color = 'var(--accent-color)';
            subcatTitle.style.fontSize = '1.1rem';
            subcatTitle.style.borderBottom = '1px solid var(--border-color)';
            subcatTitle.style.paddingBottom = '0.5rem';
            partsListElement.appendChild(subcatTitle);

            for (const [name, price] of Object.entries(items)) {
                const partCard = document.createElement('div');
                partCard.className = 'part-card';
                partCard.dataset.subcat = subcat;
                partCard.dataset.name = name;

                // Verifica se esta peça está selecionada
                const isSelected = selectedParts[currentCategory] &&
                    selectedParts[currentCategory][subcat] &&
                    selectedParts[currentCategory][subcat].name === name;

                if (isSelected) {
                    partCard.classList.add('selected');
                }

                const partName = document.createElement('div');
                partName.className = 'part-name';
                partName.textContent = name;

                const partPrice = document.createElement('div');
                partPrice.className = 'part-price';
                partPrice.textContent = `Lp$ ${Math.round(price * inflation)}`;

                partCard.appendChild(partName);
                partCard.appendChild(partPrice);

                partCard.addEventListener('click', () => {
                    // Verifica se já existe uma peça selecionada nesta subcategoria
                    const existingSelection = selectedParts[currentCategory] &&
                        selectedParts[currentCategory][subcat];

                    if (existingSelection && existingSelection.name === name) {
                        // Se clicar na mesma peça, remove a seleção
                        delete selectedParts[currentCategory][subcat];
                        if (Object.keys(selectedParts[currentCategory]).length === 0) {
                            delete selectedParts[currentCategory];
                        }
                        partCard.classList.remove('selected');
                    } else {
                        // Remove seleção anterior da mesma subcategoria
                        if (existingSelection) {
                            const previousCard = document.querySelector(`.part-card[data-subcat="${subcat}"].selected`);
                            if (previousCard) {
                                previousCard.classList.remove('selected');
                            }
                        }

                        // Seleciona a nova peça
                        selectPart(currentCategory, subcat, name, price);
                        partCard.classList.add('selected');
                    }
                    updateSummary();
                });

                partsListElement.appendChild(partCard);
            }
        }
    }, 200);
}


function selectPart(category, subcat, name, price) {
    if (!selectedParts[category]) selectedParts[category] = {};
    selectedParts[category][subcat] = { name, price };
    updateSummary();
}

function updateSummary() {
    summaryItemsElement.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    // Criar um array ordenado baseado na estrutura do JSON
    const orderedParts = [];

    // Percorrer as categorias na ordem do JSON
    for (const category of Object.keys(partsData[currentClass] || {})) {
        if (selectedParts[category]) {
            // Para cada categoria selecionada, percorrer as subcategorias na ordem do JSON
            for (const subcategory of Object.keys(partsData[currentClass][category] || {})) {
                if (selectedParts[category][subcategory]) {
                    orderedParts.push({
                        category,
                        subcategory,
                        part: selectedParts[category][subcategory]
                    });
                }
            }
        }
    }

    // Agora adicionar as peças na ordem correta
    for (const { category, subcategory, part } of orderedParts) {
        itemCount++;
        const itemEl = document.createElement('div');
        itemEl.className = 'summary-item';
        itemEl.dataset.category = category;
        itemEl.dataset.subcategory = subcategory;

        const itemInfo = document.createElement('div');
        itemInfo.className = 'summary-item-info';

        const itemName = document.createElement('div');
        itemName.className = 'summary-item-name';
        itemName.textContent = part.name;

        const itemDetails = document.createElement('div');
        itemDetails.className = 'summary-item-details';
        itemDetails.textContent = `${category} - ${subcategory}`;

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemDetails);

        const itemPrice = document.createElement('span');
        itemPrice.className = 'summary-item-price';
        const finalPrice = Math.round(part.price * inflation);
        itemPrice.textContent = `Lp$ ${finalPrice}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'summary-item-remove';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique no botão dispare o evento do item
            delete selectedParts[category][subcategory];
            if (Object.keys(selectedParts[category]).length === 0) delete selectedParts[category];
            updateSummary();
            loadCategoryParts();
        });

        itemEl.appendChild(itemInfo);
        itemEl.appendChild(itemPrice);
        itemEl.appendChild(removeBtn);

        // Adiciona evento de clique para navegar até a categoria
        itemEl.addEventListener('click', (e) => {
            if (!e.target.closest('.summary-item-remove')) {
                navigateToCategory(category, subcategory);
            }
        });

        summaryItemsElement.appendChild(itemEl);

        total += finalPrice;
    }

    // Atualiza total na sidebar
    totalPriceSidebarElement.textContent = `Lp$ ${total}`;

    // Atualiza estado do botão limpar seleção
    const clearSelectionBtn = document.getElementById('clear-selection-btn');

    if (itemCount > 0) {
        clearSelectionBtn.disabled = false;
    } else {
        clearSelectionBtn.disabled = true;
    }

    updateProfit();
}

function updateProfit() {
    const carPriceText = carPriceSidebarInput.value.replace("Lp$ ", "");
    const paymentPriceText = paymentPriceSidebarInput.value.replace("Lp$ ", "");

    const carPrice = carPriceText === "" ? 0 : parseInt(carPriceText) || 0;
    const paymentPrice = paymentPriceText === "" ? 0 : parseInt(paymentPriceText) || 0;

    let totalCustomization = 0;
    for (const subcats of Object.values(selectedParts)) {
        for (const part of Object.values(subcats)) {
            totalCustomization += Math.round(part.price * inflation);
        }
    }

    const profit = (totalCustomization + carPrice) * -1 + paymentPrice;

    // Atualiza lucro na sidebar
    profitSidebarElement.textContent = `Lp$ ${profit}`;

    // Remove classes anteriores
    profitSidebarElement.classList.remove('profit-positive', 'profit-zero', 'profit-negative');

    // Adiciona classe baseada no valor
    if (profit > 0) {
        profitSidebarElement.classList.add('profit-positive');
    } else if (profit === 0) {
        profitSidebarElement.classList.add('profit-zero');
    } else {
        profitSidebarElement.classList.add('profit-negative');
    }
}

// Função para expandir/recolher o sumário
function toggleSummary() {
    const summary = document.querySelector('.summary');
    const expandBtn = document.getElementById('expand-summary-btn');
    const icon = expandBtn.querySelector('i');
    const partsContainer = document.querySelector('.parts-container');

    summary.classList.toggle('expanded');

    if (summary.classList.contains('expanded')) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');

        // Adiciona margem extra ao parts-container quando expandido
        const summaryHeight = summary.offsetHeight;
        partsContainer.style.marginBottom = `${summaryHeight + 20}px`;
    } else {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');

        // Remove a margem extra quando recolhido
        partsContainer.style.marginBottom = '1rem';
    }
}

// Função para navegar até a categoria específica
function navigateToCategory(category, subcategory) {
    // Fecha o sumário se estiver expandido
    const summary = document.querySelector('.summary');
    const expandBtn = document.getElementById('expand-summary-btn');
    const icon = expandBtn.querySelector('i');
    const partsContainer = document.querySelector('.parts-container');

    if (summary.classList.contains('expanded')) {
        summary.classList.remove('expanded');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');

        // Remove a margem extra quando recolhido
        partsContainer.style.marginBottom = '1rem';
    }

    // Atualiza a categoria atual
    currentCategory = category;
    currentCategoryElement.textContent = category;

    // Atualiza os botões da categoria
    categoryButtons.forEach(b => b.classList.remove('active'));
    const categoryBtn = document.querySelector(`.category-btn[data-category="${category}"]`);
    if (categoryBtn) {
        categoryBtn.classList.add('active');
    }

    // Carrega as peças da categoria
    loadCategoryParts();

    // Rola até o topo da lista de peças
    document.querySelector('.parts-container').scrollIntoView({ behavior: 'smooth' });

    // Aguarda o carregamento das peças e então destaca a subcategoria
    setTimeout(() => {
        // Encontra o título da subcategoria
        const subcatTitles = document.querySelectorAll('.parts-grid h3');
        const targetSubcat = Array.from(subcatTitles).find(title =>
            title.textContent.toLowerCase().includes(subcategory.toLowerCase())
        );

        if (targetSubcat) {
            // Rola até a subcategoria
            targetSubcat.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Destaca temporariamente a subcategoria
            targetSubcat.classList.add('subcategory-highlight');

            setTimeout(() => {
                targetSubcat.classList.remove('subcategory-highlight');
            }, 3000);
        }
    }, 400);
}
