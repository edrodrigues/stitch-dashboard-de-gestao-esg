import type { Question } from '../types';

// Perfil de setor com áreas prioritárias e multiplicadores de peso
export interface SectorProfile {
  key: string;
  name: string;
  priorityAreas: string[];
  specialActions: string[];
  regulations: string[];
  weightMultiplier: Record<string, number>;
}

export const sectorProfiles: Record<string, SectorProfile> = {
  industria: {
    key: 'industria',
    name: 'Indústria',
    priorityAreas: ['emissoesCarbono', 'residuos', 'energia', 'aguaEfluentes'],
    specialActions: [
      'Inventário de GEE (Escopos 1, 2 e 3)',
      'Logística Reversa conforme PNRS',
      'Licenciamento Ambiental',
      'Gestão de Efluentes Industriais',
    ],
    regulations: ['NR 12', 'Licença Ambiental', 'PRAD', 'PNRS'],
    weightMultiplier: {
      emissoesCarbono: 1.5,
      residuos: 1.4,
      energia: 1.3,
      aguaEfluentes: 1.3,
    },
  },
  agropecuaria: {
    key: 'agropecuaria',
    name: 'Agropecuária',
    priorityAreas: ['aguaEfluentes', 'pegadaAmbiental', 'emissoesCarbono'],
    specialActions: [
      'Rastreabilidade da Cadeia de Suprimentos',
      'Certificação FSC/Orgânico',
      'Cadastro Ambiental Rural (CAR)',
      'Pecuária Regenerativa',
    ],
    regulations: ['Código Florestal', 'CAR', 'Licenciamento Ambiental', 'PRA'],
    weightMultiplier: {
      aguaEfluentes: 1.5,
      pegadaAmbiental: 1.4,
      emissoesCarbono: 1.2,
    },
  },
  comercio: {
    key: 'comercio',
    name: 'Comércio',
    priorityAreas: ['gestaoRiscos', 'satisfacaoCliente', 'residuos'],
    specialActions: [
      'Selo Verde de Comércio',
      'Rotulagem Sustentável de Produtos',
      'Programa de Logística Reversa',
      'Compras Sustentáveis',
    ],
    regulations: ['CDC', 'LGPD', 'PNRS'],
    weightMultiplier: {
      gestaoRiscos: 1.3,
      satisfacaoCliente: 1.4,
      residuos: 1.3,
    },
  },
  informatica: {
    key: 'informatica',
    name: 'Tecnologia da Informação',
    priorityAreas: ['gestaoRiscos', 'etica', 'transparencia'],
    specialActions: [
      'Implementar Governança de Dados (LGPD)',
      'Green IT - Data Centers Eficientes',
      'Programa de Inclusão Digital',
      'Relatório de Transparência Algorítmica',
    ],
    regulations: ['LGPD', 'ISO 27001', 'Marco Civil da Internet'],
    weightMultiplier: {
      gestaoRiscos: 1.5,
      etica: 1.4,
      transparencia: 1.3,
    },
  },
  saude: {
    key: 'saude',
    name: 'Saúde',
    priorityAreas: ['gestaoRiscos', 'satisfacaoCliente', 'etica'],
    specialActions: [
      'Protocolos de Segurança do Paciente',
      'Gestão de Resíduos Hospitalares',
      'Certificação ONA/Acreditação',
      'Programa de Saúde Ocupacional',
    ],
    regulations: ['ANVISA', 'RDC', 'NR 32', 'PNRS'],
    weightMultiplier: {
      gestaoRiscos: 1.5,
      satisfacaoCliente: 1.4,
      etica: 1.3,
    },
  },
  construcao: {
    key: 'construcao',
    name: 'Construção Civil',
    priorityAreas: ['residuos', 'emissoesCarbono', 'seguranca'],
    specialActions: [
      'Gestão de Resíduos Sólidos da Construção',
      'Selo Verde (GBC)',
      'Segurança do Trabalho (NR 18)',
      'Materiais Sustentáveis',
    ],
    regulations: ['NR 18', 'NR 35', 'PNRS', 'LEED/GBC'],
    weightMultiplier: {
      residuos: 1.5,
      emissoesCarbono: 1.3,
      saudeSeguranca: 1.4,
    },
  },
  transporte: {
    key: 'transporte',
    name: 'Transporte',
    priorityAreas: ['emissoesCarbono', 'energia', 'gestaoRiscos'],
    specialActions: [
      'Frota Verde / Eletromobilidade',
      'Logística Sustentável',
      'Gestão de Riscos Operacionais',
      'Programa de Prevenção de Acidentes',
    ],
    regulations: ['ANTT', 'DNIT', 'CONTRAN', 'NR 17'],
    weightMultiplier: {
      emissoesCarbono: 1.6,
      energia: 1.3,
      gestaoRiscos: 1.4,
    },
  },
  // Fallback para setores não mapeados
  outros: {
    key: 'outros',
    name: 'Outros',
    priorityAreas: ['etica', 'transparencia', 'gestaoRiscos'],
    specialActions: [
      'Implementar políticas ESG básicas',
      'Monitoramento de indicadores',
      'Programa de compliance',
    ],
    regulations: ['LGPD', 'Leis Trabalhistas'],
    weightMultiplier: {
      etica: 1.2,
      transparencia: 1.2,
      gestaoRiscos: 1.2,
    },
  },
};

