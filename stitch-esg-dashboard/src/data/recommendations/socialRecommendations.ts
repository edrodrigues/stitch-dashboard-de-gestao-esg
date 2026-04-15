import type { LucideIcon } from 'lucide-react';
import { 
  Users, 
  Heart, 
  HandHeart, 
  ShieldCheck, 
  GraduationCap,
  Accessibility,
  UserCheck
} from 'lucide-react';

export interface ActionStep {
  order: number;
  title: string;
  description: string;
}

export interface SocialRecommendation {
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

export const socialRecommendations: SocialRecommendation[] = [
  // RELAÇÕES COMUNITÁRIAS
  {
    id: 'programa-relacionamento-comunidade',
    questionId: 'social_6.1',
    category: 'relacoesComunitarias',
    title: 'Programa de Relacionamento com a Comunidade',
    description: 'Estabelecer programa estruturado de relacionamento com comunidades locais, incluindo diálogo, projetos sociais e contratação local.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: Users,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Mapeamento de stakeholders', description: 'Identificar grupos de interesse na comunidade' },
      { order: 2, title: 'Canal de diálogo', description: 'Criar canal formal de comunicação com a comunidade' },
      { order: 3, title: 'Projeto piloto', description: 'Implementar 1-2 projetos de impacto social' },
      { order: 4, title: 'Monitoramento', description: 'Avaliar satisfação da comunidade e resultados' },
    ],
    kpis: ['Investimento em projetos sociais', 'Contratação local (%)', 'Satisfação da comunidade'],
    relatedQuestions: [],
    regulations: ['Lei 13.709/2018 (LGPD)'],
  },
  {
    id: 'contratacao-inclusiva',
    questionId: 'social_6.1',
    category: 'relacoesComunitarias',
    title: 'Política de Contratação Inclusiva',
    description: 'Implementar política de contratação prioritária de moradores da comunidade local.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 3,
    icon: UserCheck,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Mapeamento', description: 'Identificar perfis necessários e comunidades próximas' },
      { order: 2, title: 'Parcerias', description: 'Firmar parcerias com órgãos de emprego e associações' },
      { order: 3, title: 'Capacitação', description: 'Oferecer treinamentos para candidatos da comunidade' },
      { order: 4, title: 'Acompanhamento', description: 'Monitorar retenção e satisfação' },
    ],
    kpis: ['% de colaboradores da comunidade', 'Taxa de retenção', 'Custo de turnover'],
    relatedQuestions: [],
    regulations: ['Lei 8.212/1991'],
  },

  // CADEIA DE FORNECIMENTO
  {
    id: 'due-diligence-fornecedores',
    questionId: 'social_7.1',
    category: 'cadeiaFornecimento',
    title: 'Due Diligence Socioambiental de Fornecedores',
    description: 'Implementar processo de avaliação socioambiental de fornecedores com critérios ESG.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: ShieldCheck,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Mapeamento', description: 'Listar fornecedores críticos e suas localizações' },
      { order: 2, title: 'Questionário ESG', description: 'Criar formulário de avaliação de fornecedores' },
      { order: 3, title: 'Classificação', description: 'Categorizar fornecedores por risco socioambiental' },
      { order: 4, title: 'Ações corretivas', description: 'Exigir melhorias ou substituir fornecedores de alto risco' },
    ],
    kpis: ['% fornecedores avaliados', 'Risco médio da cadeia', 'Não conformidades resolvidas'],
    relatedQuestions: [],
    regulations: ['Lei 12.846/2013 (Anticorrupção)', 'Lei 13.709/2018 (LGPD)'],
  },
  {
    id: 'codigo-conduta-fornecedores',
    questionId: 'social_7.1',
    category: 'cadeiaFornecimento',
    title: 'Código de Conduta para Fornecedores',
    description: 'Exigir assinatura de código de conduta com cláusulas trabalhistas, ambientais e anticorrupção.',
    priority: 'alta',
    effort: 'baixo',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 3,
    icon: HandHeart,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Elaboração', description: 'Redigir código de conduta com cláusulas ESG' },
      { order: 2, title: 'Comunicação', description: 'Enviar a todos os fornecedores ativos' },
      { order: 3, title: 'Assinatura', description: 'Coletar assinatura e compromisso' },
      { order: 4, title: 'Integração', description: 'Incluir no processo de onboarding de novos fornecedores' },
    ],
    kpis: ['% fornecedores com código assinado', 'Cláusulas ESG incluídas', 'Conformidade contratual'],
    relatedQuestions: [],
    regulations: ['Lei 12.846/2013'],
  },

  // DIREITOS HUMANOS
  {
    id: 'politica-direitos-humanos',
    questionId: 'social_8.1',
    category: 'direitosHumanos',
    title: 'Política de Direitos Humanos',
    description: 'Elaborar e implementar política formal de respeito aos direitos humanos, prevenindo trabalho escravo e infantil.',
    priority: 'critica',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: Heart,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Diagnóstico', description: 'Avaliar riscos de violações de DH na operação e cadeia' },
      { order: 2, title: 'Política', description: 'Redigir política de compromisso com DH' },
      { order: 3, title: 'Treinamento', description: 'Capacitar lideranças e colaboradores' },
      { order: 4, title: 'Monitoramento', description: 'Auditar fornecedores e operações críticas' },
    ],
    kpis: ['Colaboradores treinados', 'Auditorias realizadas', 'Incidentes reportados'],
    relatedQuestions: [],
    regulations: ['Lei 10.559/2002', 'Lei 13.344/2016', 'Lei 14.946/2024'],
  },
  {
    id: 'canal-denuncias',
    questionId: 'social_8.1',
    category: 'direitosHumanos',
    title: 'Canal de Denúncias e Whistleblowing',
    description: 'Implementar canal seguro e anônimo para denúncias de violações de direitos humanos, ética e compliance.',
    priority: 'critica',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 3,
    icon: ShieldCheck,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Seleção de ferramenta', description: 'Escolher plataforma de denúncias (própria ou terceirizada)' },
      { order: 2, title: 'Comunicação', description: 'Divulgar canal para todos os stakeholders' },
      { order: 3, title: 'Processo', description: 'Criar fluxo de tratamento e investigação' },
      { order: 4, title: 'Comitê', description: 'Formar comitê de ética para avaliação' },
    ],
    kpis: ['Denúncias recebidas', 'Tempo médio de resposta', 'Satisfação dos denunciantes'],
    relatedQuestions: [],
    regulations: ['Lei 13.608/2018', 'Lei 14.457/2022'],
  },

  // PRÁTICAS TRABALHISTAS
  {
    id: 'manual-funcionario',
    questionId: 'social_10.1',
    category: 'praticasTrabalhistas',
    title: 'Manual do Funcionário Completo',
    description: 'Criar manual do funcionário atualizado com políticas claras sobre remuneração, benefícios, carreira e conduta.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: GraduationCap,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Levantamento', description: 'Mapear todas as políticas existentes' },
      { order: 2, title: 'Elaboração', description: 'Redigir manual completo e didático' },
      { order: 3, title: 'Revisão jurídica', description: 'Validar conformidade com legislação trabalhista' },
      { order: 4, title: 'Divulgação', description: 'Entregar a todos os colaboradores e coletar ciência' },
    ],
    kpis: ['% colaboradores com manual', 'Cumprimento de políticas', 'Dúvidas/esclarecimentos'],
    relatedQuestions: [],
    regulations: ['CLT', 'Lei 13.467/2017'],
  },
  {
    id: 'politica-assedio',
    questionId: 'social_10.1',
    category: 'praticasTrabalhistas',
    title: 'Política Antissédio e Discriminação',
    description: 'Implementar política zero tolerância contra assédio moral, sexual e discriminação de qualquer natureza.',
    priority: 'critica',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 3,
    icon: ShieldCheck,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Definição', description: 'Redigir política clara com exemplos de comportamentos inaceitáveis' },
      { order: 2, title: 'Canal de denúncia', description: 'Criar canal específico para denúncias de assédio' },
      { order: 3, title: 'Treinamento obrigatório', description: 'Capacitar todos os colaboradores' },
      { order: 4, title: 'Comitê de investigação', description: 'Formar grupo treinado para investigar denúncias' },
    ],
    kpis: ['% colaboradores treinados', 'Denúncias investigadas', 'Medidas disciplinares aplicadas'],
    relatedQuestions: [],
    regulations: ['Lei 14.457/2022', 'Lei 13.467/2017'],
  },
  {
    id: 'gestao-terceirizados',
    questionId: 'social_10.2',
    category: 'praticasTrabalhistas',
    title: 'Gestão Responsável de Terceirizados',
    description: 'Garantir que trabalhadores terceirizados tenham condições dignas de trabalho e respeito aos direitos trabalhistas.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: Users,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Mapeamento', description: 'Listar todas as empresas terceirizadas' },
      { order: 2, title: 'Cláusulas contratuais', description: 'Incluir obrigações ESG nos contratos' },
      { order: 3, title: 'Auditorias', description: 'Verificar condições de trabalho periodicamente' },
      { order: 4, title: 'Escalonamento', description: 'Tratar não conformidades com empresas' },
    ],
    kpis: ['% terceirizados auditados', 'Não conformidades', 'Substituição de empresas'],
    relatedQuestions: ['social_10.3'],
    regulations: ['Lei 6.019/1974', 'Lei 13.429/2017'],
  },
  {
    id: 'beneficios-complementares',
    questionId: 'social_10.4',
    category: 'praticasTrabalhistas',
    title: 'Programa de Benefícios Complementares',
    description: 'Oferecer benefícios que aumentem a renda e qualidade de vida (PLR, produtividade, participação nos lucros).',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 0,
    icon: Heart,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Diagnóstico', description: 'Avaliar necessidades dos colaboradores' },
      { order: 2, title: 'Modelo', description: 'Definir critérios de distribuição (PLR, participação)' },
      { order: 3, title: 'Negociação', description: 'Discutir com representantes dos trabalhadores' },
      { order: 4, title: 'Implementação', description: 'Lançar programa e comunicar' },
    ],
    kpis: ['Satisfação com benefícios', '% participação na receita', 'Retenção de talentos'],
    relatedQuestions: [],
    regulations: ['Lei 10.101/2000'],
  },

  // SAÚDE E SEGURANÇA
  {
    id: 'programa-sst',
    questionId: 'social_11.1',
    category: 'saudeSeguranca',
    title: 'Programa de Saúde e Segurança do Trabalho (SST)',
    description: 'Implementar programa robusto de SST com CIPA, PCMSO, PPRA e integração com saúde mental.',
    priority: 'critica',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 1,
    icon: ShieldCheck,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Mapeamento de riscos', description: 'Identificar todos os riscos ocupacionais' },
      { order: 2, title: 'PPRA/PCMSO', description: 'Elaborar programas conforme NRs aplicáveis' },
      { order: 3, title: 'CIPA', description: 'Formar e treinar comissão interna' },
      { order: 4, title: 'Treinamentos', description: 'Capacitar colaboradores em segurança' },
    ],
    kpis: ['Taxa de frequência (TFR)', 'Taxa de gravidade (TGR)', 'Investimento em SST'],
    relatedQuestions: ['social_11.2', 'social_11.3', 'social_11.4'],
    regulations: ['NRs do MTE', 'Lei 6.514/1977'],
  },
  {
    id: 'programa-saude-mental',
    questionId: 'social_11.2',
    category: 'saudeSeguranca',
    title: 'Programa de Saúde Mental e Bem-estar',
    description: 'Implementar programa de apoio psicológico, prevenção ao burnout e promoção do bem-estar.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: Heart,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Pesquisa', description: 'Avaliar estado de saúde mental dos colaboradores' },
      { order: 2, title: 'Apoio psicológico', description: 'Contratar psicólogo ou parceria EAP' },
      { order: 3, title: 'Treinamentos', description: 'Capacitar gestores em saúde mental' },
      { order: 4, title: 'Ações preventivas', description: 'Promover equilíbrio vida-trabalho' },
    ],
    kpis: ['Absenteísmo', 'Uso do apoio psicológico', 'NPS de bem-estar'],
    relatedQuestions: [],
    regulations: ['NR 35', 'Lei 14.589/2023'],
  },
  {
    id: 'epi-adequado',
    questionId: 'social_11.3',
    category: 'saudeSeguranca',
    title: 'Programa de EPIs e Prevenção de Acidentes',
    description: 'Garantir fornecimento de EPIs adequados, treinamentos e prevenção de acidentes.',
    priority: 'alta',
    effort: 'baixo',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: ShieldCheck,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Mapeamento', description: 'Identificar necessidades de EPI por função' },
      { order: 2, title: 'Entrega', description: 'Fornecer EPIs adequados e de qualidade' },
      { order: 3, title: 'Treinamento', description: 'Capacitar uso correto e importância' },
      { order: 4, title: 'Fiscalização', description: 'Monitorar uso obrigatório' },
    ],
    kpis: ['% colaboradores com EPI adequado', 'Acidentes evitados', 'Investimento em EPI'],
    relatedQuestions: [],
    regulations: ['NR 6', 'NRs específicas'],
  },
  {
    id: 'gestao-acidentes',
    questionId: 'social_11.4',
    category: 'saudeSeguranca',
    title: 'Sistema de Gestão de Acidentes e Quase Acidentes',
    description: 'Implementar sistema de reporte, investigação e prevenção de acidentes de trabalho.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 2,
    icon: ShieldCheck,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Cultura de reporte', description: 'Incentivar reporte sem punição' },
      { order: 2, title: 'Investigação', description: 'Criar metodologia de análise de causas' },
      { order: 3, title: 'Ações corretivas', description: 'Implementar medidas preventivas' },
      { order: 4, title: 'Indicadores', description: 'Monitorar TFR, TGR e análise de tendências' },
    ],
    kpis: ['TFR (Taxa de Frequência)', 'TGR (Taxa de Gravidade)', 'Quase acidentes reportados'],
    relatedQuestions: [],
    regulations: ['NR 1', 'CAT (Comunicação de Acidente de Trabalho)'],
  },

  // DIVERSIDADE E INCLUSÃO
  {
    id: 'programa-diversidade',
    questionId: 'social_9.1',
    category: 'diversidade',
    title: 'Programa de Diversidade e Inclusão',
    description: 'Criar programa estruturado para promover diversidade em gênero, raça, LGBTQIAPN+, PCDs e gerações.',
    priority: 'alta',
    effort: 'alto',
    estimatedTimeframe: '6-12 meses',
    triggersAt: 2,
    icon: Users,
    xpReward: 400,
    steps: [
      { order: 1, title: 'Diagnóstico', description: 'Avaliar composição atual da força de trabalho' },
      { order: 2, title: 'Metas', description: 'Estabelecer metas de diversidade com prazos' },
      { order: 3, title: 'Processo seletivo', description: 'Revisar para eliminar vieses' },
      { order: 4, title: 'Treinamento', description: 'Capacitar em diversidade e inclusão' },
    ],
    kpis: ['% mulheres em liderança', '% negros na empresa', '% PCDs', 'NPS de inclusão'],
    relatedQuestions: ['social_12.1', 'social_12.2', 'social_12.3', 'social_12.4', 'social_12.5', 'social_12.6'],
    regulations: ['Lei 8.213/1991 (cota PCD)', 'Lei 13.146/2017'],
  },
  {
    id: 'comite-diversidade',
    questionId: 'social_9.1',
    category: 'diversidade',
    title: 'Comitê de Diversidade e Inclusão',
    description: 'Formar comitê com representantes diversos para liderar iniciativas de D&I.',
    priority: 'media',
    effort: 'medio',
    estimatedTimeframe: '1-3 meses',
    triggersAt: 3,
    icon: Users,
    xpReward: 300,
    steps: [
      { order: 1, title: 'Definição', description: 'Criar regimento e objetivos do comitê' },
      { order: 2, title: 'Recrutamento', description: 'Convidar voluntários diversos' },
      { order: 3, title: 'Capacitação', description: 'Treinar membros em D&I e facilitação' },
      { order: 4, title: 'Atuação', description: 'Iniciar projetos e eventos de D&I' },
    ],
    kpis: ['Reuniões realizadas', 'Projetos implementados', 'Engajamento dos membros'],
    relatedQuestions: [],
    regulations: [],
    prerequisites: ['programa-diversidade'],
  },
  {
    id: 'cota-pcd',
    questionId: 'social_12.6',
    category: 'diversidade',
    title: 'Cumprimento da Cota de PCDs',
    description: 'Contratar pessoas com deficiência conforme Lei de Cotas (5% para empresas com mais de 100 funcionários).',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: Accessibility,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Diagnóstico', description: 'Calcular quantidade de PCDs necessária' },
      { order: 2, title: 'Acessibilidade', description: 'Adequar instalações e processos' },
      { order: 3, title: 'Parcerias', description: 'Firmar parcerias com APAs e instituições' },
      { order: 4, title: 'Contratação', description: 'Realizar processo seletivo inclusivo' },
    ],
    kpis: ['% de PCDs contratados', 'Taxa de retenção', 'Custo com acessibilidade'],
    relatedQuestions: [],
    regulations: ['Lei 8.213/1991', 'Decreto 3.298/1999'],
  },
  {
    id: 'equidade-genero',
    questionId: 'social_12.1',
    category: 'diversidade',
    title: 'Programa de Equidade de Gênero',
    description: 'Promover equidade salarial entre gêneros e aumentar representação feminina em liderança.',
    priority: 'alta',
    effort: 'medio',
    estimatedTimeframe: '3-6 meses',
    triggersAt: 2,
    icon: Users,
    xpReward: 350,
    steps: [
      { order: 1, title: 'Análise salarial', description: 'Realizar estudo de equidade remuneratória' },
      { order: 2, title: 'Correções', description: 'Ajustar disparidades salariais identificadas' },
      { order: 3, title: 'Liderança', description: 'Criar programa de mentoria para mulheres' },
      { order: 4, title: 'Políticas', description: 'Implementar licença parental estendida' },
    ],
    kpis: ['Diferença salarial (%)', '% mulheres em liderança', 'Índice de equidade de gênero'],
    relatedQuestions: [],
    regulations: ['Lei 13.467/2017', 'Lei 14.020/2020'],
  },
];

// Função para obter recomendações baseadas na resposta
export const getSocialRecommendations = (
  answers: Record<string, number | string | (string | number)[]>,
  maxRecommendations: number = 10
): SocialRecommendation[] => {
  const recommendations: SocialRecommendation[] = [];

  for (const rec of socialRecommendations) {
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
): SocialRecommendation[] => {
  const allRecs = getSocialRecommendations(answers, 100);
  return allRecs.filter(rec => rec.category === category);
};
