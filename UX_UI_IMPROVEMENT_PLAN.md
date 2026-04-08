# Plano de Melhoria UX/UI - Stitch Dashboard ESG

Este documento detalha a análise crítica e o plano de evolução da interface do **Stitch Dashboard de Gestão ESG**, focando na transição de um protótipo puramente gamificado para uma ferramenta profissional de gestão com elementos de engajamento (XP/Níveis).

---

## 🧐 Crítica Atual (Análise de Especialista)

### Pontos Fortes
- **Identidade Única:** Estética "Chunky" 2D bem definida e memorável.
- **Engajamento:** Ciclos de feedback de XP e bloqueio de trilhas por diagnóstico são eficazes.
- **Categorização Visual:** Uso consistente de cores para os pilares E (Esmeralda), S (Âmbar) e G (Azul).

### Pontos de Melhoria (Gargalos)
- **Fadiga Tipográfica:** Uso excessivo de `font-black` e `10px` dificultava a leitura prolongada.
- **Ruído Visual:** Bordas muito grossas (`8px`) e sombras saturadas competiam com os dados reais.
- **Hierarquia:** Títulos e rótulos secundários tinham o mesmo "peso" visual.

---

## 🎯 Perfil do Usuário Alvo
- **Primário:** Dono de Empresa / Gestor de Negócio.
- **Objetivo:** Tomada de decisão rápida, clareza de dados e progresso intuitivo.
- **Tom de Voz:** Profissional, mas motivador.

---

## 🚀 Cronograma de Implementação

### ✅ Fase 1: Refinamento de Legibilidade e Hierarquia (CONCLUÍDA)
*Foco: Reduzir a carga cognitiva e melhorar a leitura de dados.*
- [x] **Ajuste Tipográfico:** Aumento da base de labels de `10px` para `12px` (`text-xs`).
- [x] **Equilíbrio de Pesos:** Transição de `font-black` para `font-bold` em rótulos secundários e itens de navegação.
- [x] **Consistência de Case:** Uso de *Sentence case* em descrições e sub-rótulos para evitar o aspecto "gritante" do All-caps.
- [x] **Polimento "Chunky":** Redução da espessura de bordas inferiores e botões de `8px` para `4px` para um visual mais elegante.
- [x] **Refatoração de Componentes:** Atualização global em `DashboardPage`, `DiagnosticPage`, `Sidebar`, `Header`, `RecentMissions`, `HeroJourney` e `EvolutionChart`.

### ✅ Fase 2: Interatividade e Guia de Jornada (CONCLUÍDA)
*Foco: Melhorar o fluxo de entrada e o feedback visual de progresso.*
- [x] **Onboarding Tour:** Implementado overlay de "Primeira Missão" em `DashboardPage` com `OnboardingTour.tsx`.
- [x] **Micro-animações de Dados:** Adicionadas animações de preenchimento (`animate-fill`) e transições suaves em componentes visuais.
- [x] **Feedback de Conquista:** Adicionado efeito `success-pulse` em momentos chave como a conclusão do diagnóstico.
- [x] **Sidebar Responsiva:** Sidebar agora suporta modo "Rail" colapsável com estado persistente via `UIContext`.

### ✅ Fase 3: Visualização de Dados Avançada (CONCLUÍDA)
*Foco: Trazer insights profundos com a estética do projeto.*
- [x] **Customização de Tooltips:** Tooltips dos gráficos Tremor estilizados com bordas "Chunky" e design exclusivo em `DashboardPage` e `EvolutionChart`.
- [x] **Gamificação Comparativa:** Implementação de "Ghost Rankings" (Próximos Marcos) no Dashboard principal para estimular engajamento.
- [x] **Relatórios Visuais:** Atualização do serviço `pdfExport.ts` para refletir os novos pesos visuais e cores da fase profissional.

---

## 🛠️ Notas Técnicas
- **UIContext:** Centraliza o estado da interface (como o colapso da sidebar) para consistência entre layouts.
- **Onboarding:** Utiliza `localStorage` para garantir que o tour apareça apenas na primeira visita.
- **Animações:** Implementadas via CSS puro e Tailwind para performance superior em dispositivos móveis.

*Documento atualizado em: 8 de Abril de 2026*
