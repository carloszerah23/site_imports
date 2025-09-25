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
const totalPriceElement = document.getElementById('total-price');
const inflationInput = document.getElementById('inflation-input');
const inflationSlider = document.getElementById('inflation-slider');

const carPriceInput = document.getElementById('car-price');
const paymentPriceInput = document.getElementById('payment-price');
const profitElement = document.getElementById('profit');

fetch('/me')
    .then(res => res.json())
    .then(user => {
        if (user.role === 'admin' || user.role === 'user') {
            document.body.classList.remove('hidden'); // libera a página
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
        loadCategoryParts();
        updateSummary();
    });

    // Alterar categoria
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            if (!category) return;
            currentCategory = category;
            currentCategoryElement.textContent = category;
            categoryButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadCategoryParts();
        });
    });

    // Controle deslizante de inflação
    inflationSlider.addEventListener('input', () => {
        inflation = parseFloat(inflationSlider.value);
        updateInflationFields();
    });

    // Entrada manual de inflação
    inflationInput.addEventListener('input', () => {
        let value = inflationInput.value.replace(/[^\d.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
        inflation = parseFloat(value) || 1.0;
        updateInflationFields();
    });

    inflationInput.addEventListener('blur', validateInflation);
    inflationInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') validateInflation(); });

    // Inputs de preço e lucro
    carPriceInput.addEventListener('input', updateProfit);
    paymentPriceInput.addEventListener('input', updateProfit);
});

function updateInflationFields() {
    if (inflation < 1) inflation = 1;
    if (inflation > 3) inflation = 3;
    inflationInput.value = inflation.toFixed(4);
    inflationSlider.value = inflation;
    loadCategoryParts();
    updateSummary();
}

function validateInflation() { updateInflationFields(); }

function validateIntegerInput(e) {
    let value = e.target.value.replace(/[^\d]/g, ''); // remove tudo que não for número
    e.target.value = value;
}

// Adicione os listeners
carPriceInput.addEventListener('input', validateIntegerInput);
paymentPriceInput.addEventListener('input', validateIntegerInput);

function loadCategoryParts() {
    partsListElement.innerHTML = '<div class="loading">Carregando peças...</div>';
    setTimeout(() => {
        partsListElement.innerHTML = '';
        if (!partsData[currentClass] || !partsData[currentClass][currentCategory]) {
            partsListElement.innerHTML = '<p>Nenhuma peça disponível para esta categoria.</p>';
            return;
        }
        const categoryData = partsData[currentClass][currentCategory];

        partsListElement.style.display = 'grid';
        partsListElement.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        partsListElement.style.gap = '1rem';

        for (const [subcat, items] of Object.entries(categoryData)) {
            const subcatTitle = document.createElement('h3');
            subcatTitle.textContent = subcat;
            subcatTitle.style.gridColumn = '1 / -1';
            subcatTitle.style.margin = '1rem 0 0.5rem 0';
            partsListElement.appendChild(subcatTitle);

            for (const [name, price] of Object.entries(items)) {
                const partItem = document.createElement('div');
                partItem.className = 'part-item';
                partItem.dataset.subcat = subcat;

                if (selectedParts[currentCategory] &&
                    selectedParts[currentCategory][subcat] &&
                    selectedParts[currentCategory][subcat].name === name) {
                    partItem.classList.add('selected-part');
                }

                const partInfo = document.createElement('div');
                partInfo.className = 'part-info';

                const partName = document.createElement('div');
                partName.className = 'part-name';
                partName.textContent = name;

                const partPrice = document.createElement('div');
                partPrice.className = 'part-price';
                partPrice.textContent = `Lp$ ${Math.round(price * inflation)}`;

                partInfo.appendChild(partName);
                partInfo.appendChild(partPrice);
                partItem.appendChild(partInfo);

                // Adiciona o clique no card para selecionar/remover
                partItem.addEventListener('click', () => {
                    if (
                        selectedParts[currentCategory] &&
                        selectedParts[currentCategory][subcat] &&
                        selectedParts[currentCategory][subcat].name === name
                    ) {
                        delete selectedParts[currentCategory][subcat];
                        if (Object.keys(selectedParts[currentCategory]).length === 0) {
                            delete selectedParts[currentCategory];
                        }
                    } else {
                        selectPart(currentCategory, subcat, name, price);
                    }

                    // Atualiza visualmente os cards
                    const allItems = partsListElement.querySelectorAll('.part-item');
                    allItems.forEach(item => {
                        const partText = item.querySelector('.part-name').textContent;
                        const sub = item.dataset.subcat;

                        if (
                            selectedParts[currentCategory] &&
                            selectedParts[currentCategory][sub] &&
                            selectedParts[currentCategory][sub].name === partText
                        ) {
                            item.classList.add('selected-part');
                        } else {
                            item.classList.remove('selected-part');
                        }
                    });

                    updateSummary();
                });

                partsListElement.appendChild(partItem);
            }
        }
    }, 200);
}

