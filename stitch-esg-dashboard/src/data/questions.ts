import type { Question } from '../types';

export const diagnosticQuestions: Question[] = [
  // ==================== FORM SECTION ====================
  {
    id: "form_1.1",
    category: "form",
    subcategory: "IDENTIFICAÇÃO",
    text: "Nome da Empresa ou Projeto",
    inputType: "text",
    options: []
  },
  {
    id: "form_1.2",
    category: "form",
    subcategory: "IDENTIFICAÇÃO",
    text: "CNPJ ou CPF do responsável",
    inputType: "number",
    options: []
  },
  {
    id: "form_1.3",
    category: "form",
    subcategory: "TAMANHO E PORTE",
    text: "Tamanho e porte da empresa",
    inputType: "radio",
    options: [
      { label: "Microempresa", value: "microempresa", points: 0, weight: 1 },
      { label: "Empresa de pequeno porte", value: "pequeno_porte", points: 0, weight: 1 },
      { label: "Empresa de médio porte", value: "medio_porte", points: 0, weight: 1 },
      { label: "Empresa de grande porte", value: "grande_porte", points: 0, weight: 1 },
      { label: "Multinacional", value: "multinacional", points: 0, weight: 1 },
      { label: "ONG - Terceiro setor", value: "ong", points: 0, weight: 1 },
      { label: "Outros", value: "outros", points: 0, weight: 1 }
    ]
  },
  {
    id: "form_1.4",
    category: "form",
    subcategory: "ESCOPO",
    text: "Qual o período desta avaliação? (último ano fiscal)",
    description: "A nossa sugestão é que os dados informados correspondam ao último ano fiscal. Exemplo: Janeiro/2024 a Dezembro/2024.",
    inputType: "text",
    options: []
  },
  {
    id: "form_1.5",
    category: "form",
    subcategory: "SETOR",
    text: "Setor da empresa",
    inputType: "select",
    options: [
      { label: "Fornecimento de matérias-primas", value: "materias_primas", points: 0, weight: 1 },
      { label: "Agropecuária", value: "agropecuaria", points: 0, weight: 1 },
      { label: "Mineração", value: "mineracao", points: 0, weight: 1 },
      { label: "Indústria", value: "industria", points: 0, weight: 1 },
      { label: "Informática", value: "informatica", points: 0, weight: 1 },
      { label: "Construção civil", value: "construcao", points: 0, weight: 1 },
      { label: "Comércio", value: "comercio", points: 0, weight: 1 },
      { label: "Educação", value: "educacao", points: 0, weight: 1 },
      { label: "Saúde", value: "saude", points: 0, weight: 1 },
      { label: "Transporte", value: "transporte", points: 0, weight: 1 },
      { label: "Finanças", value: "financas", points: 0, weight: 1 },
      { label: "E-commerce", value: "ecommerce", points: 0, weight: 1 },
      { label: "Serviços", value: "servicos", points: 0, weight: 1 },
      { label: "Outro", value: "outro", points: 0, weight: 1 }
    ]
  },
  {
    id: "form_1.5a",
    category: "form",
    subcategory: "SETOR",
    text: "Sobre a segurança dos dados em seu ambiente digital",
    inputType: "radio",
    options: [
      { label: "Não possuímos qualquer política, ferramenta ou procedimento formal para proteção de dados digitais.", value: 1, points: 1, weight: 1 },
      { label: "Adotamos algumas medidas básicas de segurança digital (antivírus, senhas ou backups), porém sem políticas formais.", value: 2, points: 2, weight: 1 },
      { label: "A empresa possui práticas de proteção de dados e políticas internas básicas de segurança da informação.", value: 3, points: 3, weight: 1 },
      { label: "Existem políticas formais de segurança da informação e privacidade implementadas, alinhados à LGPD.", value: 4, points: 4, weight: 1 },
      { label: "A organização possui programa estruturado de governança e proteção de dados com treinamento interno e conformidade com LGPD.", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "form_1.5b",
    category: "form",
    subcategory: "SETOR",
    text: "Embalagem",
    inputType: "radio",
    options: [
      { label: "A empresa não possui diretrizes ou critérios ambientais para embalagens.", value: 1, points: 1, weight: 1 },
      { label: "A empresa começa a considerar a redução de embalagens ou o uso de materiais recicláveis.", value: 2, points: 2, weight: 1 },
      { label: "A empresa adota práticas para reduzir o volume de embalagens e prioriza materiais recicláveis.", value: 3, points: 3, weight: 1 },
      { label: "A empresa possui política ou diretrizes formais para embalagens sustentáveis.", value: 4, points: 4, weight: 1 },
      { label: "A empresa adota estratégias de economia circular para embalagens com metas e monitoramento contínuo.", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "form_1.5c",
    category: "form",
    subcategory: "SETOR",
    text: "Distribuição",
    inputType: "radio",
    options: [
      { label: "A empresa não possui qualquer estratégia para otimização logística.", value: 1, points: 1, weight: 1 },
      { label: "A empresa adota algumas práticas básicas de organização logística.", value: 2, points: 2, weight: 1 },
      { label: "A empresa busca otimizar a distribuição de produtos por meio de planejamento logístico.", value: 3, points: 3, weight: 1 },
      { label: "A empresa implementa práticas estruturadas para tornar a distribuição mais eficiente e sustentável.", value: 4, points: 4, weight: 1 },
      { label: "A empresa possui estratégia de logística sustentável com metas de redução de emissões e monitoramento.", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "form_1.6",
    category: "form",
    subcategory: "SEDE",
    text: "CIDADE",
    inputType: "text",
    options: []
  },
  {
    id: "form_1.7",
    category: "form",
    subcategory: "SEDE",
    text: "ESTADO",
    inputType: "select",
    options: [
      { label: "Acre", value: "AC", points: 0, weight: 1 },
      { label: "Alagoas", value: "AL", points: 0, weight: 1 },
      { label: "Amapá", value: "AP", points: 0, weight: 1 },
      { label: "Amazonas", value: "AM", points: 0, weight: 1 },
      { label: "Bahia", value: "BA", points: 0, weight: 1 },
      { label: "Ceará", value: "CE", points: 0, weight: 1 },
      { label: "Distrito Federal", value: "DF", points: 0, weight: 1 },
      { label: "Espírito Santo", value: "ES", points: 0, weight: 1 },
      { label: "Goiás", value: "GO", points: 0, weight: 1 },
      { label: "Maranhão", value: "MA", points: 0, weight: 1 },
      { label: "Mato Grosso", value: "MT", points: 0, weight: 1 },
      { label: "Mato Grosso do Sul", value: "MS", points: 0, weight: 1 },
      { label: "Minas Gerais", value: "MG", points: 0, weight: 1 },
      { label: "Pará", value: "PA", points: 0, weight: 1 },
      { label: "Paraíba", value: "PB", points: 0, weight: 1 },
      { label: "Paraná", value: "PR", points: 0, weight: 1 },
      { label: "Pernambuco", value: "PE", points: 0, weight: 1 },
      { label: "Piauí", value: "PI", points: 0, weight: 1 },
      { label: "Rio de Janeiro", value: "RJ", points: 0, weight: 1 },
      { label: "Rio Grande do Norte", value: "RN", points: 0, weight: 1 },
      { label: "Rio Grande do Sul", value: "RS", points: 0, weight: 1 },
      { label: "Rondônia", value: "RO", points: 0, weight: 1 },
      { label: "Roraima", value: "RR", points: 0, weight: 1 },
      { label: "Santa Catarina", value: "SC", points: 0, weight: 1 },
      { label: "São Paulo", value: "SP", points: 0, weight: 1 },
      { label: "Sergipe", value: "SE", points: 0, weight: 1 },
      { label: "Tocantins", value: "TO", points: 0, weight: 1 }
    ]
  },
  {
    id: "form_1.8",
    category: "form",
    subcategory: "PROPRIEDADE",
    text: "A empresa pertence a:",
    inputType: "radio",
    options: [
      { label: "A empresa possui controle societário concentrado e não apresenta diversidade significativa.", value: 1, points: 1, weight: 1 },
      { label: "A empresa possui alguma diversidade entre sócios, porém sem participação relevante de grupos sub-representados.", value: 2, points: 2, weight: 1 },
      { label: "A empresa possui diversidade significativa no quadro societário, incluindo participação expressiva de mulheres ou grupos sub-representados.", value: 3, points: 3, weight: 1 },
      { label: "A empresa é majoritariamente controlada ou fundada por mulheres ou pessoas pertencentes a grupos historicamente sub-representados.", value: 4, points: 4, weight: 1 },
      { label: "A empresa é controlada por mulheres ou grupos sub-representados e possui compromisso formal com diversidade na governança.", value: 5, points: 5, weight: 1 }
    ]
  },

  // ==================== ENVIRONMENTAL SECTION ====================
  {
    id: "environmental_2.1",
    category: "environmental",
    subcategory: "2. EMISSÕES DE CARBONO",
    text: "Emissões de Carbono",
    description: "Os indicadores de emissões de gases de efeito estufa (GEE) são cada vez mais relevantes para a gestão das organizações.",
    inputType: "radio",
    options: [
      { label: "Ainda não conhecemos nossas emissões de carbono", value: 1, points: 1, weight: 1, recommendation: "Realizar o Inventário de Emissões de Gases de Efeito Estufa para conhecer o impacto climático." },
      { label: "Não conhecemos nossas emissões, mas existem práticas internas de descarbonização", value: 2, points: 2, weight: 1, recommendation: "Formalizar o inventário de emissões seguindo metodologias como GHG Protocol." },
      { label: "Realizamos o Inventário de Emissão de GEE, mas ainda não possuímos metas", value: 3, points: 3, weight: 1, recommendation: "Estabelecer metas claras de redução de emissões." },
      { label: "Realizamos o Inventário de Emissão de GEE e possuímos metas de redução", value: 4, points: 4, weight: 1, recommendation: "Manter o inventário atualizado e considerar investimentos em soluções baseadas na natureza." },
      { label: "Realizamos o Inventário, possuímos metas, investimos na descarbonização e batemos nossas metas", value: 5, points: 5, weight: 1, recommendation: "Continuar avançando nas metas de redução." }
    ]
  },
  {
    id: "environmental_2.1A",
    category: "environmental",
    subcategory: "2. EMISSÕES DE CARBONO",
    text: "Forneça os dados relativos ao seu Inventário de Emissão de Gases de Efeito Estufa (GEE)",
    description: "Informe as emissões de cada escopo em Ton CO2e",
    inputType: "number",
    dependsOn: { questionId: "environmental_2.1", value: 3 },
    options: [
      { label: "Emissões do ESCOPO 1 (diretas)", value: "escopo1", points: 0, weight: 1 },
      { label: "Emissões do ESCOPO 2 (energia)", value: "escopo2", points: 0, weight: 1 },
      { label: "Emissões do ESCOPO 3 (indiretas)", value: "escopo3", points: 0, weight: 1 }
    ]
  },
  {
    id: "environmental_2.1B",
    category: "environmental",
    subcategory: "2. EMISSÕES DE CARBONO",
    text: "Compensação de Carbono",
    description: "Quantas toneladas de CO2e já deixaram de emitir ou foram compensadas?",
    inputType: "number",
    dependsOn: { questionId: "environmental_2.1", value: 3 },
    options: [
      { label: "Já deixamos de emitir (Ton CO2e)", value: "reducao", points: 0, weight: 1 },
      { label: "Já compensamos (Ton CO2e)", value: "compensacao", points: 0, weight: 1 }
    ]
  },
  {
    id: "environmental_3.1",
    category: "environmental",
    subcategory: "3. ÁGUA E EFLUENTES",
    text: "Como é a gestão de água e efluentes?",
    description: "Conhecer, monitorar e reportar o consumo de água permite compreender os impactos sobre os recursos hídricos.",
    inputType: "radio",
    options: [
      { label: "Não monitoramos ainda", value: 1, points: 1, weight: 1, recommendation: "Implementar o monitoramento básico do consumo de água." },
      { label: "Monitoramos, mas não estabelecemos metas de redução", value: 2, points: 2, weight: 1, recommendation: "Implementar monitoramento setorial e estabelecer metas." },
      { label: "A empresa monitora o consumo de água e efluentes", value: 3, points: 3, weight: 1, recommendation: "Estabelecer metas de redução." },
      { label: "Tem reduzido o seu consumo através da busca por metas de redução", value: 4, points: 4, weight: 1, recommendation: "Ampliar iniciativas de eficiência hídrica." },
      { label: "Mais de 50% do consumo atual de água é proveniente de fontes ecoeficientes", value: 5, points: 5, weight: 1, recommendation: "Manter e expandir o uso de fontes sustentáveis." }
    ]
  },
  {
    id: "environmental_3.1A",
    category: "environmental",
    subcategory: "3. ÁGUA E EFLUENTES",
    text: "Consumo de água em litros no último ano fiscal",
    inputType: "number",
    dependsOn: { questionId: "environmental_3.1", value: 2 },
    options: [
      { label: "Litros consumidos", value: "litros", points: 0, weight: 1 }
    ]
  },
  {
    id: "environmental_3.1B",
    category: "environmental",
    subcategory: "3. ÁGUA E EFLUENTES",
    text: "Qual a sua meta de redução em %",
    inputType: "number",
    dependsOn: { questionId: "environmental_3.1", value: 4 },
    options: [
      { label: "Meta de redução (%)", value: "meta", points: 0, weight: 1 }
    ]
  },
  {
    id: "environmental_3.2",
    category: "environmental",
    subcategory: "3. ENERGIA",
    text: "Como a empresa gerencia o consumo de energia?",
    inputType: "radio",
    options: [
      { label: "Não monitoramos", value: 1, points: 1, weight: 1, recommendation: "Iniciar o monitoramento do consumo de energia a partir das contas de eletricidade." },
      { label: "Monitoramos, mas não estabelecemos metas de redução", value: 2, points: 2, weight: 1, recommendation: "Estabelecer indicadores de eficiência energética." },
      { label: "A empresa monitora e tem reduzido o seu consumo", value: 3, points: 3, weight: 1, recommendation: "Expandir o uso de fontes renováveis." },
      { label: "Alcançamos as metas de redução no consumo no último ano fiscal", value: 4, points: 4, weight: 1, recommendation: "Manter as práticas de eficiência e avançar na transição energética." },
      { label: "A empresa possui tecnologias verdes implementadas para diversificar suas fontes", value: 5, points: 5, weight: 1, recommendation: "Continuar expandindo a matriz energética renovável." }
    ]
  },
  {
    id: "environmental_3.2A",
    category: "environmental",
    subcategory: "3. ENERGIA",
    text: "Consumo de energia no último ano fiscal (kWh)",
    inputType: "number",
    dependsOn: { questionId: "environmental_3.2", value: 2 },
    options: [
      { label: "kWh consumidos", value: "kwh", points: 0, weight: 1 }
    ]
  },
  {
    id: "environmental_3.2B",
    category: "environmental",
    subcategory: "3. ENERGIA",
    text: "Fontes de fornecimento de energia",
    inputType: "radio",
    dependsOn: { questionId: "environmental_3.2", value: 2 },
    options: [
      { label: "Fornecimento regular e geradores movidos à diesel", value: 1, points: 1, weight: 1 },
      { label: "Fornecimento regular", value: 2, points: 2, weight: 1 },
      { label: "Fornecimento regular e outras fontes ecoeficientes como energia solar", value: 3, points: 3, weight: 1 },
      { label: "Energia adquirida no mercado livre ou geração fotovoltaica", value: 4, points: 4, weight: 1 },
      { label: "Transição energética com metas, fontes ecoeficientes e geração própria", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "environmental_3.2C",
    category: "environmental",
    subcategory: "3. ENERGIA",
    text: "Qual o percentual do fornecimento de energia proveniente de fontes sustentáveis?",
    inputType: "radio",
    dependsOn: { questionId: "environmental_3.2", value: 3 },
    options: [
      { label: "Menos de 10%", value: 1, points: 1, weight: 1 },
      { label: "10%", value: 2, points: 2, weight: 1 },
      { label: "15%", value: 3, points: 3, weight: 1 },
      { label: "20%", value: 4, points: 4, weight: 1 },
      { label: "Mais de 50%", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "environmental_4.1",
    category: "environmental",
    subcategory: "4. GESTÃO DE RESÍDUOS",
    text: "Como a empresa gerencia os resíduos que produz?",
    inputType: "radio",
    options: [
      { label: "Ainda não conhecemos o volume de resíduos", value: 1, points: 1, weight: 1, recommendation: "Identificar os tipos de resíduos gerados e implementar segregação básica." },
      { label: "Ainda não conhecemos o volume, mas existem práticas de redução", value: 2, points: 2, weight: 1, recommendation: "Iniciar o monitoramento do volume de resíduos gerados." },
      { label: "Conhecemos o volume, possuímos práticas de redução e temos metas", value: 3, points: 3, weight: 1, recommendation: "Ampliar iniciativas de reciclagem e reaproveitamento." },
      { label: "Conhecemos o volume, possuímos metas e garantimos destinação final correta", value: 4, points: 4, weight: 1, recommendation: "Avaliar oportunidades de economia circular." },
      { label: "Desviamos 50%+ do aterro, reutilizamos resíduos como matéria-prima e batemos metas", value: 5, points: 5, weight: 1, recommendation: "Manter e ampliar a estratégia de economia circular." }
    ]
  },
  {
    id: "environmental_4.1A",
    category: "environmental",
    subcategory: "4. GESTÃO DE RESÍDUOS",
    text: "Qual o volume total dos resíduos produzidos no último ano?",
    inputType: "number",
    dependsOn: { questionId: "environmental_4.1", value: 3 },
    options: [
      { label: "Volume em kgs", value: "kg", points: 0, weight: 1 }
    ]
  },
  {
    id: "environmental_4.1B",
    category: "environmental",
    subcategory: "4. GESTÃO DE RESÍDUOS",
    text: "Desvio de aterro (reuso, reciclagem ou compostagem) em %",
    inputType: "number",
    dependsOn: { questionId: "environmental_4.1", value: 3 },
    options: [
      { label: "Percentual de desvio (%)", value: "percentual", points: 0, weight: 1 }
    ]
  },
  {
    id: "environmental_4.2",
    category: "environmental",
    subcategory: "4. GESTÃO DE RESÍDUOS",
    text: "A empresa possui um plano de gerenciamento de resíduos?",
    inputType: "radio",
    options: [
      { label: "Não", value: "nao", points: 0, weight: 1, recommendation: "Elaborar e implementar um Plano de Gerenciamento de Resíduos conforme Lei 12.305/2010." },
      { label: "Sim", value: "sim", points: 5, weight: 1, recommendation: "Manter o plano atualizado com indicadores de desempenho." }
    ]
  },
  {
    id: "environmental_5.1",
    category: "environmental",
    subcategory: "5. PEGADA AMBIENTAL",
    text: "A empresa conhece a pegada ambiental do seu produto ou serviço?",
    inputType: "radio",
    options: [
      { label: "Ainda não conhecemos a pegada ambiental", value: 1, points: 1, weight: 1, recommendation: "Realizar diagnóstico dos impactos ambientais do ciclo de vida do produto." },
      { label: "Ainda não conhecemos, mas existem práticas de redução de impacto", value: 2, points: 2, weight: 1, recommendation: "Estruturar a avaliação da pegada ambiental usando metodologias como análise de ciclo de vida." },
      { label: "Conhecemos a pegada, possuímos práticas de redução e temos metas", value: 3, points: 3, weight: 1, recommendation: "Ampliar a análise para abordagem de ciclo de vida completo." },
      { label: "Conhecemos a pegada e possuímos metas de aumento da ecoeficiência", value: 4, points: 4, weight: 1, recommendation: "Utilizar resultados para orientar decisões estratégicas." },
      { label: "Conhecemos a pegada e investimos em design circular para reduzi-la", value: 5, points: 5, weight: 1, recommendation: "Manter a integração da avaliação nas decisões de desenvolvimento de produtos." }
    ]
  },

  // ==================== SOCIAL SECTION ====================
  {
    id: "social_6.1",
    category: "social",
    subcategory: "6. RELAÇÕES COMUNITÁRIAS",
    text: "Como é a relação da sua empresa com a comunidade local?",
    description: "A relação com a comunidade local é um elemento fundamental da responsabilidade social das empresas.",
    inputType: "radio",
    options: [
      { label: "A empresa não possui relacionamento estruturado com a comunidade local", value: 1, points: 1, weight: 1, recommendation: "Iniciar o diálogo com a comunidade local e identificar grupos de interesse." },
      { label: "Participamos de eventos e fazemos contribuições pontuais", value: 2, points: 2, weight: 1, recommendation: "Estruturar ações de relacionamento comunitário mais consistentes." },
      { label: "Participamos dos eventos e fazemos doações periódicas", value: 3, points: 3, weight: 1, recommendation: "Formalizar programas de relacionamento com a comunidade." },
      { label: "Possuímos metas e projetos estratégicos que envolvem a comunidade local", value: 4, points: 4, weight: 1, recommendation: "Ampliar a mensuração dos resultados e impactos das iniciativas." },
      { label: "A comunidade tem participação ativa através de políticas de contratação e projetos sociais", value: 5, points: 5, weight: 1, recommendation: "Manter e ampliar as estratégias de impacto social." }
    ]
  },
  {
    id: "social_7.1",
    category: "social",
    subcategory: "7. CADEIA DE FORNECIMENTO",
    text: "Como é feita a gestão da sua cadeia de fornecimento?",
    description: "A cadeia de fornecedores é um elemento fundamental para a gestão responsável das empresas.",
    inputType: "radio",
    options: [
      { label: "Não realizamos a gestão da nossa rede de fornecedores", value: 1, points: 1, weight: 1, recommendation: "Iniciar o mapeamento dos riscos socioambientais na cadeia de valor." },
      { label: "Nossos fornecedores passam por processo de solicitação e diligência dos documentos legais", value: 2, points: 2, weight: 1, recommendation: "Estabelecer mecanismos de monitoramento e verificação das práticas dos fornecedores." },
      { label: "Temos procedimentos para selecionar fornecedores por critérios financeiros e socioambientais", value: 3, points: 3, weight: 1, recommendation: "Formalizar diretrizes relacionadas à prevenção de violações de direitos humanos." },
      { label: "Possuímos procedimento de contratação que avalia o impacto socioambiental", value: 4, points: 4, weight: 1, recommendation: "Manter e aprimorar os mecanismos de auditoria socioambiental." },
      { label: "Buscamos trabalhar com fornecedores verificados e atuamos de forma proativa na verificação", value: 5, points: 5, weight: 1, recommendation: "Manter e fortalecer a implementação das normas existentes." }
    ]
  },
  {
    id: "social_8.1",
    category: "social",
    subcategory: "8. DIREITOS HUMANOS",
    text: "De que forma a empresa previne violações aos direitos humanos em suas operações?",
    description: "Os impactos relativos à violação de direitos humanos são o maior risco reputacional para uma empresa.",
    inputType: "radio",
    options: [
      { label: "Não temos qualquer iniciativa para garantir o respeito aos direitos humanos", value: 1, points: 1, weight: 1 },
      { label: "Trabalhamos as questões relativas aos direitos humanos apenas verbalmente", value: 2, points: 2, weight: 1 },
      { label: "Possuímos procedimento de instruir colaboradores e fornecedores sobre trabalho infantil e escravidão", value: 3, points: 3, weight: 1 },
      { label: "Nossos contratos preveem cláusulas preventivas sobre combate ao trabalho infantil e escravidão", value: 4, points: 4, weight: 1 },
      { label: "Colaboramos para movimentos sobre direitos humanos e buscamos inovar para causar letramento", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_9.1",
    category: "social",
    subcategory: "9. INCLUSÃO E DIVERSIDADE",
    text: "Como é realizada a gestão de inclusão e diversidade na sua empresa?",
    description: "Empresas que valorizam a diversidade reconhecem e respeitam as diferenças entre pessoas.",
    inputType: "radio",
    options: [
      { label: "Não conhecemos nossos indicadores de inclusão e diversidade", value: 1, points: 1, weight: 1, recommendation: "Iniciar a reflexão sobre inclusão e diversidade na organização." },
      { label: "Não conhecemos nossos indicadores, mas temos algumas práticas esparsas", value: 2, points: 2, weight: 1, recommendation: "Desenvolver ações iniciais de promoção da diversidade." },
      { label: "Temos práticas estruturadas de inclusão e diversidade", value: 3, points: 3, weight: 1 },
      { label: "Temos práticas estruturadas de inclusão e diversidade e conhecemos nossos indicadores", value: 4, points: 4, weight: 1 },
      { label: "Somos uma empresa referência, com práticas avançadas de inclusão e diversidade", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_10.1",
    category: "social",
    subcategory: "10. PRÁTICAS TRABALHISTAS",
    text: "A empresa possui um manual do funcionário formalizado por escrito?",
    inputType: "radio",
    options: [
      { label: "A empresa não tem um manual do funcionário formalizado por escrito", value: 1, points: 1, weight: 1 },
      { label: "Apenas uma declaração de não discriminação e informações gerais sobre horários", value: 2, points: 2, weight: 1 },
      { label: "Uma política contra o assédio com mecanismos de denúncia e processos disciplinares", value: 3, points: 3, weight: 1 },
      { label: "O manual aborda políticas sobre remuneração, desempenho, capacitação e licenças", value: 4, points: 4, weight: 1 },
      { label: "O manual é construído com participação das partes interessadas e possui declaração de neutralidade", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_10.2",
    category: "social",
    subcategory: "10. PRÁTICAS TRABALHISTAS",
    text: "Qual o percentual de trabalhadores são terceirizados?",
    inputType: "radio",
    options: [
      { label: "Mais de 70% da força de trabalho", value: 1, points: 1, weight: 1 },
      { label: "Mais de 50% da força de trabalho", value: 2, points: 2, weight: 1 },
      { label: "Menos de 50% da força de trabalho", value: 3, points: 3, weight: 1 },
      { label: "Menos de 20% da força de trabalho", value: 4, points: 4, weight: 1 },
      { label: "Não contratamos trabalhadores terceirizados", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_10.3",
    category: "social",
    subcategory: "10. PRÁTICAS TRABALHISTAS",
    text: "Número de trabalhadores temporários no último ano fiscal?",
    inputType: "radio",
    options: [
      { label: "Mais de 70%", value: 1, points: 1, weight: 1 },
      { label: "Mais de 50%", value: 2, points: 2, weight: 1 },
      { label: "Menos de 50%", value: 3, points: 3, weight: 1 },
      { label: "Menos de 20%", value: 4, points: 4, weight: 1 },
      { label: "Não contratamos trabalhadores temporários", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_10.4",
    category: "social",
    subcategory: "10. PRÁTICAS TRABALHISTAS",
    text: "A empresa oferece benefícios para aumentar a renda dos trabalhadores como PLR ou produtividade?",
    inputType: "radio",
    options: [
      { label: "Não", value: "nao", points: 0, weight: 1 },
      { label: "Sim", value: "sim", points: 5, weight: 1 }
    ]
  },
  {
    id: "social_11.1",
    category: "social",
    subcategory: "11. SAÚDE E SEGURANÇA",
    text: "Quais os benefícios que a empresa oferece para complementar os benefícios governamentais?",
    inputType: "radio",
    options: [
      { label: "Cobertura por invalidez ou seguro contra acidentes", value: 1, points: 1, weight: 1 },
      { label: "Seguro de vida", value: 2, points: 2, weight: 1 },
      { label: "Seguro odontológico privado", value: 3, points: 3, weight: 1 },
      { label: "Seguro de saúde privado", value: 4, points: 4, weight: 1 },
      { label: "Seguro de saúde privado complementar com extensão ao cônjuge e filhos", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_11.2",
    category: "social",
    subcategory: "11. SAÚDE E SEGURANÇA",
    text: "São feitas capacitações periódicas sobre o programa de saúde e segurança?",
    inputType: "radio",
    options: [
      { label: "Não há um programa formal de saúde e segurança", value: 1, points: 1, weight: 1 },
      { label: "Fazemos capacitações para todos os trabalhadores com simulação de emergência por ano", value: 2, points: 2, weight: 1 },
      { label: "Registramos e divulgamos dados sobre lesões, acidentes e dias perdidos", value: 3, points: 3, weight: 1 },
      { label: "Possuímos sistema formal de denúncia de questões de segurança", value: 4, points: 4, weight: 1 },
      { label: "Existe comissão ou funcionário responsável pela segurança que responde à direção", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_11.3",
    category: "social",
    subcategory: "11. SAÚDE E SEGURANÇA",
    text: "Qual a política da empresa em relação à manipulação de substâncias ou equipamentos perigosos?",
    inputType: "radio",
    options: [
      { label: "Todos os trabalhadores são informados dos riscos associados", value: 1, points: 1, weight: 1 },
      { label: "A empresa exige uso de EPIs adequados", value: 2, points: 2, weight: 1 },
      { label: "Todos recebem capacitação inicial e continuada sobre armazenamento e manuseio", value: 3, points: 3, weight: 1 },
      { label: "A empresa monitora a saúde dos funcionários e fornece check-ups anuais", value: 4, points: 4, weight: 1 },
      { label: "A empresa realiza monitoramento completo da saúde com todas as instruções necessárias", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_11.4",
    category: "social",
    subcategory: "11. SAÚDE E SEGURANÇA",
    text: "A empresa monitora a incidência de acidentes graves e fatais no ambiente de trabalho?",
    inputType: "radio",
    options: [
      { label: "Não monitoramos", value: 1, points: 1, weight: 1 },
      { label: "Monitoramos e fazemos o acompanhamento preventivo", value: 2, points: 2, weight: 1 },
      { label: "Possuímos um forte sistema de prevenção à acidentes de trabalho, além da CIPA", value: 3, points: 3, weight: 1 },
      { label: "Buscamos monitorar e prevenir os danos, com investimentos em equipamentos mais seguros", value: 4, points: 4, weight: 1 },
      { label: "Temos orgulho de reportar que não houveram acidentes no último ano fiscal", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_12.1",
    category: "social",
    subcategory: "12. DIVERSIDADE",
    text: "Qual o percentual dos seus trabalhadores são mulheres?",
    inputType: "radio",
    options: [
      { label: "Não monitoramos", value: 1, points: 1, weight: 1 },
      { label: "Até 10%", value: 2, points: 2, weight: 1 },
      { label: "Entre 10% e 15%", value: 3, points: 3, weight: 1 },
      { label: "Entre 15% e 25%", value: 4, points: 4, weight: 1 },
      { label: "50% ou mais", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_12.2",
    category: "social",
    subcategory: "12. DIVERSIDADE",
    text: "Qual o percentual dos seus trabalhadores são pessoas negras?",
    inputType: "radio",
    options: [
      { label: "Não monitoramos", value: 1, points: 1, weight: 1 },
      { label: "Até 10%", value: 2, points: 2, weight: 1 },
      { label: "Entre 10% e 15%", value: 3, points: 3, weight: 1 },
      { label: "Entre 15% e 25%", value: 4, points: 4, weight: 1 },
      { label: "50% ou mais", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_12.3",
    category: "social",
    subcategory: "12. DIVERSIDADE",
    text: "Qual o percentual dos seus trabalhadores são LGBTQIAPN+?",
    inputType: "radio",
    options: [
      { label: "Não monitoramos", value: 1, points: 1, weight: 1 },
      { label: "Até 10%", value: 2, points: 2, weight: 1 },
      { label: "Entre 10% e 15%", value: 3, points: 3, weight: 1 },
      { label: "Entre 15% e 25%", value: 4, points: 4, weight: 1 },
      { label: "50% ou mais", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_12.4",
    category: "social",
    subcategory: "12. DIVERSIDADE",
    text: "Qual o percentual dos seus trabalhadores possuem mais de 55 anos?",
    inputType: "radio",
    options: [
      { label: "Não monitoramos", value: 1, points: 1, weight: 1 },
      { label: "Até 10%", value: 2, points: 2, weight: 1 },
      { label: "Entre 10% e 15%", value: 3, points: 3, weight: 1 },
      { label: "Entre 15% e 25%", value: 4, points: 4, weight: 1 },
      { label: "50% ou mais", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "social_12.5",
    category: "social",
    subcategory: "12. DIVERSIDADE",
    text: "Existe uma política de contratação inclusiva?",
    inputType: "radio",
    options: [
      { label: "Não", value: "nao", points: 0, weight: 1 },
      { label: "Sim", value: "sim", points: 5, weight: 1 }
    ]
  },
  {
    id: "social_12.6",
    category: "social",
    subcategory: "12. DIVERSIDADE",
    text: "Qual o percentual de trabalhadores são Pessoas Com Deficiência (PcDs)?",
    inputType: "radio",
    options: [
      { label: "Não monitoramos", value: 1, points: 1, weight: 1 },
      { label: "Até 10%", value: 2, points: 2, weight: 1 },
      { label: "Entre 10% e 15%", value: 3, points: 3, weight: 1 },
      { label: "Entre 15% e 25%", value: 4, points: 4, weight: 1 },
      { label: "50% ou mais", value: 5, points: 5, weight: 1 }
    ]
  },

  // ==================== GOVERNANCE SECTION ====================
  {
    id: "governance_14.1",
    category: "governance",
    subcategory: "14. CULTURA E VALORES",
    text: "A empresa tem definida sua declaração de missão, visão e valores?",
    inputType: "radio",
    options: [
      { label: "A empresa não tem definida sua declaração de missão, visão e valores", value: 1, points: 1, weight: 1 },
      { label: "A empresa possui definição, porém sem metas associadas", value: 2, points: 2, weight: 1 },
      { label: "A declaração possui metas e objetivos relacionados", value: 3, points: 3, weight: 1 },
      { label: "A empresa tem a sustentabilidade incluída em sua missão e estratégia", value: 4, points: 4, weight: 1 },
      { label: "A empresa tem sustentabilidade incluída e faz monitoramento dos indicadores ESG", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_15.1",
    category: "governance",
    subcategory: "15. GESTÃO DA SATISFAÇÃO DO CLIENTE",
    text: "A empresa realiza pesquisas para saber a opinião de stakeholders?",
    inputType: "radio",
    options: [
      { label: "A empresa não realiza pesquisas nem possui canal de atendimento", value: 1, points: 1, weight: 1 },
      { label: "A empresa não realiza pesquisas e possui canal de atendimento", value: 2, points: 2, weight: 1 },
      { label: "A empresa realiza pesquisas em diversos canais", value: 3, points: 3, weight: 1 },
      { label: "A empresa realiza pesquisas com todas as partes interessadas e possui canal de denúncias", value: 4, points: 4, weight: 1 },
      { label: "A empresa possui stakeholders em esferas decisórias como conselho de diretores", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_15.2",
    category: "governance",
    subcategory: "15. GESTÃO DA SATISFAÇÃO DO CLIENTE",
    text: "A empresa monitora o grau de satisfação dos seus clientes?",
    inputType: "radio",
    options: [
      { label: "Não", value: 1, points: 1, weight: 1 },
      { label: "Sim", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_15.3",
    category: "governance",
    subcategory: "15. GESTÃO DA SATISFAÇÃO DO CLIENTE",
    text: "A empresa possui procedimentos para tratamento de reclamações em diferentes plataformas?",
    inputType: "radio",
    options: [
      { label: "Não", value: 1, points: 1, weight: 1 },
      { label: "Sim", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_16.1",
    category: "governance",
    subcategory: "16. QUALIDADE E SEGURANÇA DO PRODUTO",
    text: "São oferecidas garantias extraordinárias além das estabelecidas em lei?",
    inputType: "radio",
    options: [
      { label: "Não", value: 1, points: 1, weight: 1 },
      { label: "Sim", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_17.1",
    category: "governance",
    subcategory: "17. ROTULAGEM E PRÁTICAS DE VENDA",
    text: "A empresa possui em suas embalagens alguma certificação ou atributo identificado?",
    inputType: "radio",
    options: [
      { label: "Não", value: 1, points: 1, weight: 1 },
      { label: "Sim", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_18.1",
    category: "governance",
    subcategory: "18. GERENCIAMENTO DE RISCOS",
    text: "A empresa realizou o estudo da matriz de materialidade para entender os riscos ESG?",
    inputType: "radio",
    options: [
      { label: "A empresa não realizou ainda o estudo da matriz", value: 1, points: 1, weight: 1 },
      { label: "Conhecemos nossos riscos, mas em nível gerencial, sem divulgação", value: 2, points: 2, weight: 1 },
      { label: "Realizamos a matriz de materialidade de forma interna, consultando a alta direção", value: 3, points: 3, weight: 1 },
      { label: "Realizamos a matriz de dupla materialidade consultando direção e stakeholders", value: 4, points: 4, weight: 1 },
      { label: "A matriz está publicada em nosso último relatório de sustentabilidade", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_18.2",
    category: "governance",
    subcategory: "18. GERENCIAMENTO DE RISCOS",
    text: "A empresa adota procedimentos para a gestão dos seus riscos ESG?",
    inputType: "radio",
    options: [
      { label: "Não", value: 1, points: 1, weight: 1 },
      { label: "Sim", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_19.1",
    category: "governance",
    subcategory: "19. GESTÃO DE REQUISITOS LEGAIS",
    text: "A empresa possui todas as autorizações necessárias para a sua atuação?",
    inputType: "radio",
    options: [
      { label: "Não", value: 1, points: 1, weight: 1 },
      { label: "Sim", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_19.2",
    category: "governance",
    subcategory: "19. GESTÃO DE REQUISITOS LEGAIS",
    text: "A empresa atualiza periodicamente a sua análise de requisitos legais?",
    inputType: "radio",
    options: [
      { label: "Não", value: 1, points: 1, weight: 1 },
      { label: "Sim", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_20.1",
    category: "governance",
    subcategory: "20. ÉTICA E TRANSPARÊNCIA",
    text: "A empresa possui uma cultura de conduta clara sobre práticas de relacionamento ético?",
    inputType: "radio",
    options: [
      { label: "A empresa não define as práticas de relacionamento", value: 1, points: 1, weight: 1 },
      { label: "Os funcionários não conhecem bem a formalização das condutas", value: 2, points: 2, weight: 1 },
      { label: "Sim, mas ainda não estão definidas em normas internas", value: 3, points: 3, weight: 1 },
      { label: "Sim, as condutas estão definidas em normas e práticas éticas divulgadas", value: 4, points: 4, weight: 1 },
      { label: "As normas estão definidas, divulgadas e os funcionários são treinados anualmente", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_20.2",
    category: "governance",
    subcategory: "20. ÉTICA E TRANSPARÊNCIA",
    text: "O relatório financeiro da sua empresa atende:",
    inputType: "radio",
    options: [
      { label: "Não possuímos relatório financeiro divulgado", value: 1, points: 1, weight: 1 },
      { label: "Possuímos relatório financeiro o qual divulgamos internamente", value: 2, points: 2, weight: 1 },
      { label: "Nosso relatório atende às normas de contabilidade locais", value: 3, points: 3, weight: 1 },
      { label: "Nosso relatório atende às normas de contabilidade internacionais", value: 4, points: 4, weight: 1 },
      { label: "Nosso relatório financeiro é auditado por entidade externa", value: 5, points: 5, weight: 1 }
    ]
  },
  {
    id: "governance_20.3",
    category: "governance",
    subcategory: "20. ÉTICA E TRANSPARÊNCIA",
    text: "Relatórios de Sustentabilidade",
    inputType: "radio",
    options: [
      { label: "Não possuímos relatório de sustentabilidade divulgado", value: 1, points: 1, weight: 1 },
      { label: "Possuímos relatório de sustentabilidade divulgado internamente", value: 2, points: 2, weight: 1 },
      { label: "Divulgamos nossos indicadores de sustentabilidade em nosso site", value: 3, points: 3, weight: 1 },
      { label: "Nosso relatório é realizado segundo as normas GRI", value: 4, points: 4, weight: 1 },
      { label: "Nosso relatório pelas normas GRI está no segundo ano ou mais de reporte", value: 5, points: 5, weight: 1 }
    ]
  }
];
