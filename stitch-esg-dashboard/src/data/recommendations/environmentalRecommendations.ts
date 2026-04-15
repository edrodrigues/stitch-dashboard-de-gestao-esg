import type { LucideIcon } from 'lucide-react';
import { 
  Wind, 
  Droplets, 
  Zap, 
  Recycle, 
  Leaf, 
  TreePine,
  Factory,
  FileCheck
} from 'lucide-react';

export interface ActionStep {
  order: number;
  title: string;
  description: string;
}

export interface EnvironmentalRecommendation {
  id: string;
  questionId: string;
  category: string;
  title: string;
  description: string;
  priority: 'critica' | 'alta' | 'media' | 'baixa';
  effort: 'baixo' | 'medio' | 'alto';
  estimatedTimeframe: string;
  triggersAt: number; // resposta <= este valor ativa
  icon: LucideIcon;
  xpReward: number;
  steps: ActionStep[];
  kpis: string[];
  relatedQuestions: string[];
  regulations?: string[];
  prerequisites?: string[];
}

export const environmentalRecommendations: EnvironmentalRecommendation[] = [
  // EMISSÕES DE CARBONO
  {
    id: 'inventario-gee',
    questionId: 'environmental_2.1',
    category: 'emissoesCarbono',
    title: 'Implementar Inventário de Gases de Efeito Estufa (GEE)',
    description: 'Realizar o inventário completo das emissões de GEE seguindo a metodologia GHG Protocol, identificando fontes de emissão dos Escopos 1, 2 e 3.',
    priority: 'critica',
    effort: 'alto',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: Wind,
    xpReward: 550,
    steps: [
      { order: 1, title: 'Contratar consultoria especializada', description: 'Buscar empresa certificada em inventário de GEE e GHG Protocol' },
      { order: 2, title: 'Definir escopos de emissão', description: 'Mapear todas as fontes de emissão diretas (Escopo 1), indiretas de energia (Escopo 2) e outras indiretas (Escopo 3)' },
      { order: 3, title: 'Coletar dados de consumo', description: 'Levantar dados de energia elétrica, combustíveis, transporte, processos industriais' },
      { order: 4, title: 'Calcular emissões', description: 'Aplicar fatores de emissão e calcular total em Ton CO2e por escopo' },
      { order: 5, title: 'Documentar e validar', description: 'Elaborar relatório de inventário com terceira parte verificadora' },
    ],
    kpis: ['Ton CO2e Escopo 1', 'Ton CO2e Escopo 2', 'Ton CO2e Escopo 3', 'Intensidade de carbono'],
    relatedQuestions: ['environmental_2.1A', 'environmental_2.1B'],
    regulations: ['GHG Protocol', 'ISO 14064'],
  },
  {
    id: 'metas-reducao-carbono',
    questionId: 'environmental_2.1',
    category: 'emissoesCarbono',
    title: 'Estabelecer Metas de Redução de Emissões',
    description: 'Definir metas science-based de redução de emissões alinhadas ao Acordo de Paris (limitar aquecimento a 1.5°C).',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 3,
    icon: Wind,
    xpReward: 450,
    steps: [
      { order: 1, title: 'Definir baseline', description: 'Usar ano-base do inventário mais recente' },
      { order: 2, title: 'Calcular meta science-based', description: 'Aplicar metodologia SBTi para definir redução necessária' },
      { order: 3, title: 'Compromisso público', description: 'Assinar carta de compromisso SBTi e divulgar metas' },
      { order: 4, title: 'Plano de ação', description: 'Definir iniciativas para alcançar as metas (eficiência energética, energia renovável, etc.)' },
    ],
    kpis: ['% redução prevista até 2030', '% redução prevista até 2050', 'Progresso anual'],
    relatedQuestions: ['environmental_2.1A', 'environmental_2.1B'],
    regulations: ['SBTi', 'Acordo de Paris'],
    prerequisites: ['inventario-gee'],
  },
  {
    id: 'compensacao-carbono',
    questionId: 'environmental_2.1B',
    category: 'emissoesCarbono',
    title: 'Programa de Compensação de Carbono',
    description: 'Desenvolver estratégia de neutralidade de carbono através de compensação via projetos de créditos de carbono ou soluções baseadas na natureza.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 1,
    icon: Leaf,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Calcular emissões residuais', description: 'Determinar quantidade de emissões que não podem ser eliminadas' },
      { order: 2, title: 'Selecionar projetos', description: 'Escolher projetos de compensação certificados (VCS, Gold Standard, etc.)' },
      { order: 3, title: 'Aquisição de créditos', description: 'Comprar créditos de carbono verificados' },
      { order: 4, title: 'Certificação de neutralidade', description: 'Obter selo de neutralidade de carbono (ex: Climate Neutral)' },
    ],
    kpis: ['Ton CO2e compensados', 'Investimento em compensação', 'Projetos apoiados'],
    relatedQuestions: ['environmental_2.1', 'environmental_2.1A'],
    regulations: ['VCS', 'Gold Standard'],
    prerequisites: ['inventario-gee'],
  },

  // ÁGUA E EFLUENTES
  {
    id: 'monitoramento-agua',
    questionId: 'environmental_3.1',
    category: 'aguaEfluentes',
    title: 'Implementar Monitoramento de Consumo de Água',
    description: 'Instalar sistema de medição de consumo de água por setor/unidade e criar dashboard de acompanhamento.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: Droplets,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Mapear pontos de consumo', description: 'Identificar todos os pontos de uso de água na operação' },
      { order: 2, title: 'Instalar hidrômetros', description: 'Colocar medidores em pontos críticos de consumo' },
      { order: 3, title: 'Sistema de coleta de dados', description: 'Implementar leitura periódica (mensal/semanal) dos medidores' },
      { order: 4, title: 'Dashboard de monitoramento', description: 'Criar visualização de consumo por área e tendências' },
    ],
    kpis: ['m³ consumidos/mês', 'Intensidade de água (m³/unidade produzida)', '% de hidrômetros instalados'],
    relatedQuestions: ['environmental_3.1A'],
    regulations: ['Resolução CONAMA 430/2011'],
  },
  {
    id: 'meta-reducao-agua',
    questionId: 'environmental_3.1',
    category: 'aguaEfluentes',
    title: 'Estabelecer Metas de Redução de Consumo de Água',
    description: 'Definir e implementar metas de redução de consumo de água com ações de eficiência hídrica.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 3,
    icon: Droplets,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Definir baseline', description: 'Calcular média histórica de consumo' },
      { order: 2, title: 'Estabelecer meta', description: 'Definir redução percentual realista (ex: 10-20% em 2 anos)' },
      { order: 3, title: 'Implementar ações', description: 'Instalar arejadores, sistemas de reaproveitamento, detecção de vazamentos' },
      { order: 4, title: 'Monitorar progresso', description: 'Acompanhar consumo mensal vs meta' },
    ],
    kpis: ['% de redução alcançada', 'Economia em m³/ano', 'ROI das ações'],
    relatedQuestions: ['environmental_3.1A', 'environmental_3.1B'],
    regulations: ['ISO 14046'],
    prerequisites: ['monitoramento-agua'],
  },
  {
    id: 'estacao-tratamento-efluentes',
    questionId: 'environmental_3.1',
    category: 'aguaEfluentes',
    title: 'Implementar Estação de Tratamento de Efluentes',
    description: 'Construir ou melhorar ETE para tratamento adequado dos efluentes antes do descarte ou reutilização.',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 1,
    icon: Droplets,
    xpReward: 500,
    steps: [
      { order: 1, title: 'Caracterização dos efluentes', description: 'Analisar qualidade e volume dos efluentes gerados' },
      { order: 2, title: 'Projeto da ETE', description: 'Dimensionar e projetar estação adequada' },
      { order: 3, title: 'Licenciamento', description: 'Obter licenças ambientais necessárias' },
      { order: 4, title: 'Construção', description: 'Construir ou adaptar instalações' },
      { order: 5, title: 'Operação', description: 'Treinar equipe e iniciar operação monitorada' },
    ],
    kpis: ['% conformidade com legislação', 'Qualidade do efluente tratado', '% de reutilização'],
    relatedQuestions: [],
    regulations: ['CONAMA 430/2011', 'Licença de Operação'],
  },

  // ENERGIA
  {
    id: 'monitoramento-energia',
    questionId: 'environmental_3.2',
    category: 'energia',
    title: 'Implementar Monitoramento de Consumo de Energia',
    description: 'Instalar medidores inteligentes e criar sistema de gestão energética para identificar oportunidades de eficiência.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: Zap,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Mapear consumo', description: 'Identificar principais consumidores de energia' },
      { order: 2, title: 'Instalar medidores', description: 'Colocar medidores em setores críticos' },
      { order: 3, title: 'Sistema de coleta', description: 'Implementar leitura automática ou manual periódica' },
      { order: 4, title: 'Análise de perfil', description: 'Identificar horários de pico e oportunidades' },
    ],
    kpis: ['kWh consumidos/mês', 'Demanda de potência (kW)', 'Fator de carga'],
    relatedQuestions: ['environmental_3.2A'],
    regulations: ['ANEEL', 'ISO 50001'],
  },
  {
    id: 'fontes-renovaveis',
    questionId: 'environmental_3.2B',
    category: 'energia',
    title: 'Migrar para Fontes de Energia Renovável',
    description: 'Transicionar matriz energética para fontes renováveis através de geração própria ou compra de energia verde.',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 2,
    icon: Zap,
    xpReward: 600,
    steps: [
      { order: 1, title: 'Estudo de viabilidade', description: 'Analisar opções: solar, eólica, biomassa, mercado livre' },
      { order: 2, title: 'Dimensionamento', description: 'Calcular necessidade de geração/compra' },
      { order: 3, title: 'Implementação', description: 'Instalar sistema fotovoltaico ou contratar energia no mercado livre' },
      { order: 4, title: 'Monitoramento', description: 'Acompanhar % de renovável na matriz' },
    ],
    kpis: ['% energia renovável', 'Ton CO2e evitado/ano', 'Economia na conta de luz'],
    relatedQuestions: ['environmental_3.2C'],
    regulations: ['ANEEL', 'Resolução 482/2012'],
    prerequisites: ['monitoramento-energia'],
  },
  {
    id: 'eficiencia-energetica',
    questionId: 'environmental_3.2C',
    category: 'energia',
    title: 'Programa de Eficiência Energética',
    description: 'Implementar ações de melhoria da eficiência energética em equipamentos e processos.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: Zap,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Auditoria energética', description: 'Identificar desperdícios e oportunidades' },
      { order: 2, title: 'Substituição de equipamentos', description: 'Trocar por equipamentos mais eficientes (LED, inversores, etc.)' },
      { order: 3, title: 'Automatização', description: 'Instalar sensores e controles de iluminação/climatização' },
      { order: 4, title: 'Treinamento', description: 'Conscientizar colaboradores sobre uso consciente' },
    ],
    kpis: ['% redução no consumo', 'Economia em R$/ano', 'Payback das ações'],
    relatedQuestions: ['environmental_3.2', 'environmental_3.2A'],
    regulations: ['PROCEL', 'ISO 50001'],
  },

  // GESTÃO DE RESÍDUOS
  {
    id: 'plano-gerenciamento-residuos',
    questionId: 'environmental_4.2',
    category: 'residuos',
    title: 'Criar Plano de Gerenciamento de Resíduos',
    description: 'Elaborar e implementar PGR conforme Lei 12.305/2010 (PNRS) com foco na redução, reutilização e reciclagem.',
    priority: 'critica',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 0,
    icon: Recycle,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Diagnóstico', description: 'Mapear tipos e volumes de resíduos gerados' },
      { order: 2, title: 'Elaboração do PGR', description: 'Definir hierarquia: redução > reutilização > reciclagem > disposição' },
      { order: 3, title: 'Logística reversa', description: 'Implementar coleta seletiva e destinação adequada' },
      { order: 4, title: 'Treinamento', description: 'Capacitar colaboradores na segregação correta' },
    ],
    kpis: ['% de resíduos reciclados', '% de redução de aterro', 'Economia com resíduos'],
    relatedQuestions: ['environmental_4.1', 'environmental_4.1A', 'environmental_4.1B'],
    regulations: ['Lei 12.305/2010 (PNRS)', 'CONAMA 313/2002'],
  },
  {
    id: 'economia-circular',
    questionId: 'environmental_4.1',
    category: 'residuos',
    title: 'Implementar Economia Circular',
    description: 'Desenhar processos produtivos baseados em economia circular com reuso de resíduos como matéria-prima.',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 3,
    icon: Recycle,
    xpReward: 500,
    steps: [
      { order: 1, title: 'Análise de fluxos', description: 'Mapear fluxos de materiais e identificar sinergias' },
      { order: 2, title: 'Parecerias', description: 'Buscar empresas que possam usar seus resíduos como insumo' },
      { order: 3, title: 'Projetos piloto', description: 'Implementar 1-2 projetos de simbiose industrial' },
      { order: 4, title: 'Escalação', description: 'Expandir projetos bem-sucedidos' },
    ],
    kpis: ['% de resíduos reutilizados', 'Receita com resíduos', 'Redução de matéria-prima virgem'],
    relatedQuestions: ['environmental_4.1A', 'environmental_4.1B'],
    regulations: ['ISO 59020'],
    prerequisites: ['plano-gerenciamento-residuos'],
  },
  {
    id: 'logistica-reversa',
    questionId: 'environmental_4.1',
    category: 'residuos',
    title: 'Implementar Logística Reversa',
    description: 'Estabelecer sistema de logística reversa para produtos e embalagens pós-consumo conforme exigências setoriais.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: Recycle,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Mapear obrigações', description: 'Identificar produtos sujeitos à logística reversa' },
      { order: 2, title: 'Escolher modelo', description: 'Definir sistema próprio ou adesão a sistema coletivo' },
      { order: 3, title: 'Implementar coleta', description: 'Criar pontos de coleta e parcerias com reciclagem' },
      { order: 4, title: 'Relatórios', description: 'Cumprir obrigações de relatórios aos órgãos' },
    ],
    kpis: ['% de produtos coletados', 'Meta de reciclagem atingida', 'Custo por unidade recuperada'],
    relatedQuestions: [],
    regulations: ['Decreto 7.404/2010', 'Resoluções CONAMA específicas por setor'],
  },

  // PEGADA AMBIENTAL
  {
    id: 'avaliacao-pegada-ambiental',
    questionId: 'environmental_5.1',
    category: 'pegadaAmbiental',
    title: 'Realizar Avaliação da Pegada Ambiental',
    description: 'Conduzir Análise de Ciclo de Vida (ACV) dos produtos/serviços para identificar hotspots ambientais.',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 2,
    icon: Leaf,
    xpReward: 450,
    steps: [
      { order: 1, title: 'Definir escopo', description: 'Selecionar produtos prioritários para ACV' },
      { order: 2, title: 'Coleta de dados', description: 'Levantar dados de entrada/saída do ciclo de vida' },
      { order: 3, title: 'Modelagem', description: 'Utilizar software de ACV para calcular impactos' },
      { order: 4, title: 'Interpretação', description: 'Identificar hotspots e oportunidades de melhoria' },
    ],
    kpis: ['Número de produtos avaliados', 'Hotspots identificados', 'Ações de ecoeficiência implementadas'],
    relatedQuestions: [],
    regulations: ['ISO 14040', 'ISO 14044'],
  },
  {
    id: 'design-circular',
    questionId: 'environmental_5.1',
    category: 'pegadaAmbiental',
    title: 'Implementar Design Circular',
    description: 'Redesenhar produtos considerando circularidade: durabilidade, reparabilidade, reciclabilidade.',
    priority: 'media',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 3,
    icon: Factory,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Análise de produtos', description: 'Avaliar potencial de circularidade dos produtos atuais' },
      { order: 2, title: 'Diretrizes de design', description: 'Criar guidelines de eco-design e design circular' },
      { order: 3, title: 'Prototipagem', description: 'Desenvolver protótipos com princípios circulares' },
      { order: 4, title: 'Validação', description: 'Testar novos produtos no mercado' },
    ],
    kpis: ['% de materiais reciclados no produto', 'Facilidade de desmontagem', 'Vida útil estendida'],
    relatedQuestions: [],
    regulations: ['ISO 59020'],
    prerequisites: ['avaliacao-pegada-ambiental'],
  },

  // OUTRAS RECOMENDAÇÕES
  {
    id: 'certificacao-iso14001',
    questionId: 'environmental_2.1',
    category: 'sistema-gestao',
    title: 'Certificação ISO 14001',
    description: 'Implementar Sistema de Gestão Ambiental certificado ISO 14001.',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '12-18 meses',
    triggersAt: 3,
    icon: FileCheck,
    xpReward: 600,
    steps: [
      { order: 1, title: 'Gap analysis', description: 'Avaliar conformidade vs requisitos da norma' },
      { order: 2, title: 'Documentação', description: 'Elaborar manual, procedimentos e instruções' },
      { order: 3, title: 'Implementação', description: 'Colocar em prática todos os elementos do SGA' },
      { order: 4, title: 'Auditoria interna', description: 'Realizar auditoria interna de conformidade' },
      { order: 5, title: 'Certificação', description: 'Auditoria de certificação por organismo acreditado' },
    ],
    kpis: ['Não conformidades fechadas', 'Conformidade com requisitos', 'Renovação da certificação'],
    relatedQuestions: ['environmental_2.1', 'environmental_3.1', 'environmental_4.1'],
    regulations: ['ISO 14001:2015'],
    prerequisites: ['inventario-gee', 'monitoramento-agua', 'monitoramento-energia'],
  },
  {
    id: 'selo-verde',
    questionId: 'environmental_5.1',
    category: 'certificacao',
    title: 'Obter Selo Verde/Certificação Ambiental',
    description: 'Buscar reconhecimento externo através de selos verdes ou certificações ambientais do setor.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 4,
    icon: TreePine,
    xpReward: 500,
    steps: [
      { order: 1, title: 'Pesquisa', description: 'Identificar selos relevantes para o setor' },
      { order: 2, title: 'Adequação', description: 'Ajustar processos para atender critérios' },
      { order: 3, title: 'Documentação', description: 'Preparar requerimento e evidências' },
      { order: 4, title: 'Auditoria', description: 'Passar por avaliação do selo' },
    ],
    kpis: ['Selo obtido', 'Validade da certificação', 'Reconhecimento no mercado'],
    relatedQuestions: [],
    regulations: ['Critérios específicos de cada selo'],
  },
];

