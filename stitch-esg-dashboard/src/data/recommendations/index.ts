// Export all recommendation types and data
export type { 
  EnvironmentalRecommendation, 
  ActionStep as EnvironmentalActionStep 
} from './environmentalRecommendations';
export type { 
  SocialRecommendation, 
  ActionStep as SocialActionStep 
} from './socialRecommendations';
export type { 
  GovernanceRecommendation, 
  ActionStep as GovernanceActionStep 
} from './governanceRecommendations';

import { 
  getEnvironmentalRecommendations 
} from './environmentalRecommendations';
import { 
  getSocialRecommendations 
} from './socialRecommendations';
import { 
  getGovernanceRecommendations 
} from './governanceRecommendations';

export { 
  environmentalRecommendations, 
  getEnvironmentalRecommendations,
  getRecommendationsByCategory as getEnvironmentalRecommendationsByCategory
} from './environmentalRecommendations';

export { 
  socialRecommendations, 
  getSocialRecommendations,
  getRecommendationsByCategory as getSocialRecommendationsByCategory
} from './socialRecommendations';

export { 
  governanceRecommendations, 
  getGovernanceRecommendations,
  getRecommendationsByCategory as getGovernanceRecommendationsByCategory
} from './governanceRecommendations';

// Unified recommendation interface
export interface UnifiedRecommendation {
  id: string;
  questionId: string;
  pillar: 'E' | 'S' | 'G';
  category: string;
  title: string;
  description: string;
  priority: 'critica' | 'alta' | 'media' | 'baixa';
  effort: 'baixo' | 'medio' | 'alto';
  estimatedTimeframe: string;
  triggersAt: number;
  xpReward: number;
  steps: Array<{
    order: number;
    title: string;
    description: string;
  }>;
  kpis: string[];
  relatedQuestions: string[];
  regulations?: string[];
  prerequisites?: string[];
}

// Function to get all recommendations unified
export const getAllRecommendations = (
  answers: Record<string, number | string | (string | number)[]>,
  maxRecommendations: number = 20
): UnifiedRecommendation[] => {
  const environmentalRecs = getEnvironmentalRecommendations(answers, 100).map(r => ({ 
    ...r, 
    pillar: 'E' as const 
  }));
  
  const socialRecs = getSocialRecommendations(answers, 100).map(r => ({ 
    ...r, 
    pillar: 'S' as const 
  }));
  
  const governanceRecs = getGovernanceRecommendations(answers, 100).map(r => ({ 
    ...r, 
    pillar: 'G' as const 
  }));

  const all: UnifiedRecommendation[] = [...environmentalRecs, ...socialRecs, ...governanceRecs];
  
  // Sort by priority
  const priorityOrder: Record<string, number> = { critica: 0, alta: 1, media: 2, baixa: 3 };
  return all
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, maxRecommendations);
};

// Export function to get recommendations by pillar
export const getRecommendationsByPillar = (
  pillar: 'E' | 'S' | 'G',
  answers: Record<string, number | string | (string | number)[]>,
  maxRecommendations: number = 10
): UnifiedRecommendation[] => {
  const all = getAllRecommendations(answers, 100);
  return all
    .filter(r => r.pillar === pillar)
    .slice(0, maxRecommendations);
};
