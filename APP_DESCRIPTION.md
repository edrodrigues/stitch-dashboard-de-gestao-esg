# Stitch Dashboard de Gestão ESG (Guia ESG Brasil)

## Visão Geral
O **Stitch Dashboard de Gestão ESG** (também referido como **Guia ESG Brasil**) é uma plataforma gamificada projetada para democratizar a sustentabilidade corporativa. O aplicativo transforma a complexidade das métricas ESG (Ambiental, Social e Governança) em uma jornada de progresso visual, incentivando empresas a medir, gerenciar e melhorar seu impacto socioambiental por meio de elementos de jogos (XP, Níveis, Rankings e Missões).

## Telas Principais

### 1. Painel de Controle (Dashboard)
*   **Resumo de Scores:** Visualização clara dos índices nos três pilares (E, S e G).
*   **Evolução da Jornada:** Gráfico de linha mostrando o progresso da maturidade ao longo do tempo.
*   **Nível de Recursos:** Gráficos de barra comparando o desempenho atual com as metas estabelecidas.
*   **Missões Recentes:** Tabela de indicadores em curso, com status, líderes e prazos.
*   **Comandos Rápidos:** Atalhos para novos lançamentos de dados, envio de relatórios e sincronização de APIs.

### 2. Diagnóstico de Maturidade ESG
*   **Questionário Interativo:** Interface dividida pelos pilares Ambiental, Social e Governança.
*   **Progresso da Missão:** Barra de progresso indicando quantos desafios de diagnóstico foram concluídos.
*   **Dicas de Mestre:** Insights contextuais baseados nas respostas para educar o usuário.
*   **Prévia de Resultados:** Exibição em tempo real de pontos fortes, desafios e recomendações baseadas no diagnóstico parcial.

### 3. Jornada do Herói (Step Indicator)
*   **Progressão de Níveis:** Representação visual do crescimento da empresa (Nível 1: Elementar até Nível 5: Transformador).
*   **Quests Atuais:** Indicação clara da "missão" atual que a empresa precisa completar para subir de nível.
*   **Recompensas da Temporada:** Sistema de conquistas e selos (ex: "Green Leader Badge").

### 4. Ranking de Mestres (Leaderboard)
*   **Classificação Global/Setorial:** Comparação do desempenho da empresa com outras do mesmo setor ou região.
*   **Pódio de Líderes:** Visualização destacada para os Top 3 (Masters Regenerativos).
*   **Status de XP:** Exibição da experiência acumulada e distância para o próximo nível de maturidade.

### 5. Relatórios de Impacto Visual
*   **Visualização de Dados:** Infográficos e gráficos avançados para exportação.
*   **Sincronização de Padrões:** Alinhamento com frameworks internacionais (GRI, SASB, TCFD).

## Funcionalidades Gamificadas
*   **Sistema de XP (Experiência):** Ganho de pontos por reportar dados, completar diagnósticos e atingir metas.
*   **Níveis de Maturidade:** Cinco níveis que categorizam a empresa desde a conformidade básica até a liderança regenerativa.
*   **Missões e Desafios:** Tarefas acionáveis (ex: "Inventário de Carbono", "Mapa de Stakeholders") que guiam a implementação do ESG.
*   **Badges e Conquistas:** Selos digitais que podem ser compartilhados ou exibidos no perfil da empresa.

## Design System

### 1. Cores (Paleta de Cores)
A paleta de cores é moderna, com tons de verde que remetem à sustentabilidade e cores vibrantes para gamificação.
*   **Primária (ESG Green/Teal):** `#17cf54` (Verde Vibrante), `#2ec4b6` (Verde Água/Teal), `#20b2aa` (Teal Suave).
*   **Secundária (Destaque):** `#ff7f50` (Coral/Laranja) – usada para alertas e pontos de atenção.
*   **Neutros (Claro):** `#f0fdfa` (Fundo), `#ffffff` (Cards/Branco).
*   **Neutros (Escuro):** `#0d1b1e` (Fundo Dark Mode), `#112116` (Navegação Dark).
*   **Cores de Status:**
    *   Ambiental (E): `#10b981` (Emerald).
    *   Social (S): `#f59e0b` (Amber/Amarelo).
    *   Governança (G): `#3b82f6` (Blue/Azul).

### 2. Tipografia
O sistema utiliza uma tipografia limpa e profissional, focada na legibilidade de dados complexos.
*   **Fonte Principal:** `Inter` (Sans-serif).
*   **Hierarquia:**
    *   **Títulos:** Font weights de 700 (Bold) a 900 (Black) para impacto visual.
    *   **Corpo:** Font weight 400 (Regular) a 500 (Medium) para legibilidade.
    *   **Labels Gamificadas:** Uso de `uppercase` e `tracking-wider` para rótulos de nível e status.

### 3. Iconografia
*   **Biblioteca:** `Google Material Symbols Outlined`.
*   **Uso:** Ícones encapsulados em formas geométricas (círculos ou quadrados arredondados) com fundos em baixa opacidade (Ex: `bg-primary/10`).

### 4. Elementos de Interface (UI)
*   **Bordas e Arredondamento:**
    *   `border-radius`: `0.75rem` (Padrão), `1.25rem` (Largo), `full` (Botões Pílula).
    *   Estilo "Chunky": Bordas de 4px na parte inferior e direita (`border-b-4 border-r-4`) em componentes de gamificação para criar um efeito de profundidade 2D.
*   **Efeitos Visuais:**
    *   `backdrop-blur-md`: Usado em headers e menus flutuantes.
    *   `shadow-primary/20`: Sombras coloridas para destacar elementos ativos de progresso.
*   **Micro-interações:**
    *   `hover:translate-y-[-2px]`: Feedback tátil em botões.
    *   `animate-bounce`: Usado para indicar "Você está aqui" na jornada.
    *   `animate-pulse`: Para indicadores de sistema online ou missões críticas.

## Tecnologias Utilizadas (Protótipo)
*   **Styling:** Tailwind CSS (Moderno, Responsivo, Suporte a Dark Mode).
*   **Iconografia:** Google Material Symbols.
*   **Tipografia:** Inter (Google Fonts).