// Função para obter recomendações baseadas na resposta
export const getEnvironmentalRecommendations = (
  answers: Record<string, number | string | (string | number)[]>,
  maxRecommendations: number = 10
): EnvironmentalRecommendation[] => {
  const recommendations: EnvironmentalRecommendation[] = [];

  for (const rec of environmentalRecommendations) {
    const answer = answers[rec.questionId];
    
    if (answer !== undefined) {
      const numericValue = typeof answer === 'string' 
        ? (answer === 'Sim' ? 5 : answer === 'Não' ? 0 : parseInt(answer) || 0)
        : answer;

      if (typeof numericValue === 'number' && numericValue <= rec.triggersAt) {
        // Verificar se já não existe recomendação similar
        if (!recommendations.find(r => r.id === rec.id)) {
          recommendations.push(rec);
        }
      }
    }
  }

  // Ordenar por prioridade e retornar os top N
  const priorityOrder = { critica: 0, alta: 1, media: 2, baixa: 3 };
  return recommendations
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, maxRecommendations);
};

// Função para filtrar recomendações por categoria
export const getRecommendationsByCategory = (
  category: string,
  answers: Record<string, number | string | (string | number)[]>
): EnvironmentalRecommendation[] => {
  const allRecs = getEnvironmentalRecommendations(answers, 100);
  return allRecs.filter(rec => rec.category === category);
};
