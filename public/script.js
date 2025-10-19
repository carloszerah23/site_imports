// ========== CONFIGURAÇÕES E CONSTANTES ==========
const CONFIG = {
    MIN_INFLATION: 1.0000,
    MAX_INFLATION: 3.0000,
    MIN_SIMILARITY_SCORE: 0.5,
    MIN_IMAGE_TEXT_LENGTH: 10,
    MIN_PRICE_THRESHOLD: 1000,
    DEBOUNCE_DELAY: 200,
    OCR_SPACE_API_KEY: 'helloworld',
    OCR_SPACE_API_URL: 'https://api.ocr.space/parse/image'
};

// ========== ESTADO DA APLICAÇÃO ==========
const AppState = {
    currentClass: 'Classe A',
    currentCategory: 'Cabeçote',
    selectedParts: {},
    inflation: 1.0000,
    partsData: {},
    ocrRequestsToday: 0,
    maxOcrRequests: 100,
    isProcessing: false
};

// ========== CACHE ==========
const Cache = {
    category: new Map(),
    similarity: new Map(),
    elements: null,
    ocrResults: new Map()
};

// ========== MAPEAMENTOS MELHORADOS E EXPANDIDOS ==========
const MAPPINGS = {
    categoryMapping: {
        // Motor - Expansão
        'bomba de oleo': { category: 'Motor', subcategory: 'bomba de óleo' },
        'bomba oleo': { category: 'Motor', subcategory: 'bomba de óleo' },
        'bomba óleo': { category: 'Motor', subcategory: 'bomba de óleo' },
        'bomba de óleo': { category: 'Motor', subcategory: 'bomba de óleo' },
        'bomba oleo p1': { category: 'Motor', subcategory: 'bomba de óleo' },
        'bomba de lubrificacao': { category: 'Motor', subcategory: 'bomba de óleo' },
        'oil pump': { category: 'Motor', subcategory: 'bomba de óleo' },

        'bronzinasas': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzinaas': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzina': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzin': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzinos': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzinaos': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzina biela': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzina motor': { category: 'Motor', subcategory: 'bronzinas' },
        'bearing': { category: 'Motor', subcategory: 'bronzinas' },
        'bearings': { category: 'Motor', subcategory: 'bronzinas' },

        'pistao': { category: 'Motor', subcategory: 'pistões' },
        'pistões': { category: 'Motor', subcategory: 'pistões' },
        'pista0': { category: 'Motor', subcategory: 'pistões' },
        'pistoes': { category: 'Motor', subcategory: 'pistões' },
        'pistöes': { category: 'Motor', subcategory: 'pistões' },
        'pistons': { category: 'Motor', subcategory: 'pistões' },
        'pistao forjado': { category: 'Motor', subcategory: 'pistões' },
        'piston forged': { category: 'Motor', subcategory: 'pistões' },

        'bronzina': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzinas': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzinos': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzina motor': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzina biela': { category: 'Motor', subcategory: 'bronzinas' },
        'bearing': { category: 'Motor', subcategory: 'bronzinas' },

        'biela': { category: 'Motor', subcategory: 'bielas' },
        'bielas': { category: 'Motor', subcategory: 'bielas' },
        'bleios': { category: 'Motor', subcategory: 'bielas' },
        'biela forjada': { category: 'Motor', subcategory: 'bielas' },
        'conecting rod': { category: 'Motor', subcategory: 'bielas' },
        'con rod': { category: 'Motor', subcategory: 'bielas' },

        'virabrequim': { category: 'Motor', subcategory: 'virabrequim' },
        'virabrequim forjado': { category: 'Motor', subcategory: 'virabrequim' },
        'crankshaft': { category: 'Motor', subcategory: 'virabrequim' },

        'bloco': { category: 'Motor', subcategory: 'bloco' },
        'bloco motor': { category: 'Motor', subcategory: 'bloco' },
        'bloco aluminio': { category: 'Motor', subcategory: 'bloco' },
        'engine block': { category: 'Motor', subcategory: 'bloco' },

        'carter': { category: 'Motor', subcategory: 'cárter' },
        'cárter': { category: 'Motor', subcategory: 'cárter' },
        'carter oleo': { category: 'Motor', subcategory: 'cárter' },
        'cárter óleo': { category: 'Motor', subcategory: 'cárter' },
        'oil pan': { category: 'Motor', subcategory: 'cárter' },

        // Cabeçote - Expansão
        'cabecote': { category: 'Cabeçote', subcategory: 'cabeçote' },
        'cabeçote': { category: 'Cabeçote', subcategory: 'cabeçote' },
        'head': { category: 'Cabeçote', subcategory: 'cabeçote' },
        'cylinder head': { category: 'Cabeçote', subcategory: 'cabeçote' },

        'coletor admissao': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'coletor admissão': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'coletor de admissao': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'coletor de admissão': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'admissao': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'admissão': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'intake manifold': { category: 'Cabeçote', subcategory: 'coletor de admissão' },

        'coletor escape': { category: 'Cabeçote', subcategory: 'coletor de escape' },
        'coletor de escape': { category: 'Cabeçote', subcategory: 'coletor de escape' },
        'escape': { category: 'Cabeçote', subcategory: 'coletor de escape' },
        'exhaust manifold': { category: 'Cabeçote', subcategory: 'coletor de escape' },

        'valvula': { category: 'Cabeçote', subcategory: 'válvulas' },
        'válvula': { category: 'Cabeçote', subcategory: 'válvulas' },
        'valvulas': { category: 'Cabeçote', subcategory: 'válvulas' },
        'válvulas': { category: 'Cabeçote', subcategory: 'válvulas' },
        'valve': { category: 'Cabeçote', subcategory: 'válvulas' },

        'tucho': { category: 'Cabeçote', subcategory: 'tuchos' },
        'tuchos': { category: 'Cabeçote', subcategory: 'tuchos' },
        'tucho valvula': { category: 'Cabeçote', subcategory: 'tuchos' },
        'lifter': { category: 'Cabeçote', subcategory: 'tuchos' },

        'comando': { category: 'Cabeçote', subcategory: 'comandos' },
        'comandos': { category: 'Cabeçote', subcategory: 'comandos' },
        'comando valvula': { category: 'Cabeçote', subcategory: 'comandos' },
        'camshaft': { category: 'Cabeçote', subcategory: 'comandos' },

        'mola': { category: 'Cabeçote', subcategory: 'molas' },
        'molas': { category: 'Cabeçote', subcategory: 'molas' },
        'mola valvula': { category: 'Cabeçote', subcategory: 'molas' },
        'spring': { category: 'Cabeçote', subcategory: 'molas' },

        'junta': { category: 'Cabeçote', subcategory: 'juntas' },
        'juntas': { category: 'Cabeçote', subcategory: 'juntas' },
        'junta cabecote': { category: 'Cabeçote', subcategory: 'juntas' },
        'gasket': { category: 'Cabeçote', subcategory: 'juntas' },

        // Turbo - Expansão
        'turbino': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbinos': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbina': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbinas': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbo': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbos': { category: 'Turbo', subcategory: 'Turbinas' },
        'hks': { category: 'Turbo', subcategory: 'Turbinas' },
        'garret': { category: 'Turbo', subcategory: 'Turbinas' },
        'masterpower': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbine': { category: 'Turbo', subcategory: 'Turbinas' },

        'intercooler': { category: 'Turbo', subcategory: 'intercooler' },
        'intercooler turbo': { category: 'Turbo', subcategory: 'intercooler' },
        'cooler': { category: 'Turbo', subcategory: 'intercooler' },

        'valvula alivio': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'valvula de alivio': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'válvula de alívio': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'wastegate': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'wgv': { category: 'Turbo', subcategory: 'válvula de alívio' },

        'valvula prioridade': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'valvula de prioridade': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'válvula de prioridade': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'valvula prioridadede': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'valvula de prioridadede': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'blow off': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'bov': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'alivio': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'prioridade': { category: 'Turbo', subcategory: 'válvula de prioridade' },

        // Supercharger - Expansão
        'supercharger': { category: 'SuperCharger', subcategory: 'polias' },
        'superchargers': { category: 'SuperCharger', subcategory: 'polias' },
        'super charger': { category: 'SuperCharger', subcategory: 'polias' },
        'sc': { category: 'SuperCharger', subcategory: 'polias' },
        'polia': { category: 'SuperCharger', subcategory: 'polias' },
        'polias': { category: 'SuperCharger', subcategory: 'polias' },
        'polio': { category: 'SuperCharger', subcategory: 'polias' },
        'pulley': { category: 'SuperCharger', subcategory: 'polias' },

        'compressor': { category: 'SuperCharger', subcategory: 'compressor' },
        'compressor sc': { category: 'SuperCharger', subcategory: 'compressor' },
        'blower': { category: 'SuperCharger', subcategory: 'compressor' },

        // ECU - Expansão
        'chip': { category: 'ECU', subcategory: 'chip' },
        'chip ecu': { category: 'ECU', subcategory: 'chip' },
        'reprogramacao': { category: 'ECU', subcategory: 'chip' },
        'remapeamento': { category: 'ECU', subcategory: 'chip' },
        'tuning': { category: 'ECU', subcategory: 'chip' },

        'modulo injecao': { category: 'ECU', subcategory: 'módulo de injeção' },
        'módulo de injeção': { category: 'ECU', subcategory: 'módulo de injeção' },
        'modulo de injecao': { category: 'ECU', subcategory: 'módulo de injeção' },
        'injection module': { category: 'ECU', subcategory: 'módulo de injeção' },
        'ftech': { category: 'ECU', subcategory: 'módulo de injeção' },

        // Óxido Nitroso - Expansão
        'nitro': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'nitrous': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'nos': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'nx': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'garrafa': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'garrafas': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'bottle': { category: 'Óxido Nitroso', subcategory: 'garrafas' },

        'bico injetor': { category: 'Óxido Nitroso', subcategory: 'bico injetor' },
        'bico nitro': { category: 'Óxido Nitroso', subcategory: 'bico injetor' },
        'injector': { category: 'Óxido Nitroso', subcategory: 'bico injetor' },
        'nozzle': { category: 'Óxido Nitroso', subcategory: 'bico injetor' },

        // Redução de Peso - Expansão
        'reducao': { category: 'Redução de Peso', subcategory: 'reduções' },
        'redução': { category: 'Redução de Peso', subcategory: 'reduções' },
        'reduções': { category: 'Redução de Peso', subcategory: 'reduções' },
        'weight reduction': { category: 'Redução de Peso', subcategory: 'reduções' },
        'lightweight': { category: 'Redução de Peso', subcategory: 'reduções' },
        'proreduction': { category: 'Redução de Peso', subcategory: 'reduções' },

        // Transmissão - Expansão
        'transmissao': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'transmissão': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'caixa marcha': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'caixa de marcha': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'caixa de marchas': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'bomba de oleo': { category: 'Motor', subcategory: 'bomba de óleo' },
        'bomba oleo': { category: 'Motor', subcategory: 'bomba de óleo' },
        'bomba óleo': { category: 'Motor', subcategory: 'bomba de óleo' },
        'bomba de óleo': { category: 'Motor', subcategory: 'bomba de óleo' },
        'oil pump': { category: 'Motor', subcategory: 'bomba de óleo' },

        'bronzinas': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzina': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzin': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzinos': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzina biela': { category: 'Motor', subcategory: 'bronzinas' },
        'bronzina motor': { category: 'Motor', subcategory: 'bronzinas' },
        'bearing': { category: 'Motor', subcategory: 'bronzinas' },
        'bearings': { category: 'Motor', subcategory: 'bronzinas' },

        'pistao': { category: 'Motor', subcategory: 'pistões' },
        'pistões': { category: 'Motor', subcategory: 'pistões' },
        'pista0': { category: 'Motor', subcategory: 'pistões' },
        'pistoes': { category: 'Motor', subcategory: 'pistões' },
        'pistöes': { category: 'Motor', subcategory: 'pistões' },
        'pistons': { category: 'Motor', subcategory: 'pistões' },

        'biela': { category: 'Motor', subcategory: 'bielas' },
        'bielas': { category: 'Motor', subcategory: 'bielas' },
        'bleios': { category: 'Motor', subcategory: 'bielas' },
        'conecting rod': { category: 'Motor', subcategory: 'bielas' },
        'con rod': { category: 'Motor', subcategory: 'bielas' },

        'virabrequim': { category: 'Motor', subcategory: 'virabrequim' },
        'crankshaft': { category: 'Motor', subcategory: 'virabrequim' },

        'bloco': { category: 'Motor', subcategory: 'bloco' },
        'bloco motor': { category: 'Motor', subcategory: 'bloco' },
        'engine block': { category: 'Motor', subcategory: 'bloco' },

        'carter': { category: 'Motor', subcategory: 'cárter' },
        'cárter': { category: 'Motor', subcategory: 'cárter' },
        'carter oleo': { category: 'Motor', subcategory: 'cárter' },
        'cárter óleo': { category: 'Motor', subcategory: 'cárter' },
        'oil pan': { category: 'Motor', subcategory: 'cárter' },

        // Cabeçote - Baseado no JSON
        'cabecote': { category: 'Cabeçote', subcategory: 'cabeçote' },
        'cabeçote': { category: 'Cabeçote', subcategory: 'cabeçote' },
        'head': { category: 'Cabeçote', subcategory: 'cabeçote' },
        'cylinder head': { category: 'Cabeçote', subcategory: 'cabeçote' },

        'coletor admissao': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'coletor admissão': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'coletor de admissao': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'coletor de admissão': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'admissao': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'admissão': { category: 'Cabeçote', subcategory: 'coletor de admissão' },
        'intake manifold': { category: 'Cabeçote', subcategory: 'coletor de admissão' },

        'coletor escape': { category: 'Cabeçote', subcategory: 'coletor de escape' },
        'coletor de escape': { category: 'Cabeçote', subcategory: 'coletor de escape' },
        'escape': { category: 'Cabeçote', subcategory: 'coletor de escape' },
        'exhaust manifold': { category: 'Cabeçote', subcategory: 'coletor de escape' },

        'valvula': { category: 'Cabeçote', subcategory: 'válvulas' },
        'válvula': { category: 'Cabeçote', subcategory: 'válvulas' },
        'valvulas': { category: 'Cabeçote', subcategory: 'válvulas' },
        'válvulas': { category: 'Cabeçote', subcategory: 'válvulas' },
        'valve': { category: 'Cabeçote', subcategory: 'válvulas' },

        'tucho': { category: 'Cabeçote', subcategory: 'tuchos' },
        'tuchos': { category: 'Cabeçote', subcategory: 'tuchos' },
        'lifter': { category: 'Cabeçote', subcategory: 'tuchos' },

        'comando': { category: 'Cabeçote', subcategory: 'comandos' },
        'comandos': { category: 'Cabeçote', subcategory: 'comandos' },
        'comando valvula': { category: 'Cabeçote', subcategory: 'comandos' },
        'camshaft': { category: 'Cabeçote', subcategory: 'comandos' },

        'mola': { category: 'Cabeçote', subcategory: 'molas' },
        'molas': { category: 'Cabeçote', subcategory: 'molas' },
        'spring': { category: 'Cabeçote', subcategory: 'molas' },

        'junta': { category: 'Cabeçote', subcategory: 'juntas' },
        'juntas': { category: 'Cabeçote', subcategory: 'juntas' },
        'gasket': { category: 'Cabeçote', subcategory: 'juntas' },

        // Turbo - Baseado no JSON
        'turbina': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbinas': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbo': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbos': { category: 'Turbo', subcategory: 'Turbinas' },
        'hks': { category: 'Turbo', subcategory: 'Turbinas' },
        'garret': { category: 'Turbo', subcategory: 'Turbinas' },
        'masterpower': { category: 'Turbo', subcategory: 'Turbinas' },
        'turbine': { category: 'Turbo', subcategory: 'Turbinas' },

        'intercooler': { category: 'Turbo', subcategory: 'intercooler' },
        'cooler': { category: 'Turbo', subcategory: 'intercooler' },

        'valvula alivio': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'valvula de alivio': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'válvula de alívio': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'wastegate': { category: 'Turbo', subcategory: 'válvula de alívio' },
        'wgv': { category: 'Turbo', subcategory: 'válvula de alívio' },

        'valvula prioridade': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'valvula de prioridade': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'válvula de prioridade': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'blow off': { category: 'Turbo', subcategory: 'válvula de prioridade' },
        'bov': { category: 'Turbo', subcategory: 'válvula de prioridade' },

        // Supercharger - Baseado no JSON
        'supercharger': { category: 'SuperCharger', subcategory: 'polias' },
        'super charger': { category: 'SuperCharger', subcategory: 'polias' },
        'sc': { category: 'SuperCharger', subcategory: 'polias' },
        'polia': { category: 'SuperCharger', subcategory: 'polias' },
        'polias': { category: 'SuperCharger', subcategory: 'polias' },
        'pulley': { category: 'SuperCharger', subcategory: 'polias' },

        'compressor': { category: 'SuperCharger', subcategory: 'compressor' },
        'blower': { category: 'SuperCharger', subcategory: 'compressor' },

        // ECU - Baseado no JSON
        'chip': { category: 'ECU', subcategory: 'chip' },
        'remapeamento': { category: 'ECU', subcategory: 'chip' },
        'tuning': { category: 'ECU', subcategory: 'chip' },

        'modulo injecao': { category: 'ECU', subcategory: 'módulo de injeção' },
        'módulo de injeção': { category: 'ECU', subcategory: 'módulo de injeção' },
        'modulo de injecao': { category: 'ECU', subcategory: 'módulo de injeção' },
        'injection module': { category: 'ECU', subcategory: 'módulo de injeção' },

        // Óxido Nitroso - Baseado no JSON
        'nitro': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'nitrous': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'nos': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'nx': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'garrafa': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'garrafas': { category: 'Óxido Nitroso', subcategory: 'garrafas' },
        'bottle': { category: 'Óxido Nitroso', subcategory: 'garrafas' },

        'bico injetor': { category: 'Óxido Nitroso', subcategory: 'bico injetor' },
        'bico nitro': { category: 'Óxido Nitroso', subcategory: 'bico injetor' },
        'injector': { category: 'Óxido Nitroso', subcategory: 'bico injetor' },

        // Redução de Peso - Baseado no JSON
        'reducao': { category: 'Redução de Peso', subcategory: 'reduções' },
        'redução': { category: 'Redução de Peso', subcategory: 'reduções' },
        'reduções': { category: 'Redução de Peso', subcategory: 'reduções' },
        'weight reduction': { category: 'Redução de Peso', subcategory: 'reduções' },

        // Transmissão - Baseado no JSON
        'transmissao': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'transmissão': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'caixa marcha': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'caixa de marcha': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'caixa de marchas': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'gearbox': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'transmission': { category: 'Transmissão', subcategory: 'caixa de marchas' },

        // Kit instalação/remoção
        'kit instalacao': { category: 'Turbo', subcategory: 'kit instalação' },
        'kit instalação': { category: 'Turbo', subcategory: 'kit instalação' },
        'kit turbo': { category: 'Turbo', subcategory: 'kit instalação' },
        'remover turbo': { category: 'Turbo', subcategory: 'remover tudo' },
        'kit supercharger': { category: 'SuperCharger', subcategory: 'kit instalação' },
        'remover supercharger': { category: 'SuperCharger', subcategory: 'remover tudo' },
        'kit nitro': { category: 'Óxido Nitroso', subcategory: 'kit instalação' },
        'gearbox': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'transmission': { category: 'Transmissão', subcategory: 'caixa de marchas' },
        'z-pro': { category: 'Transmissão', subcategory: 'caixa de marchas' }
    },

    partMapping: {
        // Mapeamentos existentes mantidos
        'takashing': 'TakaShing',
        'takashing p1': 'TakaShing P1',
        'proracing header s4': 'ProRacing Header S4',
        'takashing': 'TakaShing',
        'header s1': 'ProRacing Header S1',
        'header s2': 'ProRacing Header S2',
        'header s3': 'ProRacing Header S3',
        'header s4': 'ProRacing Header S4',
        'e street header': 'Edelbrock E-Street Header',
        'victor header': 'Edelbrock Victor Header',
        'powerport': 'TrickFlow PowerPort',
        'genx': 'TrickFlow GenX',
        'masterflow header': 'Edelbrock Masterflow Header',

        // Coletor de admissão
        'polido': 'TakaShing Polido',
        'plenum': 'TakaShing Plenum',
        'folego turbo individual': 'Folego Turbo Individual',
        'folego turbo variavel': 'Folego Turbo Variável',
        'variavel': 'ProRacing Variável',
        'gf50': 'Mann-Hummel GF50',
        'streetburner': 'TrickFlow StreetBurner',
        'trackheat variavel': 'TrickFlow TrackHeat Variável',
        'performer variavel': 'Edelbrock Perfomer Variável',
        'flathead variavel': 'Edelbrock Flathead Variável',

        // Comandos
        'comando 260': 'Comando 260',
        'comando 264': 'Comando 264',
        'comando 268': 'Comando 268',
        'comando 272': 'Comando 272',
        'comando 280': 'Comando 280',
        'comando 288': 'Comando 288',
        'comando 292': 'Comando 292',
        'comando 304': 'Comando 304',
        'comando 312': 'Comando 312',
        'comando 320': 'Comando 320',

        // Bronzinas
        'mahle': 'Mahle',
        'king aluminium': 'King Aluminium',
        'king cobre': 'King Cobre',
        'king pmaxkote': 'King pMaxKote',

        // Turbo
        'taka .36': 'TakaShing .36',
        'spa .42': 'SPA .42',
        'spa .48': 'SPA .48',
        'garret .58': 'Garret .58',
        'garret .63': 'Garret .63',
        'hks .70': 'HKS .70',
        'hks .82': 'HKS .82',
        'masterpower .70': 'MasterPower .70',
        'masterpower .82': 'MasterPower .82',
        'masterpower .84': 'MasterPower .84',

        // Válvulas
        'controllflow': 'HKS ControFlow',
        'gt ii': 'HKS GT II',

        // ECU
        'remapeamento ecu': 'Remapeamento ECU',
        'mns gt2': 'Chip MNS GT2',
        'folego turbo': 'Chip Folego Turbo',
        'gt r': 'Chip ProRacing GT-R',
        'ftech+ v2': 'ProRacing Ftech+ V2',
        'ftech+ v300': 'ProRacing Ftech+ V300',
        'ftech+ v450': 'ProRacing Ftech+ V450',

        // Redução de Peso
        'light pack': 'ProReduction Light Pack',
        'super pack': 'ProReduction Super Pack',
        'ultra pack': 'ProReduction Ultra Pack',
        'extreme pack': 'ProReduction Extreme Pack',
        'nismo pack': 'ProReduction Nismo Pack',
        'apex pack': 'ProReduction Apex Pack',

        // Transmissão
        'z pro one': 'Z-Pro One',
        'z pro carbon': 'Z-Pro Carbon',
        'header s4': 'ProRacing Header S4',
        'takashing bronzina': 'TakaShing',
        'bronzina takashing': 'TakaShing',
        'takao bronzina': 'Takao',
        'proracing obb+': 'ProRacing OBB+',
        'proracing obb +': 'ProRacing OBB+',
        'proracing obb plus': 'ProRacing OBB+',
        'proracing obbplus': 'ProRacing OBB+',

        // Para a versão básica, apenas se for explicitamente buscada
        'proracing obb basic': 'ProRacing OBB',
        'proracing obb standard': 'ProRacing OBB',
        'bronzina takao': 'Takao',
        'king aluminium bronzina': 'King Aluminium',
        'king cobre bronzina': 'King Cobre',
        'king pmaxkote bronzina': 'King pMaxKote',
        'king bronzina': 'King Aluminium',

        // Mapeamentos específicos para bronzinas
        'oem bronzina': 'OEM',
        'bronzina oem': 'OEM',
        'bronzina original': 'OEM',
        'header s 4': 'ProRacing Header S4',
        'header-s4': 'ProRacing Header S4',
        's4 header': 'ProRacing Header S4',
        'header4': 'ProRacing Header S4',
        'mohle': 'Mahle',
        'mahle': 'Mahle',
        'mahie': 'Mahle',
        'mohle bronzina': 'Mahle',
        'mahle bronzina': 'Mahle',
        'bronzina mohle': 'Mahle',
        'bronzina mahle': 'Mahle',
        'hks.70': 'HKS .70',
        'hks 70': 'HKS .70',
        'hks70': 'HKS .70',
        'hks.7o': 'HKS .70',
        'hks.7O': 'HKS .70',
        'hks 7o': 'HKS .70',
        'hks 7O': 'HKS .70',
        'hks.7': 'HKS .70',
        'hks 7': 'HKS .70',
        'proracing obb+': 'ProRacing OBB+',
        'proracing obb +': 'ProRacing OBB+',
        'proracing obb plus': 'ProRacing OBB+',
        'proracing obbplus': 'ProRacing OBB+',
        'obb+': 'ProRacing OBB+',
        'obb +': 'ProRacing OBB+',

        // MAPEAMENTOS PARA PRORACING OBB (BÁSICO)
        'proracing obb': 'ProRacing OBB',
        'obb': 'ProRacing OBB',

        'hks gt ii': 'HKS GT II',
        'hks gt2': 'HKS GT II',
        'hks gt 2': 'HKS GT II',
        'hks gtii': 'HKS GT II',

        'proracing header s3': 'ProRacing Header S3',
        'header s3': 'ProRacing Header S3',
        'header s 3': 'ProRacing Header S3',
        'header-s3': 'ProRacing Header S3',
        's3 header': 'ProRacing Header S3',
        'header3': 'ProRacing Header S3',

        'proracing header s2': 'ProRacing Header S2',
        'header s2': 'ProRacing Header S2',
        'header s 2': 'ProRacing Header S2',
        'header-s2': 'ProRacing Header S2',
        's2 header': 'ProRacing Header S2',
        'header2': 'ProRacing Header S2',

        'proracing header s1': 'ProRacing Header S1',
        'header s1': 'ProRacing Header S1',
        'header s 1': 'ProRacing Header S1',
        'header-s1': 'ProRacing Header S1',
        's1 header': 'ProRacing Header S1',
        'header1': 'ProRacing Header S1',
        'oem': 'OEM',
        'dem': 'OEM',
        '0em': 'OEM',

        'header s': 'ProRacing Header S4',
        'proracing header': 'ProRacing Header S4',

        'takashing forjado': 'TakaShing Forjado',
        'bosch aco': 'Bosch Aço',
        'bosch aço': 'Bosch Aço',
        'edelbrock performer': 'Edelbrock Performer',
        'proracing carbon': 'ProRacing Carbon',
        'comando 268': 'Comando 268',
        'comando 268°': 'Comando 268',
        'garret .63': 'Garret .63',
        'gorret .63': 'Garret .63',
        'gorret1.63': 'Garret .63',
        'spa mcsi': 'SPA MCSI',
        'proflacing wgv': 'ProRacing WGV',
        'chip mns 6t2': 'Chip MNS GT2',
        'nos 20 lbs': 'NOS 20 Lbs',
        'proreduction extreme pack': 'ProReduction Extreme Pack',
        'z-pro carbon': 'Z-Pro Carbon',
        'tap erformance v4550': 'TAPerformance V4550',
        'prorocing 2.0': 'ProRacing 2.0',
        'proracing 2.0': 'ProRacing 2.0',
        'pro racing 2.0': 'ProRacing 2.0',
        'prorocing': 'ProRacing 2.0',
        'proracing': 'ProRacing 2.0',

        'bov': 'ProRacing BOV',
        'proracing bov': 'ProRacing BOV',
        'wgv': 'ProRacing WGV',
        'proracing wgv': 'ProRacing WGV',
        'hks gt ii': 'HKS GT II',
        'hks controflow': 'HKS ControFlow',
        'beep turbo usc': 'Beep Turbo USC',

        'ftech+ v450': 'ProRacing Ftech+ V450',
        'proracing ftech+ v450': 'ProRacing Ftech+ V450',
        'ftech+ v 450': 'ProRacing Ftech+ V450',
        'ftech+ v-450': 'ProRacing Ftech+ V450',
        'ftech v450': 'ProRacing Ftech+ V450',
        'ftech+ v45o': 'ProRacing Ftech+ V450',
        'ftech+ v45O': 'ProRacing Ftech+ V450',
        'ftech+ v45d': 'ProRacing Ftech+ V450',
        'ftech+ v45D': 'ProRacing Ftech+ V450',
        'ftech+ v4so': 'ProRacing Ftech+ V450',
        'ftech+ v4s0': 'ProRacing Ftech+ V450',
        'ftech+ v 45o': 'ProRacing Ftech+ V450',
        'ftech+ v 45O': 'ProRacing Ftech+ V450',
        'v450': 'ProRacing Ftech+ V450',
        'v45o': 'ProRacing Ftech+ V450',
        'v45O': 'ProRacing Ftech+ V450',
        'v45d': 'ProRacing Ftech+ V450',

        'ftech+ v300': 'ProRacing Ftech+ V300',
        'proracing ftech+ v300': 'ProRacing Ftech+ V300',
        'ftech+ v 300': 'ProRacing Ftech+ V300',
        'ftech+ v-300': 'ProRacing Ftech+ V300',
        'ftech v300': 'ProRacing Ftech+ V300',
        'ftech+ v3oo': 'ProRacing Ftech+ V300',
        'ftech+ v3Oo': 'ProRacing Ftech+ V300',
        'ftech+ v3o0': 'ProRacing Ftech+ V300',
        'ftech+ v 3oo': 'ProRacing Ftech+ V300',
        'v300': 'ProRacing Ftech+ V300',
        'v3oo': 'ProRacing Ftech+ V300',

        'ftech+ v2': 'ProRacing Ftech+ V2',
        'proracing ftech+ v2': 'ProRacing Ftech+ V2',
        'ftech+ v 2': 'ProRacing Ftech+ V2',
        'ftech+ v-2': 'ProRacing Ftech+ V2',
        'ftech v2': 'ProRacing Ftech+ V2',
        'ftech+ vZ': 'ProRacing Ftech+ V2',
        'ftech+ v z': 'ProRacing Ftech+ V2',
        'v2': 'ProRacing Ftech+ V2',
        'vz': 'ProRacing Ftech+ V2',

        'ftech+': 'ProRacing Ftech+',
        'proracing ftech+': 'ProRacing Ftech+',
        'proracing ftech': 'ProRacing Ftech+',
        'ftech': 'ProRacing Ftech+',

        // Novos mapeamentos expandidos
        'melling m295': 'Melling M295',
        'melling m295hv': 'Melling M295HV',
        'king aluminium': 'King Aluminium',
        'king cobre': 'King Cobre',
        'king pmaxkote': 'King pMaxKote',
        'edelbrock dops': 'Edelbrock DOPS',
        'proracing dry+': 'ProRacing Dry+',
        'vortech ccsq v-30': 'Vortech CCSq V-30',
        'vortech sc 2200x': 'Vortech Sc 2200x',
        'proracing sc kompressor': 'ProRacing Sc Kompressor',
        'proracing sc kompressor hp': 'ProRacing SC Kompressor HP',
        'magnuson 3.6': 'Magnuson 3.6',
        'magnuson 3.2': 'Magnuson 3.2',
        'edelbrock 3.0': 'Edelbrock 3.0',
        'edelbrock 2.6': 'Edelbrock 2.6',
        'proracing 2.2': 'ProRacing 2.2',
        'proracing 2.1': 'ProRacing 2.1',
        'hks s-type': 'HKS S-Type',
        'hks r-type': 'HKS R-Type',
        'garret f80': 'Garret F80',
        'mashimoto tmic': 'Mashimoto TMIC',
        'mashimoto r-line': 'Mashimoto R-Line',
        'proracing competition': 'ProRacing Competition',
        'masterpower .70': 'MasterPower .70',
        'masterpower .82': 'MasterPower .82',
        'masterpower .84': 'MasterPower .84',
        'proreduction light pack': 'ProReduction Light Pack',
        'proreduction super pack': 'ProReduction Super Pack',
        'proreduction ultra pack': 'ProReduction Ultra Pack',
        'proreduction nismo pack': 'ProReduction Nismo Pack',
        'proreduction apex pack': 'ProReduction Apex Pack',
        'z-pro one': 'Z-Pro One'
    },

    ocrCorrections: {
        'valculo': 'valvula', 'valvla': 'valvula', 'válculo': 'válvula', 'válvla': 'válvula',
        'pistoes': 'pistões',
        'pistöes': 'pistões',
        'pista0': 'pistao',
        'heder': 'header',
        'hedaer': 'header',
        'turbino': 'turbina',
        'turbinos': 'turbinas',
        'hks.70': 'hks .70',
        'hks.7o': 'hks .70',
        'hks.7O': 'hks .70',
        'hks70': 'hks .70',
        'valculo': 'valvula', 'valvla': 'valvula', 'válculo': 'válvula', 'válvla': 'válvula',
        'pistoes': 'pistões', 'pistöes': 'pistões', 'pista0': 'pistao',
        'heder': 'header', 'hedaer': 'header',
        'turbino': 'turbina', 'turbinos': 'turbinas',
        'hks.70': 'hks .70', 'hks.7o': 'hks .70', 'hks.7O': 'hks .70', 'hks70': 'hks .70',
        '0em': 'oem', '0 em': 'oem', 'dem': 'oem',
        'mohle': 'mahle', 'mahie': 'mahle',
        'bronzinasas': 'bronzinas', 'bronzinaas': 'bronzinas', 'bronzinos': 'bronzinas', 'bronzinaos': 'bronzinas',
        'bombaa': 'bomba', 'bomba de oleo': 'bomba de óleo', 'bomba oleo': 'bomba de óleo',
        'admisao': 'admissao', 'admisão': 'admissão',
        'escpe': 'escape', 'exhast': 'exhaust',
        'comand0': 'comando',
        'gaskt': 'gasket', 'sprng': 'spring',
        'tuch': 'tucho', 'tuch0': 'tucho',
        'biel': 'biela', 'bleios': 'bielas',
        'v1rabrequim': 'virabrequim', 'brequim': 'virabrequim',
        'cart3r': 'cárter',
        'proflacing': 'proracing',
        'gorret': 'garret',
        'spa mcsi': 'spa mcs1',
        'polio': 'polia',
        'prorocing': 'proracing',
        'ftech': 'ftech+',
        '0em': 'oem',
        '0 em': 'oem',
        'mohle': 'mahle',
        'mahie': 'mahle',
        'mahle': 'Mahle',
        'bronzinasas': 'bronzinas',
        'bronzinaas': 'bronzinas',
        'bronzinos': 'bronzinas',
        'bronzinaos': 'bronzinas',
        'bronzin': 'bronzinas',

        'takashing': 'TakaShing',
        'takao': 'Takao',
        'king': 'King',
        '0-em': 'oem',
        'header s': 'header s4',
        'proracing header': 'proracing header s4',
        'dem': 'oem',
        'oem': 'OEM',
        'bronzinos': 'bronzinas', 'bronzinaos': 'bronzinas', 'bronzin': 'bronzinas',
        'bombaa': 'bomba', 'bomba de oleo': 'bomba de óleo', 'bomba oleo': 'bomba de óleo',
        'priorida': 'prioridade', 'prloridade': 'prioridade',
        'admisao': 'admissao', 'admisão': 'admissão',
        'escpe': 'escape', 'exhast': 'exhaust',
        'comando': 'comando', 'comand0': 'comando',
        'gaskt': 'gasket', 'sprng': 'spring',
        'tuch': 'tucho', 'tuch0': 'tucho',
        'biel': 'biela', 'bleios': 'bielas',
        'v1rabrequim': 'virabrequim', 'brequim': 'virabrequim',
        'carter': 'cárter', 'cart3r': 'cárter',
        'takashing': 'TakaShing',
        'proflacing': 'proracing',
        'gorret': 'garret',
        'spa mcsi': 'spa mcs1',
        'polio': 'polia',
        'prorocing': 'proracing',
        'pro rocing': 'proracing',
        'prioridadede': 'prioridade',
        'alivio': 'alívio',
        'wgv': 'bov',
        'ftech': 'ftech+',
        'ftech +': 'ftech+',
        'melling': 'melling',
        'vortech': 'vortech',
        'magnuson': 'magnuson',
        'mashimoto': 'mashimoto',
        'masterpower': 'masterpower'
    }
};

