# Plano de Correção de Bugs - Guia ESG Brasil

Este documento descreve os bugs identificados e o plano para corrigi-los.

## Bug 001: Tipo de Input Incorreto para Consumo de Água

**Descrição:** A pergunta "Consumo de água no último ano fiscal?" (ID: `environmental_4.2`) está configurada com `inputType: "radio"`, o que impede o usuário de inserir o valor numérico do consumo.

**Impacto:** O usuário não consegue registrar o volume de água consumido, afetando a precisão do diagnóstico ambiental.

**Causa Raiz:** Configuração incorreta no arquivo de dados das questões (`src/data/questions.ts`).

**Plano de Correção:**
1. Alterar o campo `inputType` de `"radio"` para `"number"` no objeto com ID `environmental_4.2`.
2. Remover ou ajustar as opções que não fazem sentido para um input do tipo numérico.

**Status:** Resolvido em `src/data/questions.ts`.

## Bug 002: Falta de Lógica Condicional para Efluentes Tóxicos

**Descrição:** Se a empresa não emite efluentes tóxicos (pergunta `environmental_4.6`), o sistema ainda mostra perguntas sobre o monitoramento desses efluentes (`environmental_4.7`).

**Impacto:** Experiência do usuário negativa ao responder perguntas irrelevantes.

**Causa Raiz:** Ausência do campo `dependsOn` na pergunta `environmental_4.7`.

**Plano de Correção:**
1. Adicionar `dependsOn` à pergunta `environmental_4.7` para que ela dependa de `environmental_4.6` ser igual a `"Sim"`.

**Status:** Resolvido em `src/data/questions.ts`.

## Bug 003: Opção Indesejada na Pergunta sobre Fornecedores

**Descrição:** A pergunta "Os fornecedores recebem treinamentos e passam por auditorias periódicas?" (`social_13.4`) contém uma terceira opção ("PERGUNTAS") que não deveria existir.

**Impacto:** Interface confusa e dados inconsistentes.

**Causa Raiz:** Opção residual no arquivo `src/data/questions.ts`.

**Plano de Correção:**
1. Remover a opção "PERGUNTAS" do array `options` da questão `social_13.4`.

**Status:** Resolvido em `src/data/questions.ts`.

## Melhoria 004: Lista Dinâmica de Sugestões de Melhoria (Gamificação)

**Descrição:** Transformar a seção estática "Próximas Missões Ambientais" em uma lista dinâmica de sugestões baseada nas fraquezas identificadas no diagnóstico.

**Passo a Passo para Implementação Dinâmica:**

1.  **Mapeamento de Recomendações:**
    *   Criar um mapeamento (JSON ou objeto) vinculando IDs de questões e respostas negativas (ex: "Não") a recomendações específicas (título, ícone, XP, impacto).
2.  **Recuperação de Respostas:**
    *   No componente `EnvironmentalPage.tsx`, buscar as respostas salvas no Firestore (`company.diagnosticAnswers`).
3.  **Filtragem de Fraquezas:**
    *   Percorrer as respostas do usuário e identificar onde ele respondeu negativamente em pontos críticos (ex: não possui política de resíduos, não monitora energia).
4.  **Geração da Lista de Sugestões:**
    *   Para cada "fraqueza" encontrada, selecionar a recomendação correspondente do mapeamento.
    *   Limitar a exibição às 3 ou 5 recomendações prioritárias para não sobrecarregar o painel.
5.  **Atualização da UI:**
    *   Alterar o título do Card para "Sugestões de Melhoria".
    *   Renderizar os itens dinamicamente, mantendo o estilo premium e gamificado (XP, ícones).

**Status:** Em planejamento / Parcialmente implementado na UI.

