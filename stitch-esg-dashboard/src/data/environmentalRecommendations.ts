import { Zap, Recycle, Droplets, LeafyGreen, Wind, TreePine, Factory, Timer, type LucideIcon } from 'lucide-react';

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

export const environmentalRecommendations: RecommendationRule[] = [
  {
    questionId: 'environmental_2.1',
    maxValue: 2,
    recommendation: {
      id: 'sga-monitor',
      icon: LeafyGreen,
      title: 'Implementar Sistema de Gestão Ambiental (ISO 14001)',
      points: '+500 XP',
      impact: 'Alto Impacto',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },
  {
    questionId: 'environmental_2.2',
    maxValue: 2,
    recommendation: {
      id: 'policy-env',
      icon: LeafyGreen,
      title: 'Criar Política Ambiental Formal',
      points: '+300 XP',
      impact: 'Estratégico',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },
  {
    questionId: 'environmental_3.1',
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
    questionId: 'environmental_3.3',
    maxValue: 2,
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
  {
    questionId: 'environmental_3.4',
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
  {
    questionId: 'environmental_4.1',
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
    questionId: 'environmental_4.3',
    maxValue: 2,
    recommendation: {
      id: 'water-source',
      icon: Droplets,
      title: 'Diversificar Fontes de Água Sustentáveis',
      points: '+400 XP',
      impact: 'Médio Impacto',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  },
  {
    questionId: 'environmental_4.4',
    maxValue: 2,
    recommendation: {
      id: 'water-percent',
      icon: Droplets,
      title: 'Aumentar Captação de Água da Chuva',
      points: '+250 XP',
      impact: 'Médio Impacto',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  },
  {
    questionId: 'environmental_4.5',
    maxValue: 2,
    recommendation: {
      id: 'effluent-treatment',
      icon: Droplets,
      title: 'Implementar Estação de Tratamento de Efluentes',
      points: '+500 XP',
      impact: 'Alto Impacto',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  },
  {
    questionId: 'environmental_4.6',
    maxValue: 0,
    recommendation: {
      id: 'toxic-monitor',
      icon: Timer,
      title: 'Implementar Monitoramento de Efluentes Tóxicos',
      points: '+450 XP',
      impact: 'Crítico',
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    }
  },
  {
    questionId: 'environmental_5.1',
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
  {
    questionId: 'environmental_5.3',
    maxValue: 2,
    recommendation: {
      id: 'waste-destination',
      icon: Recycle,
      title: 'Implementar Logística Reversa',
      points: '+350 XP',
      impact: 'Estratégico',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },
  {
    questionId: 'environmental_5.4',
    maxValue: 2,
    recommendation: {
      id: 'waste-reduction',
      icon: Recycle,
      title: 'Adotar Medidas de Redução de Resíduos',
      points: '+300 XP',
      impact: 'Médio Impacto',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },
  {
    questionId: 'environmental_5.5',
    maxValue: 0,
    recommendation: {
      id: 'hazardous-waste',
      icon: Recycle,
      title: 'Implementar Monitoramento de Resíduos Perigosos',
      points: '+500 XP',
      impact: 'Crítico',
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    }
  },
  {
    questionId: 'environmental_5.6',
    maxValue: 0,
    recommendation: {
      id: 'packaging-eco',
      icon: Recycle,
      title: 'Substituir Embalagens Plásticas por Alternativas Ecológicas',
      points: '+350 XP',
      impact: 'Estratégico',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  },
  {
    questionId: 'environmental_6.1',
    maxValue: 2,
    recommendation: {
      id: 'ghg-monitor',
      icon: Wind,
      title: 'Implementar Inventário de Gases de Efeito Estufa',
      points: '+550 XP',
      impact: 'Alto Impacto',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    }
  },
  {
    questionId: 'environmental_6.3',
    maxValue: 2,
    recommendation: {
      id: 'air-quality',
      icon: Wind,
      title: 'Implementar Monitoramento de Qualidade do Ar',
      points: '+300 XP',
      impact: 'Tecnológico',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    }
  },
  {
    questionId: 'environmental_7.1',
    maxValue: 2,
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
    questionId: 'environmental_7.2',
    maxValue: 2,
    recommendation: {
      id: 'supplier-sustainable',
      icon: TreePine,
      title: 'Implementar Programa de Manejo Sustentável',
      points: '+450 XP',
      impact: 'Estratégico',
      color: 'text-green-600',
      bg: 'bg-green-600/10'
    }
  },
  {
    questionId: 'environmental_8.1',
    maxValue: 2,
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
    questionId: 'environmental_8.2',
    maxValue: 0,
    recommendation: {
      id: 'safe-design',
      icon: Factory,
      title: 'Adotar Design Seguro para Ciclo de Vida',
      points: '+350 XP',
      impact: 'Estratégico',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  },
  {
    questionId: 'environmental_8.3',
    maxValue: 0,
    recommendation: {
      id: 'circular-design',
      icon: Factory,
      title: 'Implementar Design para Circulação',
      points: '+400 XP',
      impact: 'Estratégico',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  },
  {
    questionId: 'environmental_8.4',
    maxValue: 2,
    recommendation: {
      id: 'reduce-toxic',
      icon: Factory,
      title: 'Reduzir Uso de Produtos Tóxicos',
      points: '+450 XP',
      impact: 'Crítico',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  },
  {
    questionId: 'environmental_8.5',
    maxValue: 0,
    recommendation: {
      id: 'transport-eco',
      icon: Factory,
      title: 'Adotar Tecnologias de Transporte Sustentável',
      points: '+300 XP',
      impact: 'Médio Impacto',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
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
        ? (answer === 'Sim' ? 5 : answer === 'Não' ? 0 : parseInt(answer) || 0)
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