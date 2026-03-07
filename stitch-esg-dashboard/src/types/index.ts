export interface ESGScore {
  environmental: number;
  social: number;
  governance: number;
}

export interface ESGDelta {
  environmental: number;
  social: number;
  governance: number;
}

export interface CompanyGoals {
  energia: number;
  residuos: number;
  diversidade: number;
  etica: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  region: string;
  currentXP: number;
  lastXP?: number;
  level: number;
  esgScores: ESGScore;
  esgDelta?: ESGDelta;
  goals?: CompanyGoals;
  evolutionData?: { month: string; score: number }[];
  lastEnvironmentalUpdate?: Date;
  lastSocialUpdate?: Date;
  lastGovernanceUpdate?: Date;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  companyId: string;
  role: string;
  avatarUrl: string;
}

export interface Mission {
  id: string;
  companyId: string;
  title: string;
  status: 'concluido' | 'em_curso' | 'pendente';
  leader: string;
  deadline: string;
  type: 'E' | 'S' | 'G';
}
