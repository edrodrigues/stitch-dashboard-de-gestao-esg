import { Zap, Recycle, Droplets, LeafyGreen, Wind, TreePine, Factory, type LucideIcon } from 'lucide-react';

export interface Recommendation {
  id: string;
  icon: LucideIcon;
  title: string;
  points: string;
  impact: string;
  color: string;
  bg: string;
}

export interface RecommendationRule {
  questionId: string;
  maxValue: number;
  recommendation: Recommendation;
}

// Updated recommendations mapping to new ESG 2026 question IDs
export const environmentalRecommendations: RecommendationRule[] = [
  // EMISSÕES DE CARBONO (environmental_2.1)
  {
    questionId: 'environmental_2.1',
    maxValue: 2,
    recommendation: {
      id: 'ghg-inventory',
      icon: Wind,
      title: 'Implementar Inventário de Gases de Efeito Estufa',
      points: '+550 XP',
      impact: 'Alto Impacto',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    }
  },

  // ÁGUA E EFLUENTES (environmental_3.1)
  {
    questionId: 'environmental_3.1',
    maxValue: 2,
    recommendation: {
      id: 'water-monitor',
      icon: Droplets,
      title: 'Implementar Monitoramento de Consumo de Água',
      points: '+300 XP',
      impact: 'Tecnológico',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  },
  {
    questionId: 'environmental_3.1',
    maxValue: 3,
    recommendation: {
      id: 'water-efficiency',
      icon: Droplets,
      title: 'Estabelecer Metas de Redução de Consumo de Água',
      points: '+400 XP',
      impact: 'Médio Impacto',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  },

  // ENERGIA (environmental_3.2)
  {
    questionId: 'environmental_3.2',
    maxValue: 2,
    recommendation: {
      id: 'energy-monitor',
      icon: Zap,
      title: 'Implementar Monitoramento de Energia',
      points: '+400 XP',
      impact: 'Alto Impacto',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    }
  },
  {
    questionId: 'environmental_3.2',
    maxValue: 3,
    recommendation: {
      id: 'renewable-energy',
      icon: Zap,
      title: 'Migrar para Fontes de Energia Renovável',
      points: '+600 XP',
      impact: 'Alto Impacto',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    }
  },

  // Percentual de energia sustentável (environmental_3.2C)
  {
    questionId: 'environmental_3.2C',
    maxValue: 2,
    recommendation: {
      id: 'energy-percent',
      icon: Zap,
      title: 'Aumentar Percentual de Energia Sustentável',
      points: '+350 XP',
      impact: 'Estratégico',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    }
  },

  // GESTÃO DE RESÍDUOS (environmental_4.1)
  {
    questionId: 'environmental_4.1',
    maxValue: 2,
    recommendation: {
      id: 'waste-monitor',
      icon: Recycle,
      title: 'Implementar Monitoramento de Resíduos',
      points: '+300 XP',
      impact: 'Médio Impacto',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },
  {
    questionId: 'environmental_4.1',
    maxValue: 3,
    recommendation: {
      id: 'waste-reduction',
      icon: Recycle,
      title: 'Adotar Medidas de Redução de Resíduos',
      points: '+400 XP',
      impact: 'Estratégico',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },
  {
    questionId: 'environmental_4.1',
    maxValue: 4,
    recommendation: {
      id: 'circular-economy',
      icon: Recycle,
      title: 'Implementar Economia Circular nos Resíduos',
      points: '+500 XP',
      impact: 'Alto Impacto',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },

  // PLANO DE GERENCIAMENTO DE RESÍDUOS (environmental_4.2)
  {
    questionId: 'environmental_4.2',
    maxValue: 0,
    recommendation: {
      id: 'waste-plan',
      icon: Recycle,
      title: 'Criar Plano de Gerenciamento de Resíduos',
      points: '+400 XP',
      impact: 'Alto Impacto',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },

  // PEGADA AMBIENTAL (environmental_5.1)
  {
    questionId: 'environmental_5.1',
    maxValue: 2,
    recommendation: {
      id: 'footprint-assessment',
      icon: LeafyGreen,
      title: 'Realizar Avaliação da Pegada Ambiental',
      points: '+450 XP',
      impact: 'Estratégico',
      color: 'text-emerald-600',
      bg: 'bg-emerald-600/10'
    }
  },
  {
    questionId: 'environmental_5.1',
    maxValue: 3,
    recommendation: {
      id: 'lifecycle-mgmt',
      icon: Factory,
      title: 'Implementar Gestão do Ciclo de Vida do Produto',
      points: '+500 XP',
      impact: 'Alto Impacto',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  },
  {
    questionId: 'environmental_5.1',
    maxValue: 4,
    recommendation: {
      id: 'eco-efficiency',
      icon: Factory,
      title: 'Estabelecer Metas de Aumento da Ecoeficiência',
      points: '+550 XP',
      impact: 'Alto Impacto',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  },

  // EMBALAGEM (form_1.5b)
  {
    questionId: 'form_1.5b',
    maxValue: 2,
    recommendation: {
      id: 'packaging-eco',
      icon: Recycle,
      title: 'Substituir Embalagens por Alternativas Ecológicas',
      points: '+350 XP',
      impact: 'Estratégico',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },
  {
    questionId: 'form_1.5b',
    maxValue: 3,
    recommendation: {
      id: 'packaging-reduce',
      icon: Recycle,
      title: 'Reduzir Volume de Embalagens',
      points: '+300 XP',
      impact: 'Médio Impacto',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },

  // DISTRIBUIÇÃO (form_1.5c)
  {
    questionId: 'form_1.5c',
    maxValue: 2,
    recommendation: {
      id: 'logistics-optimize',
      icon: Factory,
      title: 'Otimizar Logística de Distribuição',
      points: '+300 XP',
      impact: 'Médio Impacto',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  },
  {
    questionId: 'form_1.5c',
    maxValue: 3,
    recommendation: {
      id: 'sustainable-logistics',
      icon: Factory,
      title: 'Implementar Logística Sustentável',
      points: '+400 XP',
      impact: 'Estratégico',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  },

  // CADEIA DE FORNECIMENTO (social_7.1) - moved to social but relates to environment
  {
    questionId: 'social_7.1',
    maxValue: 2,
    recommendation: {
      id: 'supplier-mapping',
      icon: TreePine,
      title: 'Mapear Riscos Socioambientais na Cadeia de Valor',
      points: '+400 XP',
      impact: 'Estratégico',
      color: 'text-green-600',
      bg: 'bg-green-600/10'
    }
  },
  {
    questionId: 'social_7.1',
    maxValue: 4,
    recommendation: {
      id: 'raw-material-cert',
      icon: TreePine,
      title: 'Buscar Certificação de Rastreabilidade (FSC)',
      points: '+600 XP',
      impact: 'Alto Impacto',
      color: 'text-green-600',
      bg: 'bg-green-600/10'
    }
  },
  {
    questionId: 'social_7.1',
    maxValue: 3,
    recommendation: {
      id: 'supplier-sustainable',
      icon: TreePine,
      title: 'Implementar Programa de Manejo Sustentável',
      points: '+450 XP',
      impact: 'Estratégico',
      color: 'text-green-600',
      bg: 'bg-green-600/10'
    }
  }
];

export const getRecommendationsForAnswers = (
  answers: Record<string, number | string>,
  maxRecommendations: number = 5
): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  for (const rule of environmentalRecommendations) {
    const answer = answers[rule.questionId];

    if (answer !== undefined) {
      const numericValue = typeof answer === 'string'
        ? (answer === 'Sim' || answer === 'sim' ? 5 : answer === 'Não' || answer === 'nao' ? 0 : parseInt(answer) || 0)
        : answer;

      if (typeof numericValue === 'number' && numericValue <= rule.maxValue) {
        if (!recommendations.find(r => r.id === rule.recommendation.id)) {
          recommendations.push(rule.recommendation);
        }
      }
    }
  }

  return recommendations.slice(0, maxRecommendations);
};