function selectPart(category, subcat, name, price) {
    if (!selectedParts[category]) selectedParts[category] = {};
    selectedParts[category][subcat] = { name, price };
    updateSummary();
}

function formatCurrencyInput(e) {
    // remove tudo que não for número
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value === "") value = "0";
    e.target.value = "Lp$ " + value;
}

// aplicar nos campos
carPriceInput.addEventListener("input", formatCurrencyInput);
paymentPriceInput.addEventListener("input", formatCurrencyInput);

// inicializar com prefixo
carPriceInput.value = "Lp$ ";
paymentPriceInput.value = "Lp$ ";

function updateSummary() {
    summaryItemsElement.innerHTML = '';
    let total = 0;

    for (const [cat, subcats] of Object.entries(selectedParts)) {
        for (const [subcat, part] of Object.entries(subcats)) {
            const itemEl = document.createElement('div');
            itemEl.className = 'summary-item';
            itemEl.style.display = 'flex';
            itemEl.style.justifyContent = 'space-between';
            itemEl.style.alignItems = 'center';

            const itemName = document.createElement('span');
            itemName.textContent = `${cat} - ${subcat}: ${part.name}`;

            const rightContainer = document.createElement('span');
            rightContainer.style.display = 'flex';
            rightContainer.style.alignItems = 'center';
            rightContainer.style.gap = '0.5rem';

            const itemPrice = document.createElement('span');
            const finalPrice = part.price * inflation;
            itemPrice.textContent = `Lp$ ${Math.round(finalPrice)}`;
            itemPrice.className = 'part-price';

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.style.background = 'transparent';
            removeBtn.style.border = 'none';
            removeBtn.style.color = 'var(--secondary-color)';
            removeBtn.style.fontWeight = 'bold';
            removeBtn.style.cursor = 'pointer';
            removeBtn.addEventListener('click', () => {
                delete selectedParts[cat][subcat];
                if (Object.keys(selectedParts[cat]).length === 0) delete selectedParts[cat];

                const allItems = partsListElement.querySelectorAll('.part-item');
                allItems.forEach(item => {
                    const partText = item.querySelector('.part-name').textContent;
                    const sub = item.dataset.subcat;

                    // Verifica se esta peça ainda está selecionada
                    if (
                        selectedParts[currentCategory] &&
                        selectedParts[currentCategory][sub] &&
                        selectedParts[currentCategory][sub].name === partText
                    ) {
                        item.classList.add('selected-part');
                    } else {
                        item.classList.remove('selected-part');
                    }
                });

                updateSummary();
            });

            rightContainer.appendChild(itemPrice);
            rightContainer.appendChild(removeBtn);

            itemEl.appendChild(itemName);
            itemEl.appendChild(rightContainer);

            summaryItemsElement.appendChild(itemEl);

            total += finalPrice;
        }
    }

    totalPriceElement.textContent = `Lp$ ${Math.round(total)} (✅ Desmanche do Paul Lyce)`;

    updateProfit();
}

function updateProfit() {
    const carPrice = parseInt(carPriceInput.value.replace("Lp$ ", "")) || 0;
    const paymentPrice = parseInt(paymentPriceInput.value.replace("Lp$ ", "")) || 0;

    // Soma apenas as peças selecionadas
    let totalCustomization = 0;
    for (const subcats of Object.values(selectedParts)) {
        for (const part of Object.values(subcats)) {
            totalCustomization += Math.round(part.price * inflation);
        }
    }

    const profit = (totalCustomization + carPrice) * -1 + paymentPrice;
    profitElement.textContent = `Lp$ ${profit}`;
}