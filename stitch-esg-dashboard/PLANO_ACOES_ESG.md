# Plano de Ações ESG Dinâmico - Guia de Implementação

> **📅 Última atualização:** Abril 2026  
> **🎯 Status:** ✅ **TODAS AS FASES CONCLUÍDAS**

## Status de Implementação

| Fase | Item | Status | Data |
|---|---|---|---|
| **Fase 1** | #6 Persistir Sub-scores no Firestore | ✅ **CONCLUÍDO** | Abril 2026 |
| **Fase 1** | #5 Sub-scores Agregados | ✅ **CONCLUÍDO** | Abril 2026 |
| **Fase 1** | #3 Sistema de Priorização Inteligente | ✅ **CONCLUÍDO** | Abril 2026 |
| **Fase 2** | #1 Motor de Recomendações por Pilar | ✅ **CONCLUÍDO** | Abril 2026 |
| **Fase 2** | #7 Ações com Pré-requisitos | ✅ **CONCLUÍDO** | Abril 2026 |
| **Fase 3** | #2 Página de Plano de Ações | ✅ **CONCLUÍDO** | Abril 2026 |
| **Fase 3** | #8 Progresso com Checkpoints | ✅ **CONCLUÍDO** | Abril 2026 |
| **Fase 3** | #10 Dashboard de Progresso | ✅ **CONCLUÍDO** | Abril 2026 |
| **Deploy** | Build & Testes | ✅ **CONCLUÍDO** | Abril 2026 |

### ✅ O que foi implementado

#### Fase 1 - Fundação (Concluída)
1. **Sub-scores Agregados** (`src/utils/scoreCalculator.ts`)
   - Mapeamento de 19 sub-scores com pesos ponderados
   - Cálculo de médias ponderadas por subcategoria
   - Suporte a múltiplas questões por sub-score

2. **Persistência de Sub-scores** (`src/pages/DiagnosticPage.tsx`)
   - Salvamento automático no Firestore ao finalizar diagnóstico
   - Separação por pilar: `environmentalSubScores`, `socialSubScores`, `governanceSubScores`

3. **Motor de Priorização** (`src/utils/recommendationEngine.ts`)
   - Algoritmo de priorização baseado em gap, peso e impacto do setor
   - 7 perfis de setor configurados (indústria, agropecuária, comércio, TI, saúde, construção, transporte)
   - Sistema de maturidade ESG (iniciante, desenvolvedor, consolidador, referência)

#### Fase 2 - Motor de Recomendações (Concluída)
1. **53 Recomendações Detalhadas** criadas:
   - **Ambiental** (15): Emissões, Água, Energia, Resíduos, Pegada Ambiental
   - **Social** (20): Comunidade, Fornecedores, DH, Trabalhistas, Saúde, Diversidade
   - **Governança** (18): Cultura, Clientes, Qualidade, Riscos, Compliance, Ética, Transparência

2. **Estrutura Completa** em cada recomendação:
   - Passo-a-passo detalhado (3-5 passos)
   - KPIs mensuráveis
   - Regulamentações aplicáveis
   - Pré-requisitos e dependências
   - Estimativa de esforço e prazo

3. **Sistema Unificado** (`src/data/recommendations/index.ts`)
   - Exportação centralizada de todas as recomendações
   - Funções helpers para filtrar por pilar e categoria

#### Fase 3 - Interface do Plano de Ações (Concluída)
1. **ActionPlanPage** (`src/pages/ActionPlanPage.tsx`)
   - Página completa de Plano de Ações ESG
   - Visualização por 4 trimestres (Q1-Q4)
   - Distribuição automática de ações por prioridade
   - Filtros por pilar (Ambiental, Social, Governança)

2. **Progresso com Checkpoints**
   - Marcação de ações como: Não iniciada, Em progresso, Concluída
   - Checkboxes para cada passo da ação
   - Barra de progresso visual por ação
   - Persistência no Firestore

3. **Dashboard de Progresso**
   - Cards de estatísticas por pilar (E, S, G)
   - Progresso geral com gráfico circular
   - Contador de XP a ganhar
   - Visualização de ações concluídas/total

4. **Componentes UI Criados**
   - `Tabs.tsx` - Navegação por trimestres
   - `Progress.tsx` - Barras de progresso

5. **Navegação Integrada**
   - Link no Sidebar para "Plano de Ações"
   - Rota `/action-plan` configurada
   - Acesso protegido por autenticação

#### Build & Deploy
- ✅ TypeScript: Sem erros
- ✅ Build Vite: Sucesso (18.88s)
- ✅ Bundle otimizado e pronto para deploy
   - Exportação unificada de todas as recomendações
   - Funções helpers para filtrar por pilar e categoria

---

## Visão Geral

Este documento descreve as melhorias propostas para o sistema de recomendações do ESG Dashboard, transformando-o de um sistema estático e não utilizado em um **Motor de Plano de Ações Anual Dinâmico** que gera recomendações personalizadas baseadas nas respostas do questionário ESG.

---

## Problemas Atuais Identificados

| Área | Status | Problema Crítico |
|---|---|---|
| **Motor de Recomendações** | Implementado mas **não utilizado** | Não conectado a nenhuma UI; só cobre ambiental; modelo de threshold estático |
| **Cálculo de Scores** | Funcionando | Sem pesos diferenciais; questões binárias criam variação extrema; questões de formulário desperdiçadas |
| **Sub-scores** | Implementados mas **nunca persistidos** | `calculateESGSubScores` produz valores que nunca são salvos no Firestore; proxies de questão única |
| **Plano de Ações** | **Não existe** | Sem planos de ação personalizados; sem conexão entre recomendações e missões |
| **Recomendações nas Questões** | Definidas mas **nunca exibidas** | `QuestionOption.recommendation` existe nos dados mas nunca é renderizado para o usuário |
| **Dados de Carbono** | **Sintéticos** | `calculateCarbonTrend` usa `Math.random()`; dados históricos não são reais |
| **Comparação Histórica** | Mínima | Só armazena as últimas respostas; sem histórico por questão |

---

## Sugestões de Implementação

---

### 1. Motor de Recomendações por Pilar

**Prioridade:** 🔴 ALTA | **Esforço:** Médio

**Problema:** `environmentalRecommendations.ts` só cobre ambiental e nunca é importado por nenhum componente.

**Solução:** Criar `src/data/recommendations/` com 3 arquivos:
- `environmentalRecommendations.ts` (já existe, expandir)
- `socialRecommendations.ts` (novo)
- `governanceRecommendations.ts` (novo)

**Tipo de dados proposto:**

```typescript
interface ActionRecommendation {
  id: string;
  questionId: string;
  pillar: 'E' | 'S' | 'G';
  title: string;
  description: string;
  priority: 'critica' | 'alta' | 'media' | 'baixa';
  effort: 'baixo' | 'medio' | 'alto';
  estimatedTimeframe: string;        // "1-3 meses", "3-6 meses", "6-12 meses"
  triggersAt: number;                // resposta <= este valor ativa a recomendação
  category: string;                  // subcategoria (emissoesCarbono, agua, etc.)
  steps: ActionStep[];               // passo-a-passo
  kpis: string[];                    // como medir progresso
  relatedQuestions: string[];        // outras questões relacionadas
}

interface ActionStep {
  order: number;
  title: string;
  description: string;
  completed: boolean;
}
```

**Exemplo de recomendação para Emissões de Carbono:**

```typescript
{
  id: 'inventario-gee',
  questionId: 'environmental_2.1',
  pillar: 'E',
  title: 'Implementar Inventário de Gases de Efeito Estufa (GEE)',
  description: 'Realizar o inventário completo das emissões de GEE seguindo metodologia GHG Protocol...',
  priority: 'critica',
  effort: 'alto',
  estimatedTimeframe: '3-6 meses',
  triggersAt: 2,
  category: 'emissoesCarbono',
  steps: [
    { order: 1, title: 'Contratar consultoria especializada', description: 'Buscar empresa certificada para realizar o inventário', completed: false },
    { order: 2, title: 'Definir escopos 1, 2 e 3', description: 'Mapear todas as fontes de emissão diretas e indiretas', completed: false },
    { order: 3, title: 'Coletar dados de consumo', description: 'Levantar dados de energia, combustíveis, transporte', completed: false },
    { order: 4, title: 'Calcular e reportar', description: 'Gerar relatório com valores em Ton CO2e por escopo', completed: false },
  ],
  kpis: ['Ton CO2e Escopo 1', 'Ton CO2e Escopo 2', 'Ton CO2e Escopo 3', '% redução YoY'],
  relatedQuestions: ['environmental_2.1A', 'environmental_2.1B'],
}
```

---

### 2. Plano de Ações com Trimestres

**Prioridade:** 🔴 ALTA | **Esforço:** Alto

**Problema:** Não existe nenhuma página de plano de ação.

**Solução:** Criar página `ActionPlanPage.tsx` com rota `/action-plan` que gera um plano anual dividido em 4 trimestres:

| Trimestre | Foco | Critério de Seleção |
|---|---|---|
| **Q1** | Ações Críticas | Respostas com score 1-2 em questões de alto peso |
| **Q2** | Ações de Alto Impacto | Respostas com score 2-3 em questões prioritárias |
| **Q3** | Ações Estratégicas | Respostas com score 3-4 em questões complementares |
| **Q4** | Consolidação & Metas | Reavaliação + preparação para o próximo ciclo |

Cada ação incluirá:
- Título e descrição detalhada
- Passo-a-passo em markdown
- KPIs mensuráveis
- Prazo estimado
- Status (pendente, em progresso, concluída)
- Links para recursos externos (normas ISO, GRI, etc.)

**Estrutura visual proposta:**

```
┌─────────────────────────────────────────────────┐
│  📊 Plano de Ações ESG 2026                     │
│  Progresso: ████████░░░░ 65% (13 de 20 ações)    │
├─────────────────────────────────────────────────┤
│  Q1 - Ações Críticas     ██████████ 5/5 ✅      │
│  □ Inventário GEE                              │
│  □ Plano de Gerenciamento de Resíduos           │
│  □ Política de Direitos Humanos                 │
├─────────────────────────────────────────────────┤
│  Q2 - Alto Impacto       ██████░░░░ 3/5 🔄      │
│  ▶ Metas de Redução de Carbono (em progresso)  │
│  □ Monitoramento de Água                       │
│  □ Programa de Diversidade                     │
├─────────────────────────────────────────────────┤
│  Q3 - Estratégico        █░░░░░░░░░ 1/5 📋      │
│  □ Certificação ISO 14001                      │
│  □ Relatório GRI                               │
├─────────────────────────────────────────────────┤
│  Q4 - Consolidação       ░░░░░░░░░░ 0/5 📋      │
│  □ Reavaliação Anual                           │
│  □ Planejamento 2027                           │
└─────────────────────────────────────────────────┘
```

---

### 3. Sistema de Priorização Inteligente

**Prioridade:** 🔴 ALTA | **Esforço:** Médio

**Problema:** Sem priorização - recomendações são retornadas na ordem do array.

**Solução:** Algoritmo de priorização baseado em:

- **Gap Score** = (5 - resposta) × peso_da_questão × impacto_do_setor
- **Custo-Benefício** = ações de baixo esforço + alto impacto primeiro
- **Pré-requisitos** = ações que precisam ser feitas antes de outras

```typescript
const priorityScore = (answer: number, weight: number, sectorImpact: number) => {
  const gap = (5 - answer); // 0 = já excelente, 4 = precisa muito melhorar
  const urgency = gap >= 3 ? 2 : gap >= 2 ? 1.5 : 1;
  return gap * weight * sectorImpact * urgency;
};

// Ordenar recomendações por priority score
const sortedActions = recommendations
  .map(r => ({
    ...r,
    priorityScore: priorityScore(answers[r.questionId], r.weight, sectorImpact[r.category])
  }))
  .sort((a, b) => b.priorityScore - a.priorityScore);
```

**Exemplo de cálculo:**

| Questão | Resposta | Gap | Peso | Impacto Setor | Prioridade |
|---|---|---|---|---|---|
| environmental_2.1 (Carbono) | 1 | 4 | 1.0 | 1.5 | **6.0** (Crítica) |
| social_10.1 (Trabalhista) | 3 | 2 | 1.0 | 1.0 | **2.0** (Média) |
| governance_20.1 (Ética) | 4 | 1 | 1.0 | 1.0 | **1.0** (Baixa) |

---

### 4. Motor de Recomendações por Setor

**Prioridade:** 🟡 MÉDIA | **Esforço:** Alto

**Problema:** Recomendações são genéricas, não consideram o setor da empresa.

**Solução:** Criar `src/data/sectorRecommendations.ts` com perfis por setor:

```typescript
interface SectorProfile {
  key: string;
  name: string;
  priorityAreas: string[];      // subcategorias prioritárias
  specialActions: string[];     // ações específicas do setor
  regulations: string[];        // normas aplicáveis
  weightMultiplier: Record<string, number>; // peso extra por subcategoria
}

const sectorProfiles: Record<string, SectorProfile> = {
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
  // Adicionar mais setores conforme necessario...
};
```

**Uso:**
```typescript
const getRecommendationsForSector = (
  sector: string,
  answers: Record<string, number | string>
): ActionRecommendation[] => {
  const profile = sectorProfiles[sector] || sectorProfiles.comercio; // fallback
  const allRecommendations = getAllRecommendations(answers);
  
  // Boost priority for sector-relevant areas
  return allRecommendations.map(r => ({
    ...r,
    priorityScore: r.priorityScore * (profile.weightMultiplier[r.category] || 1),
  })).sort((a, b) => b.priorityScore - a.priorityScore);
};
```

---

### 5. Sub-scores Agregados (não por Questão Única)

**Prioridade:** 🔴 ALTA | **Esforço:** Baixo

**Problema:** Cada sub-score mapeia para apenas 1 questão (ex: `saudeSeguranca` = apenas `social_11.1`).

**Solução:** Agregar múltiplas questões por subcategoria com pesos:

```typescript
const subScoreMappings: Record<string, {
  questions: string[];
  weights: number[];
}> = {
  emissoesCarbono: {
    questions: ['environmental_2.1'],
    weights: [1.0],
  },
  aguaEfluentes: {
    questions: ['environmental_3.1', 'environmental_3.1A', 'environmental_3.1B'],
    weights: [0.5, 0.25, 0.25],
  },
  energia: {
    questions: ['environmental_3.2', 'environmental_3.2B', 'environmental_3.2C'],
    weights: [0.4, 0.3, 0.3],
  },
  residuos: {
    questions: ['environmental_4.1', 'environmental_4.2'],
    weights: [0.6, 0.4],
  },
  pegadaAmbiental: {
    questions: ['environmental_5.1'],
    weights: [1.0],
  },
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
    weights: [0.3, 0.3, 0.2, 0.2],
  },
  diversidade: {
    questions: ['social_9.1', 'social_12.1', 'social_12.2', 'social_12.3',
                'social_12.4', 'social_12.5', 'social_12.6'],
    weights: [0.2, 0.15, 0.15, 0.15, 0.1, 0.15, 0.1],
  },
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
```

---

### 6. Persistir Sub-scores e Recomendações

**Prioridade:** 🔴 ALTA | **Esforço:** Baixo

**Problema:** `calculateESGSubScores` existe mas nunca salva no Firestore.

**Solução:** No `finishDiagnostic`, salvar:

```typescript
const subScores = calculateESGSubScores(answers, questions);
const recommendations = generateActionPlan(answers, questions, companyData);

await updateDoc(companyRef, {
  environmentalSubScores: subScores.environmental,
  socialSubScores: subScores.social,
  governanceSubScores: subScores.governance,
  actionPlan: recommendations,    // NOVO CAMPO
  lastDiagnosticDate: serverTimestamp(),
});
```

**Estrutura do actionPlan no Firestore:**

```typescript
interface ActionPlan {
  id: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  trimesterActions: {
    Q1: ActionItem[];
    Q2: ActionItem[];
    Q3: ActionItem[];
    Q4: ActionItem[];
  };
  overallProgress: number;         // 0-100%
  maturityLevel: 'iniciante' | 'desenvolvedor' | 'consolidador' | 'referencia';
}

interface ActionItem {
  id: string;
  recommendationId: string;
  title: string;
  description: string;
  priority: 'critica' | 'alta' | 'media' | 'baixa';
  pillar: 'E' | 'S' | 'G';
  category: string;
  status: 'nao_iniciada' | 'em_progresso' | 'concluida';
  progress: number;               // 0-100%
  checkpoints: Checkpoint[];
  completedAt?: Date;
  estimatedTimeframe: string;
}

interface Checkpoint {
  title: string;
  completed: boolean;
  completedAt?: Date;
}
```

---

### 7. Ações com Pré-requisitos e Dependências

**Prioridade:** 🟡 MÉDIA | **Esforço:** Médio

**Problema:** Recomendações são independentes, sem ordem lógica.

**Solução:** Criar grafo de dependências:

```typescript
const actionDependencies: Record<string, {
  prereqs: string[];
  blocks: string[];
}> = {
  // Emissões de Carbono
  'inventario-gee': {
    prereqs: [],
    blocks: ['metas-reducao-gee', 'compensacao-carbono'],
  },
  'metas-reducao-gee': {
    prereqs: ['inventario-gee'],
    blocks: ['reporte-gee'],
  },
  'compensacao-carbono': {
    prereqs: ['inventario-gee'],
    blocks: [],
  },
  'reporte-gee': {
    prereqs: ['metas-reducao-gee'],
    blocks: [],
  },

  // Água
  'monitoramento-agua': {
    prereqs: [],
    blocks: ['meta-reducao-agua', 'estacao-tratamento'],
  },
  'meta-reducao-agua': {
    prereqs: ['monitoramento-agua'],
    blocks: [],
  },
  'estacao-tratamento': {
    prereqs: ['monitoramento-agua'],
    blocks: [],
  },

  // Energia
  'monitoramento-energia': {
    prereqs: [],
    blocks: ['fontes-renovaveis', 'meta-reducao-energia'],
  },
  'fontes-renovaveis': {
    prereqs: ['monitoramento-energia'],
    blocks: [],
  },
  'meta-reducao-energia': {
    prereqs: ['monitoramento-energia'],
    blocks: [],
  },

  // Resíduos
  'plano-gerenciamento-residuos': {
    prereqs: [],
    blocks: ['logistica-reversa', 'economia-circular'],
  },
  'logistica-reversa': {
    prereqs: ['plano-gerenciamento-residuos'],
    blocks: [],
  },
  'economia-circular': {
    prereqs: ['plano-gerenciamento-residuos'],
    blocks: [],
  },

  // ISO 14001
  'sga-basico': {
    prereqs: [],
    blocks: ['politica-ambiental', 'certificacao-iso14001'],
  },
  'politica-ambiental': {
    prereqs: ['sga-basico'],
    blocks: ['certificacao-iso14001'],
  },
  'certificacao-iso14001': {
    prereqs: ['politica-ambiental', 'inventario-gee', 'monitoramento-agua', 'plano-gerenciamento-residuos'],
    blocks: [],
  },

  // Social - Direitos Humanos
  'politica-direitos-humanos': {
    prereqs: [],
    blocks: ['clausulas-contratuais-dh', 'programa-dh'],
  },
  'clausulas-contratuais-dh': {
    prereqs: ['politica-direitos-humanos'],
    blocks: ['programa-dh'],
  },
  'programa-dh': {
    prereqs: ['clausulas-contratuais-dh'],
    blocks: [],
  },

  // Governance - Riscos
  'matriz-materialidade': {
    prereqs: [],
    blocks: ['gestao-riscos-esg', 'relatorio-sustentabilidade'],
  },
  'gestao-riscos-esg': {
    prereqs: ['matriz-materialidade'],
    blocks: [],
  },
  'relatorio-sustentabilidade': {
    prereqs: ['matriz-materialidade', 'inventario-gee', 'monitoramento-agua'],
    blocks: [],
  },
};
```

O plano anual renderizaria as ações em ordem topológica, garantindo que pré-requisitos sejam cumpridos primeiro.

---

### 8. Progresso de Ações com Checkpoints

**Prioridade:** 🟡 MÉDIA | **Esforço:** Alto

**Problema:** Missions são genéricas, sem conexão com o diagnóstico.

**Solução:** Transformar recomendações em "Ações" com progresso mensurável:

```typescript
interface ActionItem {
  id: string;
  title: string;
  description: string;
  status: 'nao_iniciada' | 'em_progresso' | 'concluida';
  priority: 'critica' | 'alta' | 'media' | 'baixa';
  trimester: 1 | 2 | 3 | 4;
  progress: number;        // 0-100%
  checkpoints: Checkpoint[];
  evidence?: string[];     // links, fotos, documentos
  completedAt?: Date;
}

interface Checkpoint {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
}
```

**Visualização proposta:**

```
┌──────────────────────────────────────────────────┐
│  ✅ Inventário de GEE                             │
│  Progresso: ████████████████████ 100%            │
│  ✅ Contratar consultoria especializada          │
│  ✅ Definir escopos 1, 2 e 3                     │
│  ✅ Coletar dados de consumo                      │
│  ✅ Calcular e reportar                           │
├──────────────────────────────────────────────────┤
│  🔄 Metas de Redução de Carbono                  │
│  Progresso: ████████░░░░░░░░ 50%                 │
│  ✅ Definir baseline de emissões                  │
│  ✅ Estabelecer meta de redução (ex: -20% até 2028)│
│  □ Implementar programa de eficiência energética  │
│  □ Reportar progresso trimestralmente             │
├──────────────────────────────────────────────────┤
│  📋 Certificação ISO 14001                       │
│  Progresso: ██░░░░░░░░░░░░░░ 10%                 │
│  ✅ Realizar diagnóstico inicial                  │
│  □ Implementar SGA conforme ISO 14001            │
│  □ Auditoria interna                              │
│  □ Auditoria externa e certificação               │
└──────────────────────────────────────────────────┘
```

---

### 9. Evolução e Reavaliação

**Prioridade:** 🟡 MÉDIA | **Esforço:** Médio

**Problema:** Cada diagnóstico sobrescreve o anterior, sem histórico.

**Solução:** Criar comportamento de histórico:

```typescript
// Ao completar um diagnóstico
await addDoc(collection(db, 'diagnosticHistory'), {
  companyId,
  completedAt: serverTimestamp(),
  esgScores: currentScores,
  subScores: currentSubScores,
  answers: allAnswers,
  actionPlanId: currentActionPlanId,
  delta: calculateESGDelta(previousScores, currentScores),
});

// Na empresa, manter array de evolução
await updateDoc(companyRef, {
  evolutionData: arrayUnion({
    date: new Date().toISOString(),
    environmental: scores.environmental,
    social: scores.social,
    governance: scores.governance,
    overall: overallScore,
    subScores: {
      environmental: subScores.environmental,
      social: subScores.social,
      governance: subScores.governance,
    },
  }),
});
```

**Funcionalidades propostas:**
- Visualização de "o que mudou" entre diagnósticos
- Gráfico de evolução por subcategoria ao longo do tempo
- Sugestão automática de reavaliação trimestral
- Botão "Reavaliar agora" com questionário pré-preenchido
- Notificação quando 3+ meses se passaram desde o último diagnóstico

---

### 10. Dashboard de Progresso do Plano de Ações

**Prioridade:** 🟡 MÉDIA | **Esforço:** Médio

**Solução:** Criar componente `ActionPlanProgress` que mostra:

- **Barra de progresso global** (X de Y ações concluídas)
- **Progresso por trimestre** (Q1: 3/5, Q2: 1/4, etc.)
- **Progresso por pilar ESG** (E: 60%, S: 40%, G: 30%)
- **Destaques:**
  - "Parabéns! Você completou todas as ações críticas"
  - "Atenção: 2 ações críticas estão atrasadas"
- **XP e Gamificação:** Ganhar XP por checkpoint concluído, badges por trimestre completo

**Componente proposto:**

```typescript
interface ActionPlanProgressProps {
  actionPlan: ActionPlan;
  esgScores: { environmental: number; social: number; governance: number };
  subScores: ESGSubScores;
}

const ActionPlanProgress: React.FC<ActionPlanProgressProps> = ({
  actionPlan,
  esgScores,
  subScores,
}) => {
  // Calcular progresso geral
  const totalActions = Object.values(actionPlan.trimesterActions).flat().length;
  const completedActions = Object.values(actionPlan.trimesterActions)
    .flat()
    .filter(a => a.status === 'concluida').length;
  const overallProgress = (completedActions / totalActions) * 100;

  // Calcular progresso por pilar
  const pillarProgress = {
    E: calculatePillarProgress(actionPlan, 'E'),
    S: calculatePillarProgress(actionPlan, 'S'),
    G: calculatePillarProgress(actionPlan, 'G'),
  };

  return (
    <div>
      <ProgressOverview progress={overallProgress} total={totalActions} completed={completedActions} />
      <TrimesterProgress trimesterActions={actionPlan.trimesterActions} />
      <PillarProgress pillars={pillarProgress} scores={esgScores} />
      <Highlights actions={actionPlan} />
      <GamificationBadges actionPlan={actionPlan} />
    </div>
  );
};
```

---

### 11. Recomendações Contextuais Baseadas em Tamanho

**Prioridade:** 🟢 BAIXA | **Esforço:** Médio

**Problema:** Recomendações não consideram porte da empresa.

**Solução:** Ajustar complexidade das ações baseado em `form_1.3` (tamanho/porte):

| Porte | Foco | Exemplo de Ação |
|---|---|---|
| **Microempresa** | Compliance básico | "Monitorar consumo de energia nas contas de eletricidade" |
| **Empresa de pequeno porte** | Introdução a SGA | "Implementar monitoramento básico de indicadores ambientais" |
| **Empresa de médio porte** | Metas quantitativas | "Estabelecer metas de redução de consumo de energia em 15% ao ano" |
| **Empresa de grande porte** | Certificações e GRI | "Buscar certificação ISO 14001 e iniciar reporte GRI" |
| **Multinacional** | Liderança setorial | "Publicar relatório de sustentabilidade integrado com GRI Standards" |

**Implementação:**

```typescript
const adjustRecommendationsForSize = (
  actions: ActionRecommendation[],
  companySize: string
): ActionRecommendation[] => {
  const sizeComplexity: Record<string, number> = {
    microempresa: 1,
    pequeno_porte: 2,
    medio_porte: 3,
    grande_porte: 4,
    multinacional: 5,
    ong: 2,
    outros: 2,
  };

  const level = sizeComplexity[companySize] || 2;

  return actions.map(action => ({
    ...action,
    title: adjustTitleForLevel(action.title, level),
    description: adjustDescriptionForLevel(action.description, level),
    steps: adjustStepsForLevel(action.steps, level),
  }));
};
```

---

### 12. Templates de Planos por Maturidade ESG

**Prioridade:** 🟢 BAIXA | **Esforço:** Médio

**Baseado no score ESG total:**

| Maturidade | Score | Foco do Plano | Ações Típicas |
|---|---|---|---|
| **Iniciante** | 0-25% | Compliance básico | Inventários, políticas formais, monitoramento básico |
| **Desenvolvedor** | 26-50% | Metas quantitativas | Metas de redução, certificações, monitoramento avançado |
| **Consolidador** | 51-75% | Reporte e terceira parte | GRI, ISO 14001, auditorias, economia circular |
| **Referência** | 76-100% | Inovação e liderança | Inovação, liderança setorial, stakeholder engagement |

**Implementação:**

```typescript
const getMaturityLevel = (overallScore: number): MaturityLevel => {
  if (overallScore <= 25) return 'iniciante';
  if (overallScore <= 50) return 'desenvolvedor';
  if (overallScore <= 75) return 'consolidador';
  return 'referencia';
};

const getMaturityTemplate = (level: MaturityLevel): ActionPlanTemplate => {
  switch (level) {
    case 'iniciante':
      return {
        focus: 'Compliance Básico',
        description: 'Foco em criar os fundamentos ESG da organização',
        actions: [
          'Realizar diagnóstico ESG completo',
          'Criar política ambiental formal',
          'Implementar monitoramento básico de água e energia',
          'Estabelecer política de direitos humanos',
          'Criar manual do funcionário',
        ],
        estimatedTime: '6-12 meses',
      };
    case 'desenvolvedor':
      return {
        focus: 'Metas Quantitativas',
        description: 'Foco em estabelecer metas mensuráveis e programas estruturados',
        actions: [
          'Estabelecer inventário de GEE',
          'Definir metas de redução de emissões',
          'Implementar sistema de gestão ambiental',
          'Criar programa de diversidade e inclusão',
          'Iniciar relatório de sustentabilidade',
        ],
        estimatedTime: '12-18 meses',
      };
    // ... etc
  }
};
```

---

### 13. Exportação do Plano

**Prioridade:** 🟢 BAIXA | **Esforço:** Médio

**Solução:** Permitir exportar o plano como:

- **PDF** formatado (com branding da empresa e logo ESG)
- **Excel/CSV** para acompanhamento em planilha
- **Email** com resumo trimestral automático

**Implementação sugerida:**