// ========== UTILITÁRIOS ==========
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static normalizeText(text) {
        return text.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s°º.-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    static calculateLevenshteinDistance(str1, str2) {
        const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));

        for (let i = 0; i <= str2.length; i++) matrix[i][0] = i;
        for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                const cost = str2.charAt(i - 1) === str1.charAt(j - 1) ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + cost,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }

        return matrix[str2.length][str1.length];
    }

    static areWordsSimilar(word1, word2) {
        if (word1 === word2) return true;
        if (word1.includes(word2) || word2.includes(word1)) return true;

        const distance = this.calculateLevenshteinDistance(word1, word2);
        const similarity = (Math.max(word1.length, word2.length) - distance) / Math.max(word1.length, word2.length);
        return similarity >= 0.7;
    }

    static parsePrice(priceString) {
        return parseInt(priceString.replace("Lp$ ", "")) || 0;
    }

    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ========== GERENCIADOR DE BUSCA MELHORADO E EXPANDIDO ==========
class SearchEngine {
    static findPartWithCategory(searchText) {
        if (!AppState.partsData[AppState.currentClass]) {
            console.log(`❌ Classe ${AppState.currentClass} não encontrada nos dados`);
            return null;
        }

        const cacheKey = `${searchText}-${AppState.currentClass}`;
        if (Cache.similarity.has(cacheKey)) {
            return Cache.similarity.get(cacheKey);
        }

        console.log(`\n🔍 BUSCA: "${searchText}" na classe ${AppState.currentClass}`);

        const colonMatch = this.analyzeColonSeparatedLine(searchText);
        if (colonMatch) {
            console.log(`🎯 ANÁLISE DE LINHA: "${searchText}" -> ${colonMatch.category}/${colonMatch.subcategory}: "${colonMatch.name}"`);
            Cache.similarity.set(cacheKey, colonMatch);
            return colonMatch;
        }

        const correctedText = this.applyOCRCorrections(searchText);
        const normalizedSearch = Utils.normalizeText(correctedText);

        console.log(`🔧 Texto corrigido: "${correctedText}" -> Normalizado: "${normalizedSearch}"`);

        const exactMatch = this.findExactMatchWithSubcategoryCheck(normalizedSearch);
        if (exactMatch) {
            console.log(`✅ CORRESPONDÊNCIA EXATA: "${exactMatch.name}"`);
            Cache.similarity.set(cacheKey, exactMatch);
            return exactMatch;
        }

        const smartMatch = this.smartCategorySearch(normalizedSearch);
        if (smartMatch) {
            console.log(`🎯 BUSCA INTELIGENTE: "${smartMatch.name}"`);
            Cache.similarity.set(cacheKey, smartMatch);
            return smartMatch;
        }

        console.log(`❌ NENHUM MATCH para: "${searchText}"`);
        return null;
    }