// Níveis de complexidade por porte da empresa
export const sizeComplexity: Record<string, number> = {
  microempresa: 1,
  pequeno_porte: 2,
  medio_porte: 3,
  grande_porte: 4,
  multinacional: 5,
  ong: 2,
  outros: 2,
};

// Interface para recomendação priorizada
export interface PrioritizedRecommendation {
  id: string;
  questionId: string;
  pillar: 'E' | 'S' | 'G';
  category: string;
  title: string;
  description: string;
  priority: 'critica' | 'alta' | 'media' | 'baixa';
  priorityScore: number;
  gap: number; // 5 - resposta atual
  effort: 'baixo' | 'medio' | 'alto';
  estimatedTimeframe: string;
  triggersAt: number;
}

// Função para calcular o score de prioridade
export const calculatePriorityScore = (
  answer: number,
  weight: number,
  sectorImpact: number,
  urgencyMultiplier: number = 1
): number => {
  const gap = 5 - answer; // Quanto menor a resposta, maior o gap
  return gap * weight * sectorImpact * urgencyMultiplier;
};

// Função para determinar nível de urgência baseado no gap
export const getUrgencyLevel = (answer: number): { level: number; label: string } => {
  const gap = 5 - answer;
  if (gap >= 4) return { level: 2.0, label: 'critica' };
  if (gap >= 3) return { level: 1.5, label: 'alta' };
  if (gap >= 2) return { level: 1.2, label: 'media' };
  return { level: 1.0, label: 'baixa' };
};

// Função para obter o peso do setor para uma categoria
export const getSectorWeight = (sector: string, category: string): number => {
  const profile = sectorProfiles[sector] || sectorProfiles.outros;
  return profile.weightMultiplier[category] || 1.0;
};

// Função principal para priorizar recomendações
export const prioritizeRecommendations = (
  answers: Record<string, number | string | (string | number)[]>,
  questions: Question[],
  sector: string = 'outros'
): PrioritizedRecommendation[] => {
  const recommendations: PrioritizedRecommendation[] = [];

  questions.forEach(question => {
    // Ignorar questões do formulário (dados da empresa)
    if (question.category === 'form') return;

    const answer = answers[question.id];
    if (answer === undefined || typeof answer !== 'number') return;

    const pillar = question.category === 'environmental' ? 'E' : 
                   question.category === 'social' ? 'S' : 'G';

    // Extrair categoria da subcategoria
    const category = question.subcategory?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '') || 'outros';

    // Calcular prioridade
    const sectorWeight = getSectorWeight(sector, category);
    const urgency = getUrgencyLevel(answer);
    const priorityScore = calculatePriorityScore(answer, 1, sectorWeight, urgency.level);

    // Só recomendar se o score for baixo (<= 3)
    if (answer <= 3) {
      recommendations.push({
        id: `rec_${question.id}`,
        questionId: question.id,
        pillar,
        category,
        title: `Melhorar: ${question.text.substring(0, 50)}...`,
        description: generateRecommendationDescription(question, answer),
        priority: urgency.label as 'critica' | 'alta' | 'media' | 'baixa',
        priorityScore,
        gap: 5 - answer,
        effort: estimateEffort(answer, category),
        estimatedTimeframe: estimateTimeframe(answer, category),
        triggersAt: answer,
      });
    }
  });

  // Ordenar por score de prioridade (maior primeiro)
  return recommendations.sort((a, b) => b.priorityScore - a.priorityScore);
};

// Função auxiliar para gerar descrição da recomendação
const generateRecommendationDescription = (
  question: Question,
  answer: number
): string => {
  const gap = 5 - answer;
  
  if (gap >= 4) {
    return `Ação crítica necessária para ${question.text.toLowerCase()}. Implementação urgente recomendada.`;
  } else if (gap >= 3) {
    return `Melhoria importante identificada em ${question.text.toLowerCase()}. Ação recomendada para próximo trimestre.`;
  } else if (gap >= 2) {
    return `Oportunidade de aprimoramento em ${question.text.toLowerCase()}. Incluir no plano anual.`;
  }
  return `Manter práticas atuais e buscar excelência em ${question.text.toLowerCase()}.`;
};

// Função auxiliar para estimar esforço
const estimateEffort = (
  answer: number,
  category: string
): 'baixo' | 'medio' | 'alto' => {
  const gap = 5 - answer;
  
  // Categorias complexas exigem mais esforço
  const complexCategories = ['emissoescarbono', 'gestaoriscos', 'certificacao'];
  const isComplex = complexCategories.some(c => category.includes(c));
  
  if (gap >= 4 || isComplex) return 'alto';
  if (gap >= 2) return 'medio';
  return 'baixo';
};

// Função auxiliar para estimar timeframe
const estimateTimeframe = (
  answer: number,
  category: string
): string => {
  const effort = estimateEffort(answer, category);
  
  if (effort === 'alto') return '6-12 meses';
  if (effort === 'medio') return '3-6 meses';
  return '1-3 meses';
};

// Função para obter ações especiais do setor
export const getSectorSpecialActions = (sector: string): string[] => {
  const profile = sectorProfiles[sector] || sectorProfiles.outros;
  return profile.specialActions;
};

// Função para obter regulamentos do setor
export const getSectorRegulations = (sector: string): string[] => {
  const profile = sectorProfiles[sector] || sectorProfiles.outros;
  return profile.regulations;
};

// Função para determinar nível de maturidade baseado no score
export const getMaturityLevel = (overallScore: number): {
  level: 'iniciante' | 'desenvolvedor' | 'consolidador' | 'referencia';
  label: string;
  description: string;
  nextSteps: string[];
} => {
  if (overallScore <= 25) {
    return {
      level: 'iniciante',
      label: 'Iniciante',
      description: 'Foco em compliance básico e fundamentos ESG',
      nextSteps: [
        'Realizar diagnóstico ESG completo',
        'Criar política ambiental formal',
        'Implementar monitoramento básico',
      ],
    };
  }
  if (overallScore <= 50) {
    return {
      level: 'desenvolvedor',
      label: 'Desenvolvedor',
      description: 'Foco em metas quantitativas e programas estruturados',
      nextSteps: [
        'Estabelecer inventário de GEE',
        'Definir metas de redução',
        'Implementar sistema de gestão',
      ],
    };
  }
  if (overallScore <= 75) {
    return {
      level: 'consolidador',
      label: 'Consolidador',
      description: 'Foco em relatórios, certificações e economia circular',
      nextSteps: [
        'Buscar certificação ISO 14001',
        'Iniciar reporte GRI',
        'Implementar economia circular',
      ],
    };
  }
  return {
    level: 'referencia',
    label: 'Referência',
    description: 'Foco em inovação e liderança setorial',
    nextSteps: [
      'Publicar relatório integrado',
      'Liderança em benchmarks setoriais',
      'Engajamento avançado de stakeholders',
    ],
  };
};

// Função para gerar plano de ação trimestral
export interface QuarterlyActionPlan {
  Q1: PrioritizedRecommendation[];
  Q2: PrioritizedRecommendation[];
  Q3: PrioritizedRecommendation[];
  Q4: PrioritizedRecommendation[];
}

export const generateQuarterlyPlan = (
  recommendations: PrioritizedRecommendation[]
): QuarterlyActionPlan => {
  const plan: QuarterlyActionPlan = {
    Q1: [],
    Q2: [],
    Q3: [],
    Q4: [],
  };

  // Distribuir recomendações por trimestre baseado na prioridade
  recommendations.forEach((rec, index) => {
    if (rec.priority === 'critica' || (rec.priority === 'alta' && index < 5)) {
      plan.Q1.push(rec);
    } else if (rec.priority === 'alta' || (rec.priority === 'media' && index < 10)) {
      plan.Q2.push(rec);
    } else if (rec.priority === 'media') {
      plan.Q3.push(rec);
    } else {
      plan.Q4.push(rec);
    }
  });

  // Limitar a 5 ações por trimestre para não sobrecarregar
  plan.Q1 = plan.Q1.slice(0, 5);
  plan.Q2 = plan.Q2.slice(0, 5);
  plan.Q3 = plan.Q3.slice(0, 5);
  plan.Q4 = plan.Q4.slice(0, 5);

  return plan;
};
