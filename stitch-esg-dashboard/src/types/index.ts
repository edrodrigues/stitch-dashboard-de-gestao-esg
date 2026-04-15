export interface QuestionOption {
  label: string;
  value: number | string;
  points?: number;
  weight?: number;
  message?: string;
  recommendation?: string;
}

export interface Question {
  id: string;
  category: string;
  subcategory?: string;
  text: string;
  description?: string;
  options?: QuestionOption[];
  inputType?: 'text' | 'number' | 'date' | 'select' | 'radio' | 'checkbox';
  dependsOn?: {
    questionId: string;
    value: string | number;
  };
}

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

export interface ESGSubScores {
  // Environmental
  emissoesCarbono: number;     // Carbon emissions (new)
  aguaEfluentes: number;       // Water & effluents
  energia: number;             // Energy management
  residuos: number;            // Waste management
  pegadaAmbiental: number;     // Product/service environmental footprint (new)

  // Social
  relacoesComunitarias: number;    // Community relations (new)
  cadeiaFornecimento: number;      // Supply chain management (new)
  direitosHumanos: number;         // Human rights
  praticasTrabalhistas: number;    // Labor practices
  saudeSeguranca: number;          // Health & safety
  diversidade: number;             // Diversity & inclusion

  // Governance
  culturaValores: number;          // Culture & values
  satisfacaoCliente: number;       // Customer satisfaction (new)
  qualidadeProduto: number;        // Product quality (new)
  rotulagem: number;               // Labeling & practices (new)
  gestaoRiscos: number;            // Risk management
  requisitosLegais: number;        // Legal requirements (new)
  etica: number;                   // Ethics
  transparencia: number;           // Transparency
}

export interface EvolutionDataPoint {
  month: string;
  year: number;
  environmental: number;
  social: number;
  governance: number;
  average: number;
}

export interface CompanyGoals {
  energia: number;
  residuos: number;
  diversidade: number;
  etica: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    weeklyReport: boolean;
    missionUpdates: boolean;
    scoreChanges: boolean;
  };
  language: string;
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
  environmentalSubScores?: Partial<ESGSubScores>;
  socialSubScores?: Partial<ESGSubScores>;
  governanceSubScores?: Partial<ESGSubScores>;
  evolutionData?: EvolutionDataPoint[];
  lastEnvironmentalUpdate?: Date;
  lastSocialUpdate?: Date;
  lastGovernanceUpdate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
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
export type DiagnosticResponses = Record<string, number | string | (number | string)[]>;