    static analyzeColonSeparatedLine(line) {
        const separators = [':', ';', '-', '–', '—', '•'];

        let separatorUsed = null;
        for (const sep of separators) {
            if (line.includes(sep)) {
                separatorUsed = sep;
                break;
            }
        }

        if (!separatorUsed) return null;

        const parts = line.split(separatorUsed).map(part => part.trim());
        if (parts.length !== 2) return null;

        const [categoryPart, partName] = parts;
        console.log(`📝 ANALISANDO LINHA: "${categoryPart}" ${separatorUsed} "${partName}"`);

        let correctedCategory = this.applyOCRCorrections(categoryPart.toLowerCase());
        let normalizedCategory = Utils.normalizeText(correctedCategory);

        console.log(`🔧 Categoria corrigida: "${correctedCategory}" -> Normalizada: "${normalizedCategory}"`);

        let categoryMatch = this.findCategoryMapping(normalizedCategory);
        if (!categoryMatch) {
            console.log(`❌ Categoria não encontrada: "${normalizedCategory}"`);

            const keywordMatch = this.findCategoryByKeywords(normalizedCategory);
            if (keywordMatch) {
                console.log(`✅ Categoria encontrada por palavras-chave: ${keywordMatch.category}/${keywordMatch.subcategory}`);
                categoryMatch = keywordMatch;
            }
        }

        if (!categoryMatch) {
            console.log(`❌ Nenhuma categoria encontrada para: "${normalizedCategory}"`);
            return null;
        }

        const correctedPartName = this.applyOCRCorrections(partName);
        const normalizedPartName = Utils.normalizeText(correctedPartName);

        console.log(`🔧 Nome da peça corrigido: "${correctedPartName}" -> Normalizado: "${normalizedPartName}"`);

        const partMatch = this.findPartInSpecificCategory(
            categoryMatch.category,
            categoryMatch.subcategory,
            normalizedPartName
        );

        if (partMatch) {
            console.log(`✅ Peça encontrada: "${partMatch.name}"`);
            return partMatch;
        }

        console.log(`❌ Peça não encontrada na categoria: "${normalizedPartName}"`);
        return null;
    }

    static findCategoryMapping(categoryText) {
        console.log(`🔍 Buscando categoria para: "${categoryText}"`);

        const normalizedText = Utils.normalizeText(categoryText);
        console.log(`🔍 Texto normalizado: "${normalizedText}"`);

        const mappingKeys = Object.keys(MAPPINGS.categoryMapping).sort((a, b) => b.length - a.length);

        for (const key of mappingKeys) {
            if (normalizedText.includes(key) || key.includes(normalizedText)) {
                console.log(`✅ Mapeamento de categoria encontrado: "${key}" -> ${MAPPINGS.categoryMapping[key].category}/${MAPPINGS.categoryMapping[key].subcategory}`);
                return MAPPINGS.categoryMapping[key];
            }
        }

        const words = normalizedText.split(' ');
        for (const word of words) {
            if (word.length > 3) {
                for (const [key, mapping] of Object.entries(MAPPINGS.categoryMapping)) {
                    if (key.includes(word) || word.includes(key)) {
                        console.log(`✅ Mapeamento por palavra-chave: "${word}" -> ${mapping.category}/${mapping.subcategory}`);
                        return mapping;
                    }
                }
            }
        }

        console.log(`❌ Nenhum mapeamento de categoria encontrado para: "${categoryText}"`);
        return null;
    }

    static findCategoryByKeywords(text) {
        const words = text.split(' ').filter(word => word.length > 2);

        const keywordMapping = {
            'turb': 'Turbo',
            'turbo': 'Turbo',
            'turbina': 'Turbo',
            'hks': 'Turbo',
            'garret': 'Turbo',
            'bov': 'Turbo',
            'wgv': 'Turbo',
            'motor': 'Motor',
            'pistao': 'Motor',
            'pistão': 'Motor',
            'biela': 'Motor',
            'cabecote': 'Cabeçote',
            'valvula': 'Cabeçote',
            'comando': 'Cabeçote',
            'transmissao': 'Transmissão',
            'marcha': 'Transmissão',
            'supercharger': 'SuperCharger',
            'sc': 'SuperCharger',
            'nitro': 'Óxido Nitroso',
            'nos': 'Óxido Nitroso',
            'reducao': 'Redução de Peso',
            'peso': 'Redução de Peso',
            'ecu': 'ECU',
            'chip': 'ECU'
        };

        for (const word of words) {
            for (const [keyword, category] of Object.entries(keywordMapping)) {
                if (word.includes(keyword) || keyword.includes(word)) {
                    const subcategory = this.getDefaultSubcategory(category);
                    console.log(`🔑 CATEGORIA POR PALAVRA-CHAVE: "${keyword}" -> ${category}/${subcategory}`);
                    return { category, subcategory };
                }
            }
        }

        return null;
    }

    static getDefaultSubcategory(category) {
        const defaults = {
            'Turbo': 'Turbinas',
            'Motor': 'pistões',
            'Cabeçote': 'cabeçote',
            'Transmissão': 'caixa de marchas',
            'SuperCharger': 'polias',
            'Óxido Nitroso': 'garrafas',
            'Redução de Peso': 'reduções',
            'ECU': 'chip'
        };
        return defaults[category] || Object.values(MAPPINGS.categoryMapping).find(m => m.category === category)?.subcategory;
    }

    static findPartInSpecificCategory(category, subcategory, partName) {
        const categoryData = AppState.partsData[AppState.currentClass]?.[category]?.[subcategory];
        if (!categoryData) {
            console.log(`❌ Categoria não encontrada: ${category}/${subcategory}`);
            return null;
        }

        console.log(`🔍 Buscando "${partName}" em ${category}/${subcategory}`);
        console.log(`📋 Peças disponíveis:`, Object.keys(categoryData));

        // 1. Busca exata
        for (const [availablePartName, price] of Object.entries(categoryData)) {
            const normalizedAvailable = Utils.normalizeText(availablePartName);
            if (normalizedAvailable === partName) {
                return {
                    category,
                    subcategory,
                    name: availablePartName,
                    price,
                    score: 1.0
                };
            }
        }

        // 2. Busca por mapeamento
        const mappedName = this.findPartMapping(partName, categoryData);
        if (mappedName) {
            return {
                category,
                subcategory,
                name: mappedName,
                price: categoryData[mappedName],
                score: 0.9
            };
        }

        // 3. Busca por contains
        let bestMatch = null;
        let bestScore = 0;

        for (const [availablePartName, price] of Object.entries(categoryData)) {
            const normalizedAvailable = Utils.normalizeText(availablePartName);
            const score = this.calculateContainsScore(partName, normalizedAvailable);

            if (score > bestScore && score >= 0.7) {
                bestScore = score;
                bestMatch = {
                    category,
                    subcategory,
                    name: availablePartName,
                    price,
                    score
                };
            }
        }

        return bestMatch;
    }

    static findPartMapping(partName, categoryData) {
        for (const [key, mappedName] of Object.entries(MAPPINGS.partMapping)) {
            if (partName.includes(key) && categoryData[mappedName] !== undefined) {
                console.log(`✅ MAPEAMENTO: "${key}" -> "${mappedName}"`);
                return mappedName;
            }
        }
        return null;
    }


    static removeCategoryWords(text, category, subcategory) {
        let cleaned = text.toLowerCase();

        // Palavras comuns de categoria/subcategoria para remover
        const wordsToRemove = [
            'bronzina', 'bronzinas', 'bronzin', 'bronzinos',
            'motor', 'biela', 'bearing', 'bearings',
            'pistao', 'pistões', 'pistons',
            'valvula', 'valvulas', 'valve',
            'cabecote', 'cabeçote', 'head',
            'turbo', 'turbina', 'turbinas',
            'coletor', 'admissao', 'admissão', 'escape',
            'comando', 'comandos', 'camshaft',
            'mola', 'molas', 'spring',
            'tucho', 'tuchos', 'lifter',
            'junta', 'juntas', 'gasket'
        ];

        wordsToRemove.forEach(word => {
            cleaned = cleaned.replace(new RegExp(word, 'gi'), '').trim();
        });

        // Remover espaços extras e pontuação
        cleaned = cleaned.replace(/\s+/g, ' ').replace(/[^\w\s]/g, '').trim();

        return cleaned || text; // Retorna o original se ficar vazio
    }

    static findExactMapping(partName, categoryData, category, subcategory) {
        const mappingKeys = Object.keys(MAPPINGS.partMapping).sort((a, b) => {
            // PRIORIDADE 1: Match exato tem máxima prioridade
            if (a === partName && b !== partName) return -1;
            if (b === partName && a !== partName) return 1;

            // PRIORIDADE 2: Versões com "+" primeiro (mais específicas)
            const aHasPlus = a.includes('+');
            const bHasPlus = b.includes('+');
            if (aHasPlus && !bHasPlus) return -1;
            if (!aHasPlus && bHasPlus) return 1;

            // PRIORIDADE 3: Maior comprimento primeiro (mais específico)
            return b.length - a.length;
        });

        console.log(`🔍 Ordem de mapeamento para "${partName}":`, mappingKeys.slice(0, 5));

        for (const key of mappingKeys) {
            if (partName === key) {
                const mappedName = MAPPINGS.partMapping[key];
                if (categoryData[mappedName] !== undefined) {
                    console.log(`✅ MAPEAMENTO EXATO: "${partName}" -> "${mappedName}" (via chave: "${key}")`);
                    return {
                        category,
                        subcategory,
                        name: mappedName,
                        price: categoryData[mappedName],
                        score: 1.0
                    };
                }
            }
        }
        return null;
    }

    static extractVersionNumber(text) {
        const versionMatch = text.match(/s(\d+)/i) || text.match(/v(\d+)/i);
        return versionMatch ? parseInt(versionMatch[1]) : null;
    }

    static findCaseInsensitiveMatch(partName, categoryData, category, subcategory) {
        const normalizedSearch = Utils.normalizeText(partName);

        for (const [availablePartName, price] of Object.entries(categoryData)) {
            const normalizedAvailable = Utils.normalizeText(availablePartName);

            if (normalizedAvailable === normalizedSearch) {
                return {
                    category,
                    subcategory,
                    name: availablePartName,
                    price,
                    score: 1.0
                };
            }
        }
        return null;
    }

    static findBestContainsMatch(partName, categoryData, category, subcategory) {
        const normalizedSearch = Utils.normalizeText(partName);
        let bestMatch = null;
        let bestScore = 0;

        console.log(`🔍 Buscando "${normalizedSearch}" em ${category}/${subcategory}`);

        // Se a busca contém "obb+", priorizar versões com "+"
        if (normalizedSearch.includes('obb+') || normalizedSearch.includes('obb +')) {
            console.log(`🎯 DETECTADO OBB+: "${normalizedSearch}"`);

            for (const [availablePartName, price] of Object.entries(categoryData)) {
                const normalizedAvailable = Utils.normalizeText(availablePartName);

                if (normalizedAvailable.includes('obb+') || normalizedAvailable.includes('obb +')) {
                    const score = this.calculateExactOBBMatch(normalizedSearch, normalizedAvailable);
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = {
                            category,
                            subcategory,
                            name: availablePartName,
                            price,
                            score
                        };
                    }
                }
            }

            if (bestMatch && bestScore >= 0.8) {
                console.log(`✅ OBB+ ESPECÍFICO ENCONTRADO: "${bestMatch.name}"`);
                return bestMatch;
            }
        }

        // Busca normal por contains
        const entries = Object.entries(categoryData).sort((a, b) => b[0].length - a[0].length);

