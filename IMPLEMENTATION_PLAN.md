# Plano de Implementação: React + Firebase

Este documento detalha o plano passo a passo para transformar os protótipos estáticos em uma aplicação funcional completa.

## 1. Configuração do Ambiente e Boilerplate
*   **Inicializar Projeto React:** `npx create-react-app stitch-esg-dashboard --template typescript` (ou Vite).
*   **Instalar Tailwind CSS:** Seguir o guia oficial para React para integrar o CSS que já está sendo usado nos protótipos.
*   **Configurar Firebase:**
    *   Criar projeto no Firebase Console.
    *   Habilitar **Authentication** (Email/Password, Google).
    *   Habilitar **Cloud Firestore** (Banco de dados NoSQL).
    *   Habilitar **Storage** (Para upload de relatórios e fotos de perfil).
    *   Configurar o SDK do Firebase no projeto (`firebase/app`, `firebase/auth`, `firebase/firestore`).

## 2. Estrutura de Dados (Firestore)
*   **Coleção `users`:** `{ uid, name, email, companyId, role, avatarUrl }`
*   **Coleção `companies`:** `{ id, name, industry, region, currentXP, level, esgScores: { environmental, social, governance } }`
*   **Coleção `diagnostics`:** `{ id, companyId, responses: { q1: answer, ... }, completed: boolean, lastUpdated }`
*   **Coleção `missions`:** `{ id, companyId, title, status, leader, deadline, type: 'E'|'S'|'G' }`
*   **Coleção `ranking`:** (Pode ser uma query agregada ou uma coleção dedicada para cache de performance).

## 3. Desenvolvimento dos Componentes Base (UI Kit)
*   Extrair componentes reutilizáveis dos arquivos HTML:
    *   `Sidebar`: Navegação lateral fixa.
    *   `Header`: Barra superior com busca e perfil.
    *   `Card`: Container padrão para métricas.
    *   `Button`: Estilos primário, secundário e gamificado.
    *   `Badge`: Indicadores de nível e conquistas.

## 4. Implementação das Telas (Iterativo)

### Fase 1: Autenticação e Perfil
*   Criar telas de Login e Registro.
*   Implementar persistência de sessão com `Firebase Auth`.
*   Tela de Perfil da Empresa (dados básicos).

### Fase 2: Dashboard Principal
*   Implementar os cards de score (E, S, G) consumindo dados do Firestore.
*   Integrar biblioteca de gráficos (Ex: `Recharts` ou `Chart.js`) para a "Evolução da Jornada".
*   Listagem dinâmica de Missões Recentes.

### Fase 3: Diagnóstico Interativo
*   Desenvolver o motor do questionário (passo a passo).
*   Salvar respostas parciais no Firestore.
*   Lógica de cálculo: Atualizar o Score ESG e XP da empresa ao finalizar seções.

### Fase 4: Jornada do Herói e Gamificação
*   Criar o componente visual da jornada (Step Indicator vertical/curvo).
*   Lógica de Levels: `level = Math.floor(currentXP / 1000)`.
*   Animações de "Level Up" e notificações de conquistas.

### Fase 5: Ranking de Mestres
*   Criar query no Firestore para listar empresas ordenadas por XP.
*   Implementar filtros por Indústria e Região.
*   Destaque visual para a posição da empresa logada no ranking.

## 5. Funcionalidades Avançadas
*   **Exportação de PDF:** Usar `jspdf` para gerar relatórios baseados nos dados.
*   **Dark Mode:** Implementar via context provider e Tailwind.
*   **Offline Support:** Ativar persistência de dados do Firestore para uso instável.

## 6. Testes e Deploy
*   **Testes:** Jest/React Testing Library para lógica de cálculo de scores.
*   **Deploy:** Firebase Hosting para a aplicação web.
*   **CI/CD:** Configurar GitHub Actions para deploy automático no Firebase Hosting ao dar push na `main`.
