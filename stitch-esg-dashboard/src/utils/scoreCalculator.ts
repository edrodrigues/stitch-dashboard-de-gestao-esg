import type { CompanyGoals, ESGDelta, ESGScore, ESGSubScores, Question } from '../types';

// Mapeamento de sub-scores agregados com pesos
export const subScoreMappings: Record<string, {
  questions: string[];
  weights: number[];
}> = {
  // Environmental
  emissoesCarbono: {
    questions: ['environmental_2.1', 'environmental_2.1A', 'environmental_2.1B'],
    weights: [0.6, 0.2, 0.2],
  },
  aguaEfluentes: {
    questions: ['environmental_3.1', 'environmental_3.1A', 'environmental_3.1B'],
    weights: [0.5, 0.25, 0.25],
  },
  energia: {
    questions: ['environmental_3.2', 'environmental_3.2A', 'environmental_3.2B', 'environmental_3.2C'],
    weights: [0.4, 0.2, 0.2, 0.2],
  },
  residuos: {
    questions: ['environmental_4.1', 'environmental_4.1A', 'environmental_4.1B', 'environmental_4.2'],
    weights: [0.4, 0.2, 0.2, 0.2],
  },
  pegadaAmbiental: {
    questions: ['environmental_5.1'],
    weights: [1.0],
  },

  // Social
  relacoesComunitarias: {
    questions: ['social_6.1'],
    weights: [1.0],
  },
  cadeiaFornecimento: {
    questions: ['social_7.1'],
    weights: [1.0],
  },
  direitosHumanos: {
    questions: ['social_8.1'],
    weights: [1.0],
  },
  praticasTrabalhistas: {
    questions: ['social_10.1', 'social_10.2', 'social_10.3', 'social_10.4'],
    weights: [0.4, 0.2, 0.2, 0.2],
  },
  saudeSeguranca: {
    questions: ['social_11.1', 'social_11.2', 'social_11.3', 'social_11.4'],
    weights: [0.25, 0.25, 0.25, 0.25],
  },
  diversidade: {
    questions: ['social_9.1', 'social_12.1', 'social_12.2', 'social_12.3',
                'social_12.4', 'social_12.5', 'social_12.6'],
    weights: [0.25, 0.15, 0.15, 0.15, 0.1, 0.1, 0.1],
  },

  // Governance
  culturaValores: {
    questions: ['governance_14.1'],
    weights: [1.0],
  },
  satisfacaoCliente: {
    questions: ['governance_15.1', 'governance_15.2', 'governance_15.3'],
    weights: [0.4, 0.3, 0.3],
  },
  qualidadeProduto: {
    questions: ['governance_16.1'],
    weights: [1.0],
  },
  rotulagem: {
    questions: ['governance_17.1'],
    weights: [1.0],
  },
  gestaoRiscos: {
    questions: ['governance_18.1', 'governance_18.2'],
    weights: [0.6, 0.4],
  },
  requisitosLegais: {
    questions: ['governance_19.1', 'governance_19.2'],
    weights: [0.5, 0.5],
  },
  etica: {
    questions: ['governance_20.1'],
    weights: [1.0],
  },
  transparencia: {
    questions: ['governance_20.2', 'governance_20.3'],
    weights: [0.5, 0.5],
  },
};

export const calculateESGScore = (
  formData: Record<string, number | string | (string | number)[]>,
  questions?: Question[]
): ESGScore => {
  let environmentalScore = 0;
  let socialScore = 0;
  let governanceScore = 0;

  let totalWeightE = 0;
  let totalWeightS = 0;
  let totalWeightG = 0;

  const formKeys = Object.keys(formData);

  formKeys.forEach(key => {
    const value = formData[key];
    const question = questions?.find(q => q.id === key);

    if (question && question.options) {
      const processOption = (val: number | string) => {
        const selectedOption = question.options?.find(opt => opt.value === val);
        if (selectedOption && selectedOption.points !== undefined) {
          const points = selectedOption.points;
          const weight = selectedOption.weight || 1;

          if (question.category === 'environmental') {
            environmentalScore += points * weight;
            totalWeightE += weight;
          } else if (question.category === 'social') {
            socialScore += points * weight;
            totalWeightS += weight;
          } else if (question.category === 'governance') {
            governanceScore += points * weight;
            totalWeightG += weight;
          }
        }
      };

      if (Array.isArray(value)) {
        value.forEach(val => processOption(val));
      } else {
        processOption(value);
      }
    } else if (typeof value === 'number') {
      // Fallback for cases where questions are not provided
      const maxScore = 5;
      const normalizedScore = (value / maxScore) * 100;

      if (key.includes('environmental') || key.startsWith('environmental')) {
        environmentalScore += normalizedScore;
        totalWeightE += 1;
      } else if (key.includes('social') || key.startsWith('social')) {
        socialScore += normalizedScore;
        totalWeightS += 1;
      } else if (key.includes('governance') || key.startsWith('governance')) {
        governanceScore += normalizedScore;
        totalWeightG += 1;
      }
    }
  });

  // Calculate percentages (0-100) based on total weights
  // Assuming max points is 5 per question as per common ESG diagnostic pattern
  const normalize = (score: number, totalWeight: number) => {
    if (totalWeight === 0) return 0;
    return Math.min(Math.round((score / (totalWeight * 5)) * 100), 100);
  };

  return {
    environmental: normalize(environmentalScore, totalWeightE),
    social: normalize(socialScore, totalWeightS),
    governance: normalize(governanceScore, totalWeightG),
  };
};

export const calculateESGSubScores = (
  formData: Record<string, number | string | (string | number)[]>,
  questions?: Question[]
): Partial<ESGSubScores> => {
  const subScores: Partial<ESGSubScores> = {};

  // Helper para obter score de uma questão específica (0-100)
  const getQuestionScore = (questionId: string): number | undefined => {
    const question = questions?.find(q => q.id === questionId);
    if (question && formData[questionId] !== undefined) {
      const value = formData[questionId];
      const option = question.options?.find(opt => opt.value === value);
      if (option?.points !== undefined) {
        return Math.round((option.points / 5) * 100);
      }
    }
    return undefined;
  };

  // Calcular sub-scores agregados baseados nos mapeamentos
  Object.entries(subScoreMappings).forEach(([subScoreKey, mapping]) => {
    let weightedSum = 0;
    let totalWeight = 0;

    mapping.questions.forEach((questionId, index) => {
      const score = getQuestionScore(questionId);
      const weight = mapping.weights[index];

      if (score !== undefined) {
        weightedSum += score * weight;
        totalWeight += weight;
      }
    });

    // Se pelo menos uma questão foi respondida, calcular a média ponderada
    if (totalWeight > 0) {
      subScores[subScoreKey as keyof ESGSubScores] = Math.round(weightedSum / totalWeight);
    }
  });

  return subScores;
};

export const calculateESGDelta = (
  currentScores: ESGScore,
  previousScores?: ESGScore
): ESGDelta => {
  if (!previousScores) {
    return {
      environmental: 0,
      social: 0,
      governance: 0,
    };
  }

  const calculateDelta = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    const delta = ((current - previous) / previous) * 100;
    return Math.round(delta * 10) / 10;
  };

  return {
    environmental: calculateDelta(currentScores.environmental, previousScores.environmental),
    social: calculateDelta(currentScores.social, previousScores.social),
    governance: calculateDelta(currentScores.governance, previousScores.governance),
  };
};

// Calcular delta para sub-scores
export const calculateSubScoresDelta = (
  currentSubScores: Partial<ESGSubScores>,
  previousSubScores?: Partial<ESGSubScores>
): Partial<Record<keyof ESGSubScores, number>> => {
  const delta: Partial<Record<keyof ESGSubScores, number>> = {};

  if (!previousSubScores) {
    return delta;
  }

  (Object.keys(currentSubScores) as Array<keyof ESGSubScores>).forEach(key => {
    const current = currentSubScores[key] || 0;
    const previous = previousSubScores[key] || 0;
    
    if (previous === 0) {
      delta[key] = 0;
    } else {
      delta[key] = Math.round(((current - previous) / previous) * 100 * 10) / 10;
    }
  });

  return delta;
};

export const calculateGoalsFromScores = (
  environmentalScore: number,
  socialScore: number,
  governanceScore: number
): CompanyGoals => {
  return {
    energia: Math.min(Math.round(environmentalScore * 0.9), 100),
    residuos: Math.min(Math.round(environmentalScore * 0.7), 100),
    diversidade: Math.min(Math.round(socialScore * 0.85), 100),
    etica: Math.min(Math.round(governanceScore * 0.95), 100),
  };
};

export const getGoalsDataForChart = (goals?: CompanyGoals) => {
  if (!goals) {
    return [
      { name: 'Energia', 'Atingido': 0 },
      { name: 'Resíduos', 'Atingido': 0 },
      { name: 'Diversid.', 'Atingido': 0 },
      { name: 'Ética', 'Atingido': 0 },
    ];
  }

  return [
    { name: 'Energia', 'Atingido': goals.energia },
    { name: 'Resíduos', 'Atingido': goals.residuos },
    { name: 'Diversid.', 'Atingido': goals.diversidade },
    { name: 'Ética', 'Atingido': goals.etica },
  ];
};

export const getDeltaType = (delta: number): 'increase' | 'moderateIncrease' | 'decrease' | 'moderateDecrease' | 'unchanged' => {
  if (delta > 5) return 'increase';
  if (delta > 0) return 'moderateIncrease';
  if (delta < -5) return 'decrease';
  if (delta < 0) return 'moderateDecrease';
  return 'unchanged';
};

export const formatDelta = (delta: number): string => {
  if (delta > 0) return `+${delta.toFixed(1)}%`;
  if (delta < 0) return `${delta.toFixed(1)}%`;
  return '0%';
};

// Função auxiliar para calcular o nível de maturidade baseado no score geral
export const getMaturityLevel = (overallScore: number): {
  level: 'iniciante' | 'desenvolvedor' | 'consolidador' | 'referencia';
  label: string;
  description: string;
} => {
  if (overallScore <= 25) {
    return {
      level: 'iniciante',
      label: 'Iniciante',
      description: 'Foco em compliance básico, inventários e políticas formais',
    };
  }
  if (overallScore <= 50) {
    return {
      level: 'desenvolvedor',
      label: 'Desenvolvedor',
      description: 'Foco em metas quantitativas, certificações e monitoramento avançado',
    };
  }
  if (overallScore <= 75) {
    return {
      level: 'consolidador',
      label: 'Consolidador',
      description: 'Foco em relatórios GRI, ISO 14001, auditorias e economia circular',
    };
  }
  return {
    level: 'referencia',
    label: 'Referência',
    description: 'Foco em inovação, liderança setorial e stakeholder engagement',
  };
};