        for (const [availablePartName, price] of entries) {
            const normalizedAvailable = Utils.normalizeText(availablePartName);

            // Match exato tem prioridade máxima
            if (normalizedAvailable === normalizedSearch) {
                console.log(`🎯 MATCH EXATO ENCONTRADO: "${availablePartName}"`);
                return {
                    category,
                    subcategory,
                    name: availablePartName,
                    price,
                    score: 1.0
                };
            }

            if (normalizedAvailable.includes(normalizedSearch)) {
                const score = this.calculateContainsScore(normalizedSearch, normalizedAvailable);
                // Aumentar o threshold para evitar matches parciais incorretos
                if (score > bestScore && score >= 0.8) {
                    bestScore = score;
                    bestMatch = {
                        category,
                        subcategory,
                        name: availablePartName,
                        price,
                        score
                    };
                }
            }

            if (normalizedSearch.includes(normalizedAvailable)) {
                const score = this.calculateContainsScore(normalizedAvailable, normalizedSearch);
                if (score > bestScore && score >= 0.8) {
                    bestScore = score;
                    bestMatch = {
                        category,
                        subcategory,
                        name: availablePartName,
                        price,
                        score
                    };
                }
            }
        }

        return bestScore >= 0.8 ? bestMatch : null;
    }

    static calculateExactOBBMatch(searchText, availableText) {
        // Se ambos contêm "obb+", é um match forte
        if (searchText.includes('obb+') && availableText.includes('obb+')) {
            return 0.9;
        }

        // Se a busca é específica para "+" mas a peça disponível não tem, penalizar
        if (searchText.includes('obb+') && !availableText.includes('obb+')) {
            return 0.3;
        }

        // Match normal
        return this.calculateContainsScore(searchText, availableText);
    }

    static calculateHeaderSimilarity(searchText, availableText) {
        const searchVersion = searchText.match(/s(\d+)/) || searchText.match(/(\d+)/);
        const availableVersion = availableText.match(/s(\d+)/) || availableText.match(/(\d+)/);

        let score = 0;

        if (searchText.includes('header') && availableText.includes('header')) {
            score += 0.3;
        }

        if (searchVersion && availableVersion && searchVersion[1] === availableVersion[1]) {
            score += 0.7;
        } else if (searchVersion && availableVersion) {
            score -= 0.3;
        }

        return Math.max(0, Math.min(1, score));
    }

    static findSimilarityMatch(partName, categoryData, category, subcategory) {
        const normalizedSearch = Utils.normalizeText(partName);
        let bestMatch = null;
        let bestScore = 0;

        for (const [availablePartName, price] of Object.entries(categoryData)) {
            const normalizedAvailable = Utils.normalizeText(availablePartName);
            const score = this.calculateAdvancedSimilarity(normalizedSearch, normalizedAvailable);

            if (score > bestScore && score >= 0.6) {
                bestScore = score;
                bestMatch = {
                    category,
                    subcategory,
                    name: availablePartName,
                    price,
                    score
                };
            }
        }

        return bestMatch;
    }

    static calculateAdvancedSimilarity(text1, text2) {
        if (text1 === text2) return 1.0;

        const words1 = text1.split(' ').filter(w => w.length > 1);
        const words2 = text2.split(' ').filter(w => w.length > 1);

        if (!words1.length || !words2.length) return 0;

        let commonWords = 0;
        let totalWords = Math.max(words1.length, words2.length);

        for (const word1 of words1) {
            for (const word2 of words2) {
                if (word1 === word2) {
                    commonWords += 1.0;
                    break;
                } else if (word1.includes(word2) || word2.includes(word1)) {
                    const lengthRatio = Math.min(word1.length, word2.length) / Math.max(word1.length, word2.length);
                    commonWords += 0.7 * lengthRatio;
                    break;
                } else if (Utils.areWordsSimilar(word1, word2)) {
                    commonWords += 0.5;
                    break;
                }
            }
        }

        return commonWords / totalWords;
    }

    static smartCategorySearch(searchText) {
        const normalized = Utils.normalizeText(searchText);

        // Primeiro tenta encontrar por categoria
        const categoryMatch = this.findCategoryMapping(normalized);
        if (categoryMatch) {
            // Se encontrou categoria, busca a peça mais comum ou primeira disponível
            const categoryData = AppState.partsData[AppState.currentClass]?.[categoryMatch.category]?.[categoryMatch.subcategory];
            if (categoryData) {
                const firstPart = Object.entries(categoryData)[0];
                if (firstPart) {
                    return {
                        category: categoryMatch.category,
                        subcategory: categoryMatch.subcategory,
                        name: firstPart[0],
                        price: firstPart[1],
                        score: 0.7
                    };
                }
            }
        }

        // Busca em todas as categorias
        for (const [category, subcategories] of Object.entries(AppState.partsData[AppState.currentClass])) {
            for (const [subcategory, parts] of Object.entries(subcategories)) {
                for (const [partName, price] of Object.entries(parts)) {
                    const normalizedPart = Utils.normalizeText(partName);
                    
                    if (normalizedPart.includes(normalized) || normalized.includes(normalizedPart)) {
                        const score = this.calculateMatchScore(normalized, normalizedPart);
                        if (score >= 0.6) {
                            return {
                                category,
                                subcategory,
                                name: partName,
                                price,
                                score
                            };
                        }
                    }
                }
            }
        }

        return null;
    }

    static isTextRelatedToSubcategory(text, subcategory) {
        const normalizedSubcat = Utils.normalizeText(subcategory);
        const subcatWords = normalizedSubcat.split(' ');

        for (const word of subcatWords) {
            if (word.length > 2 && text.includes(word)) {
                return true;
            }
        }

        for (const [key, mapping] of Object.entries(MAPPINGS.categoryMapping)) {
            if (mapping.subcategory === subcategory && text.includes(key)) {
                return true;
            }
        }

        return false;
    }

    static applyOCRCorrections(text) {
        let corrected = text.toLowerCase();

        // Aplicar correções do mapeamento
        for (const [error, correction] of Object.entries(MAPPINGS.ocrCorrections)) {
            if (corrected.includes(error)) {
                corrected = corrected.replace(new RegExp(error, 'g'), correction);
                console.log(`🔧 Correção OCR: "${error}" -> "${correction}"`);
            }
        }

        // Correções específicas para bronzinas
        corrected = corrected.replace(/mohle/gi, 'mahle');
        corrected = corrected.replace(/mahie/gi, 'mahle');
        corrected = corrected.replace(/bronzinasas/gi, 'bronzinas');
        corrected = corrected.replace(/bronzinaas/gi, 'bronzinas');
        corrected = corrected.replace(/bronzinos/gi, 'bronzinas');
        corrected = corrected.replace(/bronzinaos/gi, 'bronzinas');
        corrected = corrected.replace(/bronzin/gi, 'bronzinas');

        // Outras correções gerais
        corrected = corrected.replace(/tokushing/gi, 'takashing');
        corrected = corrected.replace(/proflacing/gi, 'proracing');
        corrected = corrected.replace(/gorret/gi, 'garret');
        corrected = corrected.replace(/gorret1\.63/gi, 'garret .63');
        corrected = corrected.replace(/spa mcsi/gi, 'spa mcs1');
        corrected = corrected.replace(/268°/gi, '268');
        corrected = corrected.replace(/chip mns 6t2/gi, 'chip mns gt2');
        corrected = corrected.replace(/tap erformance/gi, 'taperformance');
        corrected = corrected.replace(/bleios/gi, 'bielas');
        corrected = corrected.replace(/gurrotas/gi, 'garrafas');
        corrected = corrected.replace(/pistöes/gi, 'pistões');
        corrected = corrected.replace(/pistoes/gi, 'pistões');
        corrected = corrected.replace(/0em/gi, 'oem');
        corrected = corrected.replace(/0 em/gi, 'oem');
        corrected = corrected.replace(/0-em/gi, 'oem');
        corrected = corrected.replace(/obb\s*\+/g, 'obb+');
        corrected = corrected.replace(/obbplus/g, 'obb+');
        corrected = corrected.replace(/obb plus/g, 'obb+');

        return corrected;
    }

    static findExactMatchWithSubcategoryCheck(normalizedSearch) {
        const classData = AppState.partsData[AppState.currentClass];
        if (!classData) return null;

        for (const [category, subcategories] of Object.entries(classData)) {
            for (const [subcategory, parts] of Object.entries(subcategories)) {
                for (const [partName, price] of Object.entries(parts)) {
                    const normalizedPart = Utils.normalizeText(partName);

                    if (normalizedSearch === normalizedPart ||
                        normalizedPart.includes(normalizedSearch) ||
                        normalizedSearch.includes(normalizedPart)) {
                        console.log(`✅ MATCH EXATO: "${partName}" em ${category}/${subcategory}`);
                        return {
                            category,
                            subcategory,
                            name: partName,
                            price,
                            score: 1.0
                        };
                    }
                }
            }
        }
        return null;
    }

    static findBestPartInSubcategory(category, subcategory, searchText) {
        const categoryData = AppState.partsData[AppState.currentClass]?.[category]?.[subcategory];
        if (!categoryData) return null;

        let bestMatch = null;
        let bestScore = 0;

        for (const [partName, price] of Object.entries(categoryData)) {
            const normalizedPart = Utils.normalizeText(partName);
            const score = this.calculateDetailedSimilarity(searchText, normalizedPart);

            if (score > bestScore && score >= 0.5) {
                bestScore = score;
                bestMatch = {
                    category: category,
                    subcategory: subcategory,
                    name: partName,
                    price: price,
                    score: score
                };
            }
        }

        return bestMatch;
    }

    static calculateDetailedSimilarity(text1, text2) {
        if (text1 === text2) return 1.0;

        if (text1.includes(text2) || text2.includes(text1)) {
            return 0.8;
        }

        const words1 = text1.split(' ').filter(w => w.length > 1);
        const words2 = text2.split(' ').filter(w => w.length > 1);

        if (!words1.length || !words2.length) return 0;

        let commonWords = 0;
        for (const word1 of words1) {
            for (const word2 of words2) {
                if (word1.includes(word2) || word2.includes(word1) || Utils.areWordsSimilar(word1, word2)) {
                    commonWords++;
                    break;
                }
            }
        }

        return commonWords / Math.max(words1.length, words2.length);
    }

    static calculateContainsScore(search, available) {
        if (search === available) return 1.0;
        if (available.includes(search)) return 0.9;
        if (search.includes(available)) return 0.8;

        // Verifica palavras em comum
        const searchWords = search.split(' ');
        const availableWords = available.split(' ');
        let commonWords = 0;

        for (const sWord of searchWords) {
            for (const aWord of availableWords) {
                if (sWord.includes(aWord) || aWord.includes(sWord)) {
                    commonWords++;
                    break;
                }
            }
        }

        return commonWords / Math.max(searchWords.length, availableWords.length);
    }
}

// ========== GERENCIADOR DE INTERFACE ==========
class UIManager {
    static initialize() {
        this.cacheElements();
        this.setupEventListeners();
        console.log("✅ UI Manager inicializado");
    }

    static cacheElements() {
        try {
            Cache.elements = {
                classSelect: document.getElementById('class-select'),
                categoryButtons: document.querySelectorAll('.category-btn'),
                currentCategoryElement: document.getElementById('current-category'),
                partsListElement: document.getElementById('parts-list'),
                summaryItemsElement: document.getElementById('summary-items'),
                totalPriceElement: document.getElementById('total-price'),
                inflationInput: document.getElementById('inflation-input'),
                inflationSlider: document.getElementById('inflation-slider'),
                carPriceInput: document.getElementById('car-price'),
                paymentPriceInput: document.getElementById('payment-price'),
                profitElement: document.getElementById('profit'),
                autoBtn: document.getElementById('auto-btn'),
                imageUpload: document.getElementById('image-upload'),
                autoStatus: document.getElementById('auto-status'),
                clearAllBtn: document.getElementById('clear-all-btn'),
                resetBtn: document.getElementById('reset-btn')
            };

            console.log("✅ Elementos cacheados:", Object.keys(Cache.elements).filter(key => Cache.elements[key] !== null));

        } catch (error) {
            console.error("❌ Erro ao cachear elementos:", error);
            Cache.elements = Cache.elements || {};
        }
    }

    static setupEventListeners() {
        const { classSelect, categoryButtons, inflationSlider, inflationInput,
            carPriceInput, paymentPriceInput, autoBtn, imageUpload, clearAllBtn, resetBtn } = Cache.elements;

        if (classSelect) {
            classSelect.addEventListener('change', () => this.handleClassChange());
        }

        if (categoryButtons) {
            categoryButtons.forEach(btn => {
                btn.addEventListener('click', (e) => this.handleCategoryClick(e));
            });
        }

        if (inflationSlider) {
            inflationSlider.addEventListener('input', Utils.debounce(() => this.handleInflationChange(), CONFIG.DEBOUNCE_DELAY));
        }

        if (inflationInput) {
            inflationInput.addEventListener('input', Utils.debounce(() => this.handleInflationInput(), CONFIG.DEBOUNCE_DELAY));
            inflationInput.addEventListener('blur', () => this.validateInflation());
        }

        if (carPriceInput) {
            carPriceInput.addEventListener('input', Utils.debounce(() => this.updateProfit(), CONFIG.DEBOUNCE_DELAY));
        }

        if (paymentPriceInput) {
            paymentPriceInput.addEventListener('input', Utils.debounce(() => this.updateProfit(), CONFIG.DEBOUNCE_DELAY));
        }

        if (autoBtn && imageUpload) {
            autoBtn.addEventListener('click', () => imageUpload.click());
            imageUpload.addEventListener('change', (e) => ImageProcessor.handleImageUpload(e));
        }

        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAllParts());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.handleReset());
        }

        console.log("✅ Event listeners configurados");
    }

    static handleClassChange() {
        AppState.selectedParts = {};
        const previousClass = AppState.currentClass;
        AppState.currentClass = Cache.elements.classSelect.value;
        Cache.similarity.clear();

        console.log(`🔄 Mudança de classe: ${previousClass} → ${AppState.currentClass}`);
        console.log(`🗑️ Peças removidas: ${Object.keys(AppState.selectedParts).length}`);

        this.loadCategoryParts();
        this.updateSummary();
        UIManager.showAutoStatus(`Classe alterada para ${AppState.currentClass} - Peças removidas`, 'info');
    }

    static handleReset() {
        const { carPriceInput, paymentPriceInput, profitElement } = Cache.elements;

        if (carPriceInput) {
            carPriceInput.value = '';
        }

        if (paymentPriceInput) {
            paymentPriceInput.value = '';
        }

        if (profitElement) {
            profitElement.textContent = 'Lp$ 0';
            profitElement.style.color = '#6c757d';
            profitElement.style.fontWeight = '500';
        }

        UIManager.showAutoStatus('Campos de preço resetados', 'success');
        console.log("🔄 Campos de preço resetados");
    }

    static handleCategoryClick(e) {
        const category = e.target.dataset.category;
        if (!category) return;

        AppState.currentCategory = category;
        if (Cache.elements.currentCategoryElement) {
            Cache.elements.currentCategoryElement.textContent = category;
        }

        if (Cache.elements.categoryButtons) {
            Cache.elements.categoryButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        }

        this.loadCategoryParts();
    }

    static handleInflationChange() {
        AppState.inflation = parseFloat(Cache.elements.inflationSlider.value);
        this.updateInflationFields();
    }

    static handleInflationInput() {
        let value = Cache.elements.inflationInput.value.replace(/[^\d.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
        AppState.inflation = parseFloat(value) || CONFIG.MIN_INFLATION;
        this.updateInflationFields();
    }

    static updateInflationFields() {
        AppState.inflation = Math.max(CONFIG.MIN_INFLATION, Math.min(CONFIG.MAX_INFLATION, AppState.inflation));
        if (Cache.elements.inflationInput) {
            Cache.elements.inflationInput.value = AppState.inflation.toFixed(4);
        }
        if (Cache.elements.inflationSlider) {
            Cache.elements.inflationSlider.value = AppState.inflation;
        }
        this.loadCategoryParts();
        this.updateSummary();
    }

    static validateInflation() {
        this.updateInflationFields();
    }

    static loadCategoryParts() {
        if (!Cache.elements || !Cache.elements.partsListElement) {
            console.error("❌ partsListElement não disponível, tentando recachear...");
            this.cacheElements();

            if (!Cache.elements || !Cache.elements.partsListElement) {
                console.error("❌ partsListElement ainda não disponível após recachear");
                return;
            }
        }

        const { partsListElement } = Cache.elements;
        this.showLoadingState(partsListElement);

        setTimeout(() => {
            const categoryData = this.getCurrentCategoryData();

            if (!categoryData) {
                this.showNoPartsMessage(partsListElement);
                return;
            }

            this.renderPartsGrid(partsListElement, categoryData);
        }, CONFIG.DEBOUNCE_DELAY);
    }

    static getCurrentCategoryData() {
        const cacheKey = `${AppState.currentClass}-${AppState.currentCategory}`;
        if (Cache.category.has(cacheKey)) {
            return Cache.category.get(cacheKey);
        }

        const categoryData = AppState.partsData[AppState.currentClass]?.[AppState.currentCategory];
        if (categoryData) {
            Cache.category.set(cacheKey, categoryData);
        }

        return categoryData;
    }

    static showLoadingState(container) {
        container.innerHTML = '<div class="loading">Carregando peças...</div>';
    }

    static showNoPartsMessage(container) {
        container.innerHTML = '<p>Nenhuma peça disponível para esta categoria.</p>';
    }

    static renderPartsGrid(container, categoryData) {
        container.innerHTML = '';
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        container.style.gap = '1rem';

        console.log(`📦 Renderizando ${Object.keys(categoryData).length} subcategorias`);

        for (const [subcat, items] of Object.entries(categoryData)) {
            this.createSubcategoryTitle(container, subcat);
            this.renderPartItems(container, subcat, items);
        }
    }

    static createSubcategoryTitle(container, subcat) {
        const subcatTitle = document.createElement('h3');
        subcatTitle.textContent = subcat;
        subcatTitle.style.gridColumn = '1 / -1';
        subcatTitle.style.margin = '1rem 0 0.5rem 0';
        subcatTitle.style.fontSize = '1.2rem';
        subcatTitle.style.color = '#333';
        container.appendChild(subcatTitle);
    }

    static renderPartItems(container, subcat, items) {
        console.log(`📦 Subcategoria "${subcat}": ${Object.keys(items).length} peças`);

        for (const [name, price] of Object.entries(items)) {
            const partItem = this.createPartItem(subcat, name, price);
            container.appendChild(partItem);
        }
    }

    static createPartItem(subcat, name, price) {
        const partItem = document.createElement('div');
        partItem.className = 'part-item';
        partItem.dataset.subcat = subcat;

        const isSelected = this.isPartSelected(subcat, name);
        if (isSelected) partItem.classList.add('selected-part');

        const partInfo = document.createElement('div');
        partInfo.className = 'part-info';

        const partName = document.createElement('div');
        partName.className = 'part-name';
        partName.textContent = name;

        const partPrice = document.createElement('div');
        partPrice.className = 'part-price';
        partPrice.textContent = `Lp$ ${Math.round(price * AppState.inflation)}`;

        partInfo.appendChild(partName);
        partInfo.appendChild(partPrice);
        partItem.appendChild(partInfo);

        partItem.addEventListener('click', () => this.handlePartClick(partItem, subcat, name, price));

        return partItem;
    }

    static isPartSelected(subcat, name) {
        return AppState.selectedParts[AppState.currentCategory]?.[subcat]?.name === name;
    }

    static handlePartClick(partItem, subcat, name, price) {
        const isCurrentlySelected = this.isPartSelected(subcat, name);

        if (isCurrentlySelected) {
            this.removePartSelection(subcat);
        } else {
            this.selectPart(AppState.currentCategory, subcat, name, price);
        }

        this.updatePartSelectionUI(partItem, subcat, name);
        this.updateSummary();
    }

    static removePartSelection(subcat) {
        if (AppState.selectedParts[AppState.currentCategory]) {
            delete AppState.selectedParts[AppState.currentCategory][subcat];
            if (Object.keys(AppState.selectedParts[AppState.currentCategory]).length === 0) {
                delete AppState.selectedParts[AppState.currentCategory];
            }
        }
    }

    static updatePartSelectionUI(clickedItem, subcat, name) {
        if (!Cache.elements || !Cache.elements.partsListElement) return;

        const allItems = Cache.elements.partsListElement.querySelectorAll('.part-item');

        allItems.forEach(item => {
            const partText = item.querySelector('.part-name').textContent;
            const itemSubcat = item.dataset.subcat;
            const shouldBeSelected = AppState.selectedParts[AppState.currentCategory]?.[itemSubcat]?.name === partText;

            item.classList.toggle('selected-part', shouldBeSelected);
        });
    }

    static selectPart(category, subcat, name, price) {
        if (!AppState.selectedParts[category]) AppState.selectedParts[category] = {};
        AppState.selectedParts[category][subcat] = { name, price };
        this.updateSummary();
    }

    static calculateTotalPrice() {
        let total = 0;
        for (const subcats of Object.values(AppState.selectedParts)) {
            for (const part of Object.values(subcats)) {
                total += Math.round(part.price * AppState.inflation);
            }
        }
        return total;
    }

    static calculateTotalWithoutInflation() {
        let total = 0;
        for (const subcats of Object.values(AppState.selectedParts)) {
            for (const part of Object.values(subcats)) {
                total += part.price;
            }
        }
        return total;
    }

    static updateSummary() {
        if (!Cache.elements) {
            console.error("❌ Cache.elements não disponível em updateSummary");
            return;
        }

        const { summaryItemsElement, totalPriceElement } = Cache.elements;
        if (!summaryItemsElement || !totalPriceElement) {
            console.error("❌ Elementos de summary não encontrados");
            return;
        }

        summaryItemsElement.innerHTML = '';

        const total = this.calculateTotalPrice();
        const totalWithoutInflation = this.calculateTotalWithoutInflation();
        const inflationAmount = total - totalWithoutInflation;

        const summaryHeader = this.createSummaryHeader(totalWithoutInflation, inflationAmount);
        summaryItemsElement.appendChild(summaryHeader);

        this.renderSummaryItems();

        const totalSection = this.createTotalSection(total);
        summaryItemsElement.appendChild(totalSection);

        totalPriceElement.textContent = `Lp$ ${total.toLocaleString()}`;
        Object.assign(totalPriceElement.style, {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#28a745',
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginTop: '1rem'
        });

        this.updateProfit();
    }

    static createSummaryHeader(baseTotal, inflationAmount) {
        const header = document.createElement('div');
        header.className = 'summary-header';
        return header;
    }

    static createTotalSection(total) {
        const totalSection = document.createElement('div');
        totalSection.className = 'summary-total';
        return totalSection;
    }

    static renderSummaryItems() {
        const { summaryItemsElement } = Cache.elements;
        if (!summaryItemsElement) return;

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'summary-items-container';
        Object.assign(itemsContainer.style, {
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '0.5rem'
        });

        const hasItems = Object.keys(AppState.selectedParts).length > 0;

        if (!hasItems) {
            const emptyMessage = document.createElement('div');
            emptyMessage.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #6c757d;">
                    <div style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;">🔧</div>
                    <div>Nenhuma peça selecionada</div>
                    <small>Clique nas peças para adicioná-las ao orçamento</small>
                </div>
            `;
            itemsContainer.appendChild(emptyMessage);
            summaryItemsElement.appendChild(itemsContainer);
            return;
        }

        const categorizedItems = this.groupItemsByCategory();

        for (const [category, items] of Object.entries(categorizedItems)) {
            const categorySection = this.createCategorySection(category, items);
            itemsContainer.appendChild(categorySection);
        }

        summaryItemsElement.appendChild(itemsContainer);
    }

    static groupItemsByCategory() {
        const categorized = {};

        for (const [cat, subcats] of Object.entries(AppState.selectedParts)) {
            if (cat === '_order') continue;

            if (!categorized[cat]) {
                categorized[cat] = [];
            }

            for (const [subcat, part] of Object.entries(subcats)) {
                categorized[cat].push({
                    subcategory: subcat,
                    part: part,
                    finalPrice: Math.round(part.price * AppState.inflation)
                });
            }
        }

        return categorized;
    }

    static createCategorySection(category, items) {
        const section = document.createElement('div');
        section.className = 'category-section';
        Object.assign(section.style, {
            marginBottom: '1rem',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            overflow: 'hidden'
        });

        const categoryHeader = document.createElement('div');
        categoryHeader.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.75rem 1rem;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        categoryHeader.innerHTML = `
            <span>${category}</span>
            <span>${items.length} peça${items.length > 1 ? 's' : ''}</span>
        `;

        const itemsList = document.createElement('div');
        itemsList.className = 'category-items';

        items.forEach(itemData => {
            const itemEl = this.createSummaryItem(category, itemData.subcategory, itemData.part, itemData.finalPrice);
            itemsList.appendChild(itemEl);
        });

        section.appendChild(categoryHeader);
        section.appendChild(itemsList);

        return section;
    }

    static createSummaryItem(cat, subcat, part, finalPrice) {
        const itemEl = document.createElement('div');
        itemEl.className = 'summary-item';
        Object.assign(itemEl.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #f8f9fa',
            backgroundColor: 'white',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
        });

        itemEl.addEventListener('mouseenter', () => {
            itemEl.style.backgroundColor = '#f8f9fa';
            itemEl.style.transform = 'translateX(4px)';
        });

        itemEl.addEventListener('mouseleave', () => {
            itemEl.style.backgroundColor = 'white';
            itemEl.style.transform = 'translateX(0)';
        });

        const partInfo = document.createElement('div');
        partInfo.style.cssText = 'flex: 1; min-width: 0;';

        const subcatEl = document.createElement('div');
        subcatEl.textContent = subcat;
        Object.assign(subcatEl.style, {
            fontWeight: '600',
            color: '#495057',
            fontSize: '0.9rem',
            marginBottom: '0.25rem',
            textTransform: 'capitalize'
        });

        const partName = document.createElement('div');
        partName.textContent = part.name;
        Object.assign(partName.style, {
            color: '#6c757d',
            fontSize: '0.85rem',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        });

        partInfo.appendChild(subcatEl);
        partInfo.appendChild(partName);

        const rightContainer = document.createElement('div');
        rightContainer.style.cssText = 'display: flex; align-items: center; gap: 1rem; flex-shrink: 0;';

        const priceContainer = document.createElement('div');
        priceContainer.style.cssText = 'text-align: right;';

        const finalPriceEl = document.createElement('div');
        finalPriceEl.textContent = `Lp$ ${finalPrice.toLocaleString()}`;
        Object.assign(finalPriceEl.style, {
            fontWeight: '700',
            color: '#28a745',
            fontSize: '0.95rem'
        });

        priceContainer.appendChild(finalPriceEl);

        const removeBtn = this.createRemoveButton(cat, subcat);

        rightContainer.appendChild(priceContainer);
        rightContainer.appendChild(removeBtn);

        itemEl.appendChild(partInfo);
        itemEl.appendChild(rightContainer);

        return itemEl;
    }

    static createRemoveButton(cat, subcat) {
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remover peça';
        Object.assign(removeBtn.style, {
            background: '#dc3545',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '4px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'all 0.2s ease',
            flexShrink: '0'
        });

        removeBtn.addEventListener('mouseenter', () => {
            removeBtn.style.background = '#c82333';
            removeBtn.style.transform = 'scale(1.1)';
        });

        removeBtn.addEventListener('mouseleave', () => {
            removeBtn.style.background = '#dc3545';
            removeBtn.style.transform = 'scale(1)';
        });

        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removePartFromSummary(cat, subcat);
        });

        return removeBtn;
    }

    static removePartFromSummary(cat, subcat) {
        const itemEl = event.target.closest('.summary-item');
        if (itemEl) {
            itemEl.style.opacity = '0';
            itemEl.style.transform = 'translateX(-20px)';
            itemEl.style.height = '0';
            itemEl.style.padding = '0';
            itemEl.style.margin = '0';
            itemEl.style.overflow = 'hidden';
            itemEl.style.transition = 'all 0.3s ease';
        }

        setTimeout(() => {
            delete AppState.selectedParts[cat][subcat];
            if (Object.keys(AppState.selectedParts[cat]).length === 0) {
                delete AppState.selectedParts[cat];
            }
            this.loadCategoryParts();
            this.updateSummary();
        }, 300);
    }

    static clearAllParts() {
        if (Object.keys(AppState.selectedParts).length === 0) {
            return;
        }

        const summaryContainer = Cache.elements.summaryItemsElement;
        if (summaryContainer) {
            summaryContainer.style.opacity = '0.5';
            summaryContainer.style.transition = 'opacity 0.3s ease';
        }

        setTimeout(() => {
            AppState.selectedParts = {};
            this.loadCategoryParts();
            this.updateSummary();

            if (summaryContainer) {
                summaryContainer.style.opacity = '1';
            }

            UIManager.showAutoStatus('Todas as peças foram removidas', 'success');
        }, 300);
    }

    static updateProfit() {
        if (!Cache.elements) return;

        const { carPriceInput, paymentPriceInput, profitElement } = Cache.elements;
        if (!carPriceInput || !paymentPriceInput || !profitElement) return;

        const carPrice = Utils.parsePrice(carPriceInput.value);
        const paymentPrice = Utils.parsePrice(paymentPriceInput.value);
        const totalCustomization = this.calculateTotalPrice();

        const profit = (totalCustomization + carPrice) * -1 + paymentPrice;

        profitElement.textContent = `Lp$ ${profit.toLocaleString()}`;

        if (profit > 0) {
            profitElement.style.color = '#28a745';
            profitElement.style.fontWeight = '700';
        } else if (profit < 0) {
            profitElement.style.color = '#dc3545';
            profitElement.style.fontWeight = '700';
        } else {
            profitElement.style.color = '#6c757d';
            profitElement.style.fontWeight = '500';
        }
    }

    static parsePrice(priceString) {
        if (!priceString || priceString.trim() === '') return 0;
        return parseInt(priceString.replace("Lp$ ", "").replace(/\D/g, '')) || 0;
    }

    static showError(message) {
        if (!Cache.elements) {
            console.error("❌ Cache.elements não disponível em showError");
            this.cacheElements();
        }

        const partsListElement = Cache.elements?.partsListElement;
        if (partsListElement) {
            partsListElement.innerHTML = `<div class="error">${message}</div>`;
        } else {
            console.error("❌ Não foi possível mostrar erro - partsListElement não encontrado:", message);
        }
    }

    static showAutoStatus(message, type) {
        if (!Cache.elements || !Cache.elements.autoStatus) {
            console.error("❌ autoStatus não disponível");
            return;
        }

        const { autoStatus } = Cache.elements;
        autoStatus.textContent = message;
        autoStatus.className = `auto-status ${type}`;

        if (type === 'success') {
            setTimeout(() => {
                autoStatus.textContent = '';
                autoStatus.className = 'auto-status';
            }, 5000);
        }
    }
}

// ========== PROCESSADOR DE IMAGENS ==========
class ImageProcessor {
    static async handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (AppState.isProcessing) {
            console.log("⏳ Já existe um processamento em andamento...");
            UIManager.showAutoStatus("Já existe um processamento em andamento", "warning");
            return;
        }

        await ImageProcessor.processImage(file);
        e.target.value = '';
    }

    static async processImage(file) {
        if (!file.type.startsWith('image/')) {
            UIManager.showAutoStatus('Selecione um arquivo de imagem válido', 'error');
            return;
        }

        console.log("📸 Arquivo selecionado:", file.name, "Tipo:", file.type, "Tamanho:", file.size);

        if (AppState.ocrRequestsToday >= AppState.maxOcrRequests) {
            UIManager.showAutoStatus('Limite diário de OCR atingido. Tente amanhã.', 'error');
            return;
        }

        AppState.isProcessing = true;
        UIManager.showAutoStatus("Processando imagem com OCR...", "processing");

        try {
            console.log("📤 Iniciando upload da imagem...");
            const extractedText = await ImageProcessor.extractTextWithOCRSpace(file);

            if (!extractedText) {
                throw new Error('Resposta vazia do OCR');
            }

            if (extractedText.trim().length < CONFIG.MIN_IMAGE_TEXT_LENGTH) {
                console.warn("⚠️ Texto extraído muito curto:", extractedText.length, "caracteres");
                console.log("📝 Texto completo:", extractedText);
                throw new Error('Texto extraído muito curto para análise');
            }

            console.log("✅ Texto extraído com sucesso! Tamanho:", extractedText.length, "caracteres");
            console.log("=== TEXTO EXTRAÍDO DA IMAGEM ===");
            console.log(extractedText);
            console.log("=================================");

            const results = ImageProcessor.processExtractedText(extractedText);

            if (results.parts.length === 0) {
                console.warn("⚠️ Nenhuma peça identificada no texto");
                UIManager.showAutoStatus("Nenhuma peça identificada no texto", "warning");
            } else {
                ImageProcessor.applyResults(results);
                AppState.ocrRequestsToday++;
                UIManager.showAutoStatus(`Sucesso! ${results.parts.length} peça(s) encontrada(s)`, "success");
            }

        } catch (error) {
            console.error("❌ Erro no processamento:", error);
            UIManager.showAutoStatus(`Erro: ${error.message}`, "error");

            if (error.message.includes('CORS')) {
                console.error("🔧 Possível problema de CORS. Verifique a URL da API.");
            }
        } finally {
            AppState.isProcessing = false;
        }
    }

    static async extractTextWithOCRSpace(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('apikey', CONFIG.OCR_SPACE_API_KEY);
        formData.append('language', 'por');
        formData.append('isOverlayRequired', 'false');
        formData.append('isTable', 'false');
        formData.append('scale', 'true');
        formData.append('OCREngine', '2');

        UIManager.showAutoStatus("Enviando imagem para OCR...", "processing");

        try {
            console.log("🌐 Enviando requisição para API OCR...");

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch(CONFIG.OCR_SPACE_API_URL, {
                method: 'POST',
                body: formData,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("📥 Resposta da API recebida:", data);

            if (data.IsErroredOnProcessing) {
                throw new Error(data.ErrorMessage || 'Erro no processamento OCR');
            }

            if (!data.ParsedResults || data.ParsedResults.length === 0) {
                throw new Error('Nenhum texto encontrado na imagem');
            }

            const extractedText = data.ParsedResults[0].ParsedText;

            if (!extractedText || extractedText.trim().length === 0) {
                throw new Error('Texto vazio retornado do OCR');
            }

            UIManager.showAutoStatus("Texto extraído com sucesso!", "success");
            return extractedText;

        } catch (error) {
            console.error('❌ Erro OCR.space:', error);
            if (error.name === 'AbortError') {
                throw new Error('Timeout: A requisição demorou muito (30 segundos)');
            }
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Falha na conexão com o serviço OCR. Verifique sua internet.');
            }
            throw error;
        }
    }

    static processExtractedText(text) {
        console.log("🔧 Processando texto extraído...");

        const cleanedText = text
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/\n+/g, '\n')
            .replace(/[^\S\n]+/g, ' ')
            .trim();

        const lines = cleanedText.split('\n')
            .map(line => line.trim())
            .filter(line => {
                const keep = line.length > 1 && !ImageProcessor.isLikelyNoise(line);
                if (!keep) {
                    console.log(`🗑️ Linha descartada: "${line}"`);
                }
                return keep;
            });

        console.log("=== LINHAS FILTRADAS ===");
        lines.forEach((line, i) => console.log(`${i + 1}. "${line}"`));
        console.log("=========================");

        const priceResults = ImageProcessor.extractAllPrices(lines);
        const foundParts = ImageProcessor.findPartsInText(lines);

        console.log("=== PEÇAS ENCONTRADAS ===");
        foundParts.forEach((part, index) => {
            console.log(`${index + 1}. ${part.category}/${part.subcategory}: ${part.name} - Lp$ ${part.price}`);
        });
        console.log("=========================");

        return {
            parts: foundParts,
            carPrice: priceResults.carPrice,
            paymentPrice: priceResults.paymentPrice
        };
    }

    static findPartsInText(lines) {
        const foundParts = [];
        const usedSubcategories = new Set();

        console.log("=== PROCESSANDO LINHAS PARA ENCONTRAR PEÇAS ===");

        for (const line of lines) {
            const cleanLine = line.trim();
            if (ImageProcessor.isPriceOrMetadataLine(cleanLine)) {
                console.log(`⏭️ Ignorando linha de preço/metadata: "${cleanLine}"`);
                continue;
            }

            console.log(`\n🔍 Processando linha: "${cleanLine}"`);

            const foundPart = SearchEngine.findPartWithCategory(cleanLine);

            if (foundPart) {
                const subcategoryKey = `${foundPart.category}-${foundPart.subcategory}`;

                if (!usedSubcategories.has(subcategoryKey)) {
                    foundParts.push(foundPart);
                    usedSubcategories.add(subcategoryKey);
                    console.log(`✅ PEÇA ADICIONADA: "${cleanLine}" -> "${foundPart.name}" (${foundPart.category}/${foundPart.subcategory})`);
                } else {
                    console.log(`⏭️ Subcategoria já usada: ${subcategoryKey} - Ignorando duplicata`);

                    const existingIndex = foundParts.findIndex(p =>
                        `${p.category}-${p.subcategory}` === subcategoryKey
                    );
                    if (existingIndex !== -1 && foundPart.score > foundParts[existingIndex].score) {
                        console.log(`🔄 Substituindo peça anterior por uma com melhor score`);
                        foundParts[existingIndex] = foundPart;
                    }
                }
            } else {
                console.log(`❌ PEÇA NÃO ENCONTRADA: "${cleanLine}"`);
            }
        }

        console.log(`\n📊 TOTAL: ${foundParts.length} peças encontradas`);
        return foundParts;
    }

    static applyResults(results) {
        console.log("=== APLICANDO RESULTADOS ===");

        if (results.carPrice && Cache.elements && Cache.elements.carPriceInput) {
            Cache.elements.carPriceInput.value = `Lp$ ${results.carPrice}`;
            console.log(`🚗 Preço do carro definido: Lp$ ${results.carPrice}`);
        }
        if (results.paymentPrice && Cache.elements && Cache.elements.paymentPriceInput) {
            Cache.elements.paymentPriceInput.value = `Lp$ ${results.paymentPrice}`;
            console.log(`💰 Preço de pagamento definido: Lp$ ${results.paymentPrice}`);
        }

        AppState.selectedParts = {};
        results.parts.forEach(part => {
            if (!AppState.selectedParts[part.category]) {
                AppState.selectedParts[part.category] = {};
            }
            AppState.selectedParts[part.category][part.subcategory] = {
                name: part.name,
                price: part.price
            };
            console.log(`📝 Peça adicionada: ${part.category}/${part.subcategory} - ${part.name}`);
        });

        UIManager.loadCategoryParts();
        UIManager.updateSummary();
        UIManager.updateProfit();

        console.log(`✅ Finalizado: ${results.parts.length} peças aplicadas`);
    }

    static extractAllPrices(lines) {
        let carPrice = null;
        let paymentPrice = null;

        console.log("=== EXTRACTION DE PREÇOS ===");

        lines.forEach((line, index) => {
            const cleanLine = line.trim();
            console.log(`Linha ${index}: "${cleanLine}"`);

            if (!carPrice && ImageProcessor.hasCarPriceContext(cleanLine)) {
                carPrice = ImageProcessor.extractFirstPrice(cleanLine);
                if (carPrice) console.log(`🚗 Preço do carro detectado: Lp$ ${carPrice}`);
            }

            if (!paymentPrice && ImageProcessor.hasPaymentPriceContext(cleanLine)) {
                paymentPrice = ImageProcessor.extractFirstPrice(cleanLine);
                if (paymentPrice) console.log(`💰 Preço de pagamento detectado: Lp$ ${paymentPrice}`);
            }

            const pricesInLine = ImageProcessor.extractPricesFromText(cleanLine);
            if (pricesInLine.length > 0) {
                console.log(`💵 Preços encontrados na linha: ${pricesInLine.join(', ')}`);
            }
        });

        if (!carPrice || !paymentPrice) {
            const allPrices = [];
            lines.forEach(line => {
                const prices = ImageProcessor.extractPricesFromText(line);
                allPrices.push(...prices);
            });

            const validPrices = [...new Set(allPrices)]
                .filter(p => p > CONFIG.MIN_PRICE_THRESHOLD)
                .sort((a, b) => a - b);

            console.log(`📊 Todos os preços válidos encontrados: ${validPrices.join(', ')}`);

            if (validPrices.length >= 2) {
                if (!carPrice) carPrice = validPrices[0];
                if (!paymentPrice) paymentPrice = validPrices[validPrices.length - 1];
            } else if (validPrices.length === 1 && !carPrice) {
                carPrice = validPrices[0];
            }
        }

        console.log(`🎯 RESULTADO FINAL - Carro: Lp$ ${carPrice}, Pagamento: Lp$ ${paymentPrice}`);
        return { carPrice, paymentPrice };
    }

    static hasCarPriceContext(line) {
        const lower = line.toLowerCase();
        const contexts = [
            'custo', 'veiculo', 'carro', 'compra', 'valor do carro',
            'custo do veiculo', 'custo veiculo', 'valor veiculo'
        ];
        return contexts.some(context => lower.includes(context));
    }

    static hasPaymentPriceContext(line) {
        const lower = line.toLowerCase();
        const contexts = [
            'pagamento', 'pago', 'recebido', 'venda', 'valor pago',
            'pagamento total', 'valor recebido', 'total pago'
        ];
        return contexts.some(context => lower.includes(context));
    }

    static extractPricesFromText(text) {
        const prices = [];

        const pricePatterns = [
            /lp\s*\$?\s*(\d[\d\s.,]*\d)/gi,
            /lps\s*\$?\s*(\d[\d\s.,]*\d)/gi,
            /(\d{5,})/g,
            /(\d[\d\s.]{4,}\d)/g
        ];

        for (const pattern of pricePatterns) {
            let match;
            while ((match = pattern.exec(text)) !== null) {
                const priceStr = match[1] || match[0];
                if (priceStr) {
                    const cleanPriceStr = priceStr.replace(/[\s.,]/g, '');
                    const price = parseInt(cleanPriceStr);

                    if (price > CONFIG.MIN_PRICE_THRESHOLD && price < 10000000) {
                        prices.push(price);
                        console.log(`🔍 Preço detectado: "${priceStr}" -> ${price}`);
                    }
                }
            }
        }

        return [...new Set(prices)];
    }

    static extractFirstPrice(text) {
        const prices = ImageProcessor.extractPricesFromText(text);
        return prices.length > 0 ? prices[0] : null;
    }

    static isPriceOrMetadataLine(line) {
        const lower = line.toLowerCase();
        const metadataKeywords = ['custo', 'pagamento', 'veiculo', 'carro', 'preço', 'valor', 'total', 'lucro', 'resumo', 'compra', 'venda'];

        return metadataKeywords.some(keyword => lower.includes(keyword)) ||
            /^lp\s*\$?\s*\d+$/.test(lower.trim()) ||
            /^\d+$/.test(line.trim());
    }

    static isLikelyNoise(line) {
        const noisePatterns = [
            /^[^a-zA-Z0-9]*$/,
            /^\W+$/,
            /^\.{3,}$/,
            /^-{3,}$/,
            /^_{3,}$/,
            /^[0-9\s\.]+$/
        ];

        return noisePatterns.some(pattern => pattern.test(line));
    }
}

class PartValidator {
    static validatePartExistence(category, subcategory, partName) {
        const parts = AppState.partsData[AppState.currentClass]?.[category]?.[subcategory];
        if (!parts) {
            console.log(`❌ Categoria/Subcategoria não encontrada: ${category}/${subcategory}`);
            return false;
        }

        const exists = partName in parts;
        console.log(`🔍 Validação: ${category}/${subcategory}/${partName} -> ${exists ? 'EXISTE' : 'NÃO EXISTE'}`);
        return exists;
    }

    static getAllAvailableParts() {
        const allParts = {};

        for (const [className, categories] of Object.entries(AppState.partsData)) {
            allParts[className] = {};

            for (const [category, subcategories] of Object.entries(categories)) {
                allParts[className][category] = {};

                for (const [subcategory, parts] of Object.entries(subcategories)) {
                    allParts[className][category][subcategory] = Object.keys(parts);
                }
            }
        }

        return allParts;
    }

    static findSimilarParts(partName, threshold = 0.7) {
        const similar = [];
        const classData = AppState.partsData[AppState.currentClass];

        if (!classData) return similar;

        for (const [category, subcategories] of Object.entries(classData)) {
            for (const [subcategory, parts] of Object.entries(subcategories)) {
                for (const availablePart of Object.keys(parts)) {
                    const similarity = SearchEngine.calculateAdvancedSimilarity(
                        Utils.normalizeText(partName),
                        Utils.normalizeText(availablePart)
                    );

                    if (similarity >= threshold) {
                        similar.push({
                            category,
                            subcategory,
                            name: availablePart,
                            price: parts[availablePart],
                            similarity
                        });
                    }
                }
            }
        }

        return similar.sort((a, b) => b.similarity - a.similarity);
    }
}

class EnhancedSearchEngine extends SearchEngine {
    static findPartWithCategory(searchText) {
        // ... implementação melhorada que usa o PartValidator
    }

    static buildDynamicMappings() {
        // Construir mapeamentos dinâmicos baseados nas peças reais
        const dynamicMappings = {};
        const allParts = PartValidator.getAllAvailableParts();

        // Gerar mapeamentos automáticos para todas as peças
        for (const [className, categories] of Object.entries(allParts)) {
            for (const [category, subcategories] of Object.entries(categories)) {
                for (const [subcategory, parts] of Object.entries(subcategories)) {
                    parts.forEach(partName => {
                        const normalized = Utils.normalizeText(partName);

                        // Criar variações comuns
                        const variations = this.generateVariations(partName);
                        variations.forEach(variation => {
                            dynamicMappings[variation] = partName;
                        });
                    });
                }
            }
        }

        return dynamicMappings;
    }

    static generateVariations(partName) {
        const variations = [];
        const normalized = Utils.normalizeText(partName);

        variations.push(normalized);

        // Remover marcas comuns
        variations.push(normalized.replace(/(proracing|hks|garret|takashing)\s*/gi, '').trim());

        // Adicionar abreviações
        if (normalized.includes('header')) {
            variations.push(normalized.replace('header', 'hd'));
        }
        if (normalized.includes('bronzina')) {
            variations.push(normalized.replace('bronzina', 'brz'));
        }

        return [...new Set(variations.filter(v => v.length > 2))];
    }
}

// ========== INICIALIZAÇÃO DA APLICAÇÃO ==========
class AppInitializer {
    static async initialize() {
        console.log("🚀 Inicializando aplicação...");

        try {
            UIManager.initialize();
            await this.loadPartsData();
            await this.verifyAuthentication();
            this.loadOCRState();

            console.log("✅ Aplicação inicializada com sucesso!");
        } catch (error) {
            console.error("❌ Erro na inicialização:", error);
            UIManager.showError('Erro na inicialização: ' + error.message);
        }
    }

    static async verifyAuthentication() {
        try {
            const res = await fetch('/me');
            if (!res.ok) throw new Error('Não autorizado');

            const user = await res.json();
            if (user.role === 'admin' || user.role === 'user') {
                document.body.classList.remove('hidden');
            } else {
                this.redirectToLogin();
            }
        } catch (error) {
            console.log("⚠️ Não autenticado, redirecionando para login");
            this.redirectToLogin();
        }
    }

    static redirectToLogin() {
        window.location.href = '/login.html';
    }

    static loadPartsData() {
        return new Promise((resolve, reject) => {
            console.log("📥 Carregando dados das peças...");

            fetch('precos.json')
                .then(res => {
                    if (!res.ok) throw new Error('Falha ao carregar dados');
                    return res.json();
                })
                .then(data => {
                    AppState.partsData = data;
                    this.prebuildCategoryCache();
                    this.debugLoadedData();

                    if (typeof UIManager.loadCategoryParts === 'function') {
                        UIManager.loadCategoryParts();
                    }

                    console.log("✅ Dados das peças carregados com sucesso!");
                    resolve();
                })
                .catch(err => {
                    console.error("❌ Erro ao carregar dados:", err);
                    if (typeof UIManager.showError === 'function') {
                        UIManager.showError('Erro ao carregar os dados: ' + err.message);
                    } else {
                        console.error("Erro ao carregar dados (UI não disponível):", err.message);
                    }
                    reject(err);
                });
        });
    }

    static prebuildCategoryCache() {
        Cache.category.clear();
        for (const [className, categories] of Object.entries(AppState.partsData)) {
            for (const [categoryName, subcategories] of Object.entries(categories)) {
                const key = `${className}-${categoryName}`;
                Cache.category.set(key, subcategories);
            }
        }
        console.log("✅ Cache de categorias pré-construído");
    }

    static loadOCRState() {
        const savedState = localStorage.getItem('ocrState');
        if (savedState) {
            const state = JSON.parse(savedState);
            AppState.ocrRequestsToday = state.requestsToday || 0;

            const lastReset = state.lastReset ? new Date(state.lastReset) : new Date();
            const today = new Date();
            if (lastReset.getDate() !== today.getDate() ||
                lastReset.getMonth() !== today.getMonth() ||
                lastReset.getFullYear() !== today.getFullYear()) {
                AppState.ocrRequestsToday = 0;
                this.saveOCRState();
            }
        }
    }

    static saveOCRState() {
        const state = {
            requestsToday: AppState.ocrRequestsToday,
            lastReset: new Date().toISOString()
        };
        localStorage.setItem('ocrState', JSON.stringify(state));
    }

    static debugLoadedData() {
        console.log("=== DADOS CARREGADOS ===");
        if (AppState.partsData && AppState.partsData[AppState.currentClass]) {
            console.log(`Classe: ${AppState.currentClass}`);
            for (const [category, subcategories] of Object.entries(AppState.partsData[AppState.currentClass])) {
                console.log(`📁 ${category}:`);
                for (const [subcategory, parts] of Object.entries(subcategories)) {
                    console.log(`  └─ ${subcategory}: ${Object.keys(parts).length} peças`);
                }
            }
        } else {
            console.log("❌ Nenhum dado carregado");
        }
    }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function () {
    console.log("📄 DOM Carregado, iniciando aplicação...");
    AppInitializer.initialize().catch(error => {
        console.error("❌ Erro fatal na inicialização:", error);
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;padding:10px;z-index:10000;';
        errorDiv.textContent = 'Erro ao carregar a aplicação: ' + error.message;
        document.body.appendChild(errorDiv);
    });
});