```typescript
// PDF export usando html2canvas + jsPDF (já importados no projeto)
const exportActionPlanToPDF = async (actionPlan: ActionPlan) => {
  const element = document.getElementById('action-plan-content');
  if (!element) return;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(`plano-acoes-esg-${new Date().getFullYear()}.pdf`);
};

// CSV export
const exportActionPlanToCSV = (actionPlan: ActionPlan) => {
  const headers = ['Trimestre', 'Pilar', 'Prioridade', 'Ação', 'Status', 'Progresso', 'Prazo'];
  const rows = Object.entries(actionPlan.trimesterActions).flatMap(([quarter, actions]) =>
    actions.map(a => [
      `Q${quarter}`,
      a.pillar,
      a.priority,
      a.title,
      a.status,
      `${a.progress}%`,
      a.estimatedTimeframe,
    ])
  );
  
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  // download blob
};
```

---

### 14. Notificações e Lembretes

**Prioridade:** 🟢 BAIXA | **Esforço:** Alto

**Solução:** Sistema de lembretes:

- **Email semanal** com "Ação da semana" baseada no plano atual
- **Notificação push** quando um prazo está próximo
- **Alerta mensal** de progresso
- **Lembrete de reavaliação** trimestral

**Implementação com Firebase Cloud Functions:**

```typescript
// Como usar Cloud Functions existentes no projeto
export const weeklyActionReminder = functions.pubsub
  .schedule('every monday 09:00')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    const companies = await getDocs(collection(db, 'companies'));
    
    for (const company of companies.docs) {
      const actionPlan = company.data().actionPlan;
      if (!actionPlan) continue;
      
      const nextAction = getNextIncompleteAction(actionPlan);
      if (!nextAction) continue;
      
      await sendEmail({
        to: company.data().email,
        subject: `📋 Ação da Semana: ${nextAction.title}`,
        template: 'weekly-action-reminder',
        data: { action: nextAction, companyName: company.data().name },
      });
    }
  });
```

---

## Resumo de Prioridades

| # | Sugestão | Prioridade | Esforço | Impacto |
|---|---|---|---|---|
| 1 | Motor de Recomendações por Pilar | 🔴 ALTA | Médio | Alto |
| 2 | Plano de Ações com Trimestres | 🔴 ALTA | Alto | Muito Alto |
| 3 | Sistema de Priorização Inteligente | 🔴 ALTA | Médio | Alto |
| 5 | Sub-scores Agregados | 🔴 ALTA | Baixo | Médio |
| 6 | Persistir Sub-scores e Recomendações | 🔴 ALTA | Baixo | Alto |
| 7 | Ações com Pré-requisitos | 🟡 MÉDIA | Médio | Médio |
| 8 | Progresso com Checkpoints | 🟡 MÉDIA | Alto | Alto |
| 9 | Evolução e Reavaliação | 🟡 MÉDIA | Médio | Médio |
| 10 | Dashboard de Progresso | 🟡 MÉDIA | Médio | Alto |
| 4 | Motor por Setor | 🟡 MÉDIA | Alto | Médio |
| 11 | Recomendações por Tamanho | 🟢 BAIXA | Médio | Baixo |
| 12 | Templates por Maturidade | 🟢 BAIXA | Médio | Médio |
| 13 | Exportação do Plano | 🟢 BAIXA | Médio | Baixo |
| 14 | Notificações e Lembretes | 🟢 BAIXA | Alto | Médio |

---

## Ordem Sugerida de Implementação

### Fase 1 - Fundação (1-2 semanas)
1. **#6 Persistir Sub-scores** - Base para tudo funcionar
2. **#5 Sub-scores Agregados** - Melhorar cálculo de scores
3. **#3 Sistema de Priorização** - Motor de ordenação

### Fase 2 - Motor (2-3 semanas)
4. **#1 Motor de Recomendações por Pilar** - 3 arquivos de recomendações
5. **#7 Ações com Pré-requisitos** - Grafo de dependências

### Fase 3 - UI (2-3 semanas)
6. **#2 Plano de Ações com Trimestres** - Página principal
7. **#8 Progresso com Checkpoints** - Interação do usuário
8. **#10 Dashboard de Progresso** - Visualização

### Fase 4 - Aprimoramentos (1-2 semanas)
9. **#4 Motor por Setor** - Personalização
10. **#9 Evolução e Reavaliação** - Histórico

### Fase 5 - Extras (conforme demanda)
11. **#11 Recomendações por Tamanho**
12. **#12 Templates por Maturidade**
13. **#13 Exportação do Plano**
14. **#14 Notificações e Lembretes**

---

*Documento gerado em Abril 2026 como parte do projeto ESG Dashboard - GUIA ESG 2026*