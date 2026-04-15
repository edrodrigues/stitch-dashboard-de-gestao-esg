import type { LucideIcon } from 'lucide-react';
import { 
  Heart, 
  Users, 
  Award, 
  Tag, 
  ShieldAlert, 
  Scale,
  FileText,
  Eye,
  BookOpen,
  CheckCircle
} from 'lucide-react';

export interface ActionStep {
  order: number;
  title: string;
  description: string;
}

export interface GovernanceRecommendation {
  id: string;
  questionId: string;
  category: string;
  title: string;
  description: string;
  priority: 'critica' | 'alta' | 'media' | 'baixa';
  effort: 'baixo' | 'medio' | 'alto';
  estimatedTimeframe: string;
  triggersAt: number;
  icon: LucideIcon;
  xpReward: number;
  steps: ActionStep[];
  kpis: string[];
  relatedQuestions: string[];
  regulations?: string[];
  prerequisites?: string[];
}

export const governanceRecommendations: GovernanceRecommendation[] = [
  // CULTURA E VALORES
  {
    id: 'missao-visao-valores',
    questionId: 'governance_14.1',
    category: 'culturaValores',
    title: 'Definir Missão, Visão e Valores com Sustentabilidade',
    description: 'Criar ou atualizar declaração de missão, visão e valores incorporando compromisso com sustentabilidade e ESG.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: Heart,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Workshop estratégico', description: 'Envolver liderança na definição dos propósitos' },
      { order: 2, title: 'Inclusão ESG', description: 'Garantir que sustentabilidade esteja no centro da missão' },
      { order: 3, title: 'Validação', description: 'Coletar feedback de colaboradores' },
      { order: 4, title: 'Comunicação', description: 'Divulgar amplamente e integrar em processos' },
    ],
    kpis: ['% colaboradores que conhecem MVV', 'Alinhamento com práticas ESG', 'Engajamento com propósito'],
    relatedQuestions: [],
    regulations: [],
  },
  {
    id: 'codigo-conduta',
    questionId: 'governance_14.1',
    category: 'culturaValores',
    title: 'Código de Conduta e Ética',
    description: 'Elaborar código de conduta que oriente comportamentos éticos em todas as relações da empresa.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 3,
    icon: BookOpen,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Elaboração', description: 'Redigir código com princípios éticos claros' },
      { order: 2, title: 'Aprovação', description: 'Aprovar em comitê de direção' },
      { order: 3, title: 'Treinamento', description: 'Capacitar todos os colaboradores' },
      { order: 4, title: 'Compromisso', description: 'Coletar assinatura de adesão' },
    ],
    kpis: ['% colaboradores treinados', 'Assinaturas coletadas', 'Denúncias éticas'],
    relatedQuestions: ['governance_20.1'],
    regulations: ['Lei 12.846/2013 (Anticorrupção)'],
  },

  // SATISFAÇÃO DO CLIENTE
  {
    id: 'pesquisa-satisfacao',
    questionId: 'governance_15.1',
    category: 'satisfacaoCliente',
    title: 'Sistema de Pesquisa de Satisfação dos Stakeholders',
    description: 'Implementar programa contínuo de pesquisa de satisfação com clientes, colaboradores e fornecedores.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: Users,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Mapeamento', description: 'Identificar todos os stakeholders' },
      { order: 2, title: 'Instrumentos', description: 'Criar questionários de NPS/CSAT' },
      { order: 3, title: 'Coleta', description: 'Realizar pesquisas periódicas' },
      { order: 4, title: 'Ações', description: 'Implementar melhorias baseadas nos resultados' },
    ],
    kpis: ['NPS (Net Promoter Score)', 'CSAT', 'Taxa de resposta', 'Ações implementadas'],
    relatedQuestions: ['governance_15.2', 'governance_15.3'],
    regulations: [],
  },
  {
    id: 'canal-atendimento',
    questionId: 'governance_15.3',
    category: 'satisfacaoCliente',
    title: 'Canal de Atendimento e Ouvidoria',
    description: 'Criar canal eficiente para receber, tratar e resolver reclamações e sugestões em múltiplas plataformas.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 1,
    icon: Users,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Canais', description: 'Disponibilizar telefone, email, chat, WhatsApp' },
      { order: 2, title: 'Processos', description: 'Definir SLAs e fluxo de atendimento' },
      { order: 3, title: 'Equipe', description: 'Treinar equipe de atendimento' },
      { order: 4, title: 'Ouvidoria', description: 'Criar canal independente de escalonamento' },
    ],
    kpis: ['Tempo médio de resposta', 'Taxa de resolução', 'Satisfação com atendimento'],
    relatedQuestions: [],
    regulations: ['CDC', 'Lei 13.460/2017'],
  },

  // QUALIDADE DO PRODUTO
  {
    id: 'garantia-qualidade',
    questionId: 'governance_16.1',
    category: 'qualidadeProduto',
    title: 'Programa de Garantia Estendida',
    description: 'Oferecer garantia além do mínimo legal, demonstrando confiança na qualidade do produto.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 1,
    icon: Award,
    xpReward: 250,
    steps: [
      { order: 1, title: 'Análise', description: 'Avaliar custo-benefício de garantia estendida' },
      { order: 2, title: 'Modelo', description: 'Definir cobertura e prazos' },
      { order: 3, title: 'Implementação', description: 'Criar processo de acionamento' },
      { order: 4, title: 'Comunicação', description: 'Divulgar aos clientes' },
    ],
    kpis: ['Taxa de acionamento', 'Custo médio', 'Satisfação com garantia'],
    relatedQuestions: [],
    regulations: ['CDC'],
  },
  {
    id: 'certificacao-qualidade',
    questionId: 'governance_16.1',
    category: 'qualidadeProduto',
    title: 'Certificação ISO 9001',
    description: 'Implementar sistema de gestão da qualidade certificado internacionalmente.',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 4,
    icon: Award,
    xpReward: 500,
    steps: [
      { order: 1, title: 'Gap analysis', description: 'Avaliar conformidade vs ISO 9001' },
      { order: 2, title: 'Documentação', description: 'Elaborar manual da qualidade e procedimentos' },
      { order: 3, title: 'Implementação', description: 'Colocar em prática o SGQ' },
      { order: 4, title: 'Auditoria', description: 'Auditoria de certificação' },
    ],
    kpis: ['Conformidade com requisitos', 'Reclamações de clientes', 'Não conformidades'],
    relatedQuestions: [],
    regulations: ['ISO 9001:2015'],
  },

  // ROTULAGEM
  {
    id: 'selo-sustentabilidade',
    questionId: 'governance_17.1',
    category: 'rotulagem',
    title: 'Certificação e Selos de Sustentabilidade',
    description: 'Obter selos verdes ou certificações que comprovem atributos sustentáveis do produto.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 1,
    icon: Tag,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Pesquisa', description: 'Identificar selos relevantes (FSC, Fair Trade, Selo Verde, etc.)' },
      { order: 2, title: 'Adequação', description: 'Ajustar produto/processos para atender critérios' },
      { order: 3, title: 'Certificação', description: 'Passar por auditoria do selo' },
      { order: 4, title: 'Comunicação', description: 'Destacar selo na embalagem e marketing' },
    ],
    kpis: ['Selos obtidos', 'Reconhecimento no mercado', 'Prêmio de diferenciação'],
    relatedQuestions: [],
    regulations: ['Critérios de cada selo'],
  },
  {
    id: 'rotulagem-transparente',
    questionId: 'governance_17.1',
    category: 'rotulagem',
    title: 'Rotulagem Transparente e Completa',
    description: 'Garantir que embalagens contenham informações claras sobre origem, composição e impacto ambiental.',
    priority: 'media',
    effort: 'baixo',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 1,
    icon: Tag,
    xpReward: 250,
    steps: [
      { order: 1, title: 'Avaliação', description: 'Verificar se todas as informações obrigatórias estão presentes' },
      { order: 2, title: 'Melhorias', description: 'Adicionar informações de sustentabilidade (origem, reciclabilidade)' },
      { order: 3, title: 'Validação', description: 'Aprovar novo design de rotulagem' },
      { order: 4, title: 'Implementação', description: 'Atualizar embalagens' },
    ],
    kpis: ['% de embalagens atualizadas', 'Clareza das informações', 'Reclamações sobre rotulagem'],
    relatedQuestions: [],
    regulations: ['INMETRO', 'Anvisa', 'Lei 10.471/2002'],
  },

  // GESTÃO DE RISCOS
  {
    id: 'matriz-materialidade',
    questionId: 'governance_18.1',
    category: 'gestaoRiscos',
    title: 'Estudo da Matriz de Materialidade ESG',
    description: 'Realizar estudo de materialidade de dupla via identificando temas ESG relevantes para negócio e stakeholders.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: ShieldAlert,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Mapeamento', description: 'Listar todos os temas ESG potenciais' },
      { order: 2, title: 'Stakeholders', description: 'Consultar investidores, clientes, colaboradores sobre prioridades' },
      { order: 3, title: 'Avaliação', description: 'Avaliar impacto no negócio e importância para stakeholders' },
      { order: 4, title: 'Priorização', description: 'Construir matriz e definir temas materiais' },
    ],
    kpis: ['Temas materiais definidos', 'Stakeholders consultados', 'Materialidade publicada'],
    relatedQuestions: ['governance_18.2'],
    regulations: ['GRI Standards', 'SASB'],
  },
  {
    id: 'gestao-riscos-esg',
    questionId: 'governance_18.2',
    category: 'gestaoRiscos',
    title: 'Sistema de Gestão de Riscos ESG',
    description: 'Implementar processo formal de identificação, avaliação e mitigação de riscos ESG.',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 1,
    icon: ShieldAlert,
    xpReward: 450,
    steps: [
      { order: 1, title: 'Inventário', description: 'Listar riscos ESG baseado na materialidade' },
      { order: 2, title: 'Avaliação', description: 'Avaliar probabilidade e impacto de cada risco' },
      { order: 3, title: 'Mitigação', description: 'Definir planos de ação para riscos críticos' },
      { order: 4, title: 'Monitoramento', description: 'Revisar riscos periodicamente' },
    ],
    kpis: ['Riscos mapeados', 'Planos de mitigação', 'Incidentes evitados'],
    relatedQuestions: [],
    regulations: ['COSO', 'ISO 31000'],
    prerequisites: ['matriz-materialidade'],
  },

  // REQUISITOS LEGAIS
  {
    id: 'licenciamento-ambiental',
    questionId: 'governance_19.1',
    category: 'requisitosLegais',
    title: 'Licenciamento Ambiental Completo',
    description: 'Garantir que a empresa possua todas as licenças ambientais necessárias (LP, LI, LO) atualizadas.',
    priority: 'critica',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 1,
    icon: CheckCircle,
    xpReward: 500,
    steps: [
      { order: 1, title: 'Diagnóstico', description: 'Mapear todas as licenças necessárias' },
      { order: 2, title: 'Regularização', description: 'Iniciar processo de licenciamento onde faltante' },
      { order: 3, title: 'Condicionantes', description: 'Cumprir todas as condicionantes das licenças' },
      { order: 4, title: 'Acompanhamento', description: 'Monitorar prazos de renovação' },
    ],
    kpis: ['% de licenças em dia', 'Condicionantes cumpridas', 'Autos de infração'],
    relatedQuestions: [],
    regulations: ['Lei 6.938/1981', 'Resoluções CONAMA'],
  },
  {
    id: 'compliance-trabalhista',
    questionId: 'governance_19.1',
    category: 'requisitosLegais',
    title: 'Compliance Trabalhista e Fiscal',
    description: 'Garantir conformidade com todas as obrigações trabalhistas, previdenciárias e fiscais.',
    priority: 'critica',
    effort: 'medio',
    estimatedTimeframe: 'Ongoing',
    triggersAt: 1,
    icon: Scale,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Auditoria', description: 'Realizar auditoria completa de compliance' },
      { order: 2, title: 'Correções', description: 'Regularizar pendências identificadas' },
      { order: 3, title: 'Rotinas', description: 'Implementar controles para evitar novas pendências' },
      { order: 4, title: 'Monitoramento', description: 'Acompanhar obrigações mensais' },
    ],
    kpis: ['% de conformidade', 'Passivos trabalhistas', 'Autos de fiscalização'],
    relatedQuestions: ['governance_19.2'],
    regulations: ['CLT', 'Código Tributário Nacional'],
  },
  {
    id: 'analisador-requisitos-legais',
    questionId: 'governance_19.2',
    category: 'requisitosLegais',
    title: 'Analisador de Requisitos Legais',
    description: 'Implementar sistema de monitoramento contínuo de mudanças na legislação aplicável.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 1,
    icon: Scale,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Mapeamento', description: 'Listar toda a legislação aplicável' },
      { order: 2, title: 'Ferramenta', description: 'Contratar serviço de monitoramento legal ou criar interno' },
      { order: 3, title: 'Processo', description: 'Definir fluxo de avaliação e implementação de novas leis' },
      { order: 4, title: 'Revisões', description: 'Revisar conformidade legal periodicamente' },
    ],
    kpis: ['Leis monitoradas', 'Tempo de adequação', 'Não conformidades identificadas'],
    relatedQuestions: [],
    regulations: [],
  },

  // ÉTICA
  {
    id: 'programa-integridade',
    questionId: 'governance_20.1',
    category: 'etica',
    title: 'Programa de Integridade e Compliance',
    description: 'Implementar programa estruturado de integridade conforme Lei Anticorrupção 12.846/2013.',
    priority: 'critica',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 2,
    icon: BookOpen,
    xpReward: 450,
    steps: [
      { order: 1, title: 'Código de conduta', description: 'Elaborar ou revisar código de conduta' },
      { order: 2, title: 'Canal de denúncias', description: 'Implementar canal seguro de denúncias' },
      { order: 3, title: 'Due diligence', description: 'Avaliar riscos de parceiros comerciais' },
      { order: 4, title: 'Treinamentos', description: 'Capacitar colaboradores em integridade' },
      { order: 5, title: 'Monitoramento', description: 'Auditar e avaliar eficácia do programa' },
    ],
    kpis: ['% colaboradores treinados', 'Denúncias recebidas', 'Avaliação de risco de parceiros'],
    relatedQuestions: [],
    regulations: ['Lei 12.846/2013', 'Decreto 11.129/2022'],
  },
  {
    id: 'treinamento-etica',
    questionId: 'governance_20.1',
    category: 'etica',
    title: 'Treinamento Anual de Ética e Compliance',
    description: 'Realizar treinamentos periódicos sobre ética, anticorrupção e conformidade regulatória.',
    priority: 'alta',
    effort: 'baixo',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 3,
    icon: BookOpen,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Conteúdo', description: 'Desenvolver material de treinamento' },
      { order: 2, title: 'Divisão', description: 'Separar treinamentos por nível hierárquico' },
      { order: 3, title: 'Aplicação', description: 'Realizar treinamentos presenciais ou EAD' },
      { order: 4, title: 'Avaliação', description: 'Testar conhecimento adquirido' },
    ],
    kpis: ['% colaboradores treinados', 'Nota média nas avaliações', 'Incidentes éticos'],
    relatedQuestions: [],
    regulations: ['Lei 12.846/2013'],
  },

  // TRANSPARÊNCIA
  {
    id: 'relatorio-sustentabilidade',
    questionId: 'governance_20.3',
    category: 'transparencia',
    title: 'Relatório de Sustentabilidade GRI',
    description: 'Publicar relatório anual de sustentabilidade seguindo padrões GRI (Global Reporting Initiative).',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 2,
    icon: FileText,
    xpReward: 500,
    steps: [
      { order: 1, title: 'Materialidade', description: 'Atualizar estudo de materialidade' },
      { order: 2, title: 'Coleta de dados', description: 'Levantar indicadores GRI relevantes' },
      { order: 3, title: 'Redação', description: 'Escrever relatório seguindo estrutura GRI' },
      { order: 4, title: 'Revisão', description: 'Revisar por auditor externo (opcional)' },
      { order: 5, title: 'Publicação', description: 'Publicar e divulgar relatório' },
    ],
    kpis: ['Indicadores reportados', 'Nível de aplicação GRI', 'Download do relatório'],
    relatedQuestions: [],
    regulations: ['GRI Standards'],
    prerequisites: ['matriz-materialidade'],
  },
  {
    id: 'auditoria-externa',
    questionId: 'governance_20.2',
    category: 'transparencia',
    title: 'Auditoria Externa das Demonstrações Financeiras',
    description: 'Ter demonstrações financeiras auditadas por empresa de auditoria independente.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 4,
    icon: Eye,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Seleção', description: 'Escolher empresa de auditoria (Big 4 ou nacional)' },
      { order: 2, title: 'Preparação', description: 'Organizar documentação contábil' },
      { order: 3, title: 'Auditoria', description: 'Realizar trabalho de campo' },
      { order: 4, title: 'Parecer', description: 'Emitir parecer de auditoria' },
    ],
    kpis: ['Opinião do auditor', 'Ajustes necessários', 'Prazo de entrega'],
    relatedQuestions: [],
    regulations: ['Lei 6.404/1976', 'CFC'],
  },
  {
    id: 'site-transparencia',
    questionId: 'governance_20.3',
    category: 'transparencia',
    title: 'Portal de Transparência',
    description: 'Criar seção no site com informações institucionais, ESG, indicadores e governança.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: Eye,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Conteúdo', description: 'Definir informações a serem divulgadas' },
      { order: 2, title: 'Design', description: 'Criar layout de portal de transparência' },
      { order: 3, title: 'Desenvolvimento', description: 'Implementar seção no site' },
      { order: 4, title: 'Atualização', description: 'Estabelecer rotina de atualização' },
    ],
    kpis: ['Acessos ao portal', 'Informações disponíveis', 'Engajamento dos stakeholders'],
    relatedQuestions: [],
    regulations: ['Lei 12.527/2011 (LAI)'],
  },
];

// Função para obter recomendações baseadas na resposta
export const getGovernanceRecommendations = (
  answers: Record<string, number | string | (string | number)[]>,
  maxRecommendations: number = 10
): GovernanceRecommendation[] => {
  const recommendations: GovernanceRecommendation[] = [];

  for (const rec of governanceRecommendations) {
    const answer = answers[rec.questionId];
    
    if (answer !== undefined) {
      const numericValue = typeof answer === 'string' 
        ? (answer === 'Sim' ? 5 : answer === 'Não' ? 0 : parseInt(answer) || 0)
        : answer;

      if (typeof numericValue === 'number' && numericValue <= rec.triggersAt) {
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
): GovernanceRecommendation[] => {
  const allRecs = getGovernanceRecommendations(answers, 100);
  return allRecs.filter(rec => rec.category === category);
};
