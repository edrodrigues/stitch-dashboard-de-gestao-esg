export interface QuestionOption {
  label: string;
  value: number; // 0 to 100
}

export interface Question {
  id: string;
  category: 'environmental' | 'social' | 'governance';
  subcategory?: string;
  text: string;
  description?: string;
  options: QuestionOption[];
}

export const diagnosticQuestions: Question[] = [
  {
    "id": "env_2.1",
    "category": "environmental",
    "subcategory": "2. SGA",
    "text": "A sua empresa monitora e reporta indicadores ambientais?",
    "description": "Organize um Sistema de Gestão Ambiental segundo a Norma ISO 14.001/2005 em sua empresa. \n\nUm sistema de gestão ambiental (SGA) é um conjunto de políticas, procedimentos e práticas adotadas por uma organização para gerenciar e minimizar seu impacto ambiental. Ele visa promover a sustentabilidade ao integrar considerações ambientais nas operações diárias da empresa. \n\nUm SGA geralmente inclui atividades como identificação e avaliação de impactos ambientais, estabelecimento de metas e objetivos ambientais, implementação de medidas de controle e monitoramento do desempenho ambiental. O objetivo final é reduzir a pegada ecológica da organização e promover práticas empresariais responsáveis em relação ao meio ambiente.",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Monitoramos alguns indicadores ambientais.",
        "value": 25
      },
      {
        "label": "A empresa monitora seus indicadores ambientais e os reporta internamente.",
        "value": 50
      },
      {
        "label": "A empresa monitora e possui metas estabelecidas para melhorar seu desempenho.",
        "value": 75
      },
      {
        "label": "A empresa monitora seus indicadores ambientais, possui um Sistema de Gestão Ambiental e já alcançou metas relevantes nesse setor.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_2.2",
    "category": "environmental",
    "subcategory": "2. SGA",
    "text": "Existe algum documento que aborde o posicionamento socioambiental ou a política ambiental da empresa?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 25
      }
    ]
  },
  {
    "id": "env_3.1",
    "category": "environmental",
    "subcategory": "3. ENERGIA",
    "text": "Como a sua empresa monitora o consumo de energia?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Monitoramos, mas não estabelecemos metas de redução.",
        "value": 25
      },
      {
        "label": "A empresa monitora e tem reduzido o seu consumo.",
        "value": 50
      },
      {
        "label": "Alcançamos as metas de redução no consumo no último ano fiscal.",
        "value": 75
      },
      {
        "label": "A empresa possui tecnologias verdes implementadas para diversificar suas fontes de fornecimento de energia.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_3.3",
    "category": "environmental",
    "subcategory": "3. ENERGIA",
    "text": "Fontes de fornecimento de energia",
    "description": "",
    "options": [
      {
        "label": "Fornecimento regular e geradores movidos à diesel eventualmente.",
        "value": 0
      },
      {
        "label": "Fornecimento regular",
        "value": 25
      },
      {
        "label": "Fornecimento regular e outras fontes ecoeficientes como energia solar.",
        "value": 50
      },
      {
        "label": "Energia adquirida no mercado livre",
        "value": 75
      },
      {
        "label": "A empresa passou por uma transição energética, possui metas de redução ou transição para fontes ecoeficientes e geração própria de energia por biodigestão ou outras tecnologias verdes.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_3.4",
    "category": "environmental",
    "subcategory": "3. ENERGIA",
    "text": "Qual o percentual do fornecimento de energia é proveniente de fontes sustentáveis e ecoeficientes?",
    "description": "",
    "options": [
      {
        "label": "Menos de 10%",
        "value": 0
      },
      {
        "label": "10%",
        "value": 25
      },
      {
        "label": "15%",
        "value": 50
      },
      {
        "label": "20%",
        "value": 75
      },
      {
        "label": "+ de 50%",
        "value": 100
      }
    ]
  },
  {
    "id": "env_4.1",
    "category": "environmental",
    "subcategory": "4. ÁGUA E EFLUENTES",
    "text": "Como a sua empresa monitora o consumo de água?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos ainda.",
        "value": 0
      },
      {
        "label": "Monitoramos, mas não estabelecemos metas de redução.",
        "value": 25
      },
      {
        "label": "A empresa monitora e tem reduzido o seu consumo.",
        "value": 50
      },
      {
        "label": "Alcançamos as metas de redução no último ano fiscal.",
        "value": 75
      },
      {
        "label": "A empresa passou por uma transição e mais de 50% do consumo atual de água é proveniente de fontes ecoeficientes.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_4.3",
    "category": "environmental",
    "subcategory": "4. ÁGUA E EFLUENTES",
    "text": "Fontes de fornecimento de água",
    "description": "",
    "options": [
      {
        "label": "Captação em corpos hídricos.",
        "value": 0
      },
      {
        "label": "Poço artesiano ou caminhão-pipa.",
        "value": 25
      },
      {
        "label": "Fornecimento regular.",
        "value": 50
      },
      {
        "label": "Reutilização de água de chuva.",
        "value": 75
      },
      {
        "label": "Autossuficiência em água através de fontes responsáveis de aproveitamento e reaproveitamento de águas tratadas pela empresa.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_4.4",
    "category": "environmental",
    "subcategory": "4. ÁGUA E EFLUENTES",
    "text": "Qual o percentual do fornecimento de energia é proveniente de fontes sustentáveis e ecoeficientes?",
    "description": "",
    "options": [
      {
        "label": "Menos de 10%",
        "value": 0
      },
      {
        "label": "10%",
        "value": 25
      },
      {
        "label": "15%",
        "value": 50
      },
      {
        "label": "20%",
        "value": 75
      },
      {
        "label": "50% ou mais",
        "value": 100
      }
    ]
  },
  {
    "id": "env_4.5",
    "category": "environmental",
    "subcategory": "4. ÁGUA E EFLUENTES",
    "text": "De que forma a empresa descarta seus efluentes?",
    "description": "",
    "options": [
      {
        "label": "In natura em corpos hídricos.",
        "value": 0
      },
      {
        "label": "Tratamento feito pela empresa e despejado em corpos hídricos.",
        "value": 25
      },
      {
        "label": "In natura para o esgoto regular.",
        "value": 50
      },
      {
        "label": "A empresa possui Estação de Tratamento de Efluentes que após tratados são enviados para o esgoto regular",
        "value": 75
      },
      {
        "label": "A empresa possui em suas instalações tecnologias de tratamento e reaproveitamento de água de esgoto.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_4.6",
    "category": "environmental",
    "subcategory": "4. ÁGUA E EFLUENTES",
    "text": "A empresa emite efluentes tóxicos?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 25
      }
    ]
  },
  {
    "id": "env_4.7",
    "category": "environmental",
    "subcategory": "4. ÁGUA E EFLUENTES",
    "text": "De que forma a empresa monitora o tratamento e descarte dos efluentes tóxicos?",
    "description": "",
    "options": [
      {
        "label": "Não adotamos nenhuma medida.",
        "value": 0
      },
      {
        "label": "A empresa monitora sua toxicidade e volume.",
        "value": 25
      },
      {
        "label": "A empresa monitora sua toxicidade, volume e possui uma Estação de Tratamento de Efluentes.",
        "value": 50
      },
      {
        "label": "A empresa monitora sua toxicidade, volume, possui uma Estação de Tratamento de Efluentes e estabeleceu metas de redução do volume do material residual tóxico.",
        "value": 75
      },
      {
        "label": "A empresa conseguiu reduzir em mais de 50% ou zerar a emissão de efluentes tóxicos.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_5.1",
    "category": "environmental",
    "subcategory": "5. GESTAO DE RESIDUOS",
    "text": "A empresa possui um plano de gerenciamento de resíduos?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 25
      }
    ]
  },
  {
    "id": "env_5.3",
    "category": "environmental",
    "subcategory": "5. GESTAO DE RESIDUOS",
    "text": "Qual o destino final dos resíduos gerados pela empresa?",
    "description": "",
    "options": [
      {
        "label": "Coleta regular.",
        "value": 0
      },
      {
        "label": "Coleta regular e cooperativa de materiais recicláveis.",
        "value": 25
      },
      {
        "label": "Reaproveitamento no processo produtivo, coleta regular e cooperativa de materiais recicláveis.",
        "value": 50
      },
      {
        "label": "Temos uma empresa contratada para fazer a destinação final correta.",
        "value": 75
      },
      {
        "label": "Conseguimos reduzir em mais de 50% o volume dos resíduos gerados ou somos uma empresa que possui o compromisso de produzir lixo zero.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_5.4",
    "category": "environmental",
    "subcategory": "5. GESTAO DE RESIDUOS",
    "text": "Quais as medidas relacionadas à redução de resíduos são adotadas pela sua empresa?",
    "description": "",
    "options": [
      {
        "label": "Fazemos a coleta seletiva do lixo.",
        "value": 0
      },
      {
        "label": "Fazemos a coleta seletiva do lixo e nos comprometemos com o treinamento de toda a equipe e a sensibilização acerca do tema resíduos e o desperdício de materiais.",
        "value": 25
      },
      {
        "label": "Fazemos a coleta seletiva, destinamos de forma correta e adotamos medidas práticas para a redução da produção de lixo em nossos processos.",
        "value": 50
      },
      {
        "label": "Temos parcerias com instituições que reaproveitam os materiais recicláveis descartados, como cooperativas de catadores.",
        "value": 75
      },
      {
        "label": "Reaproveitamos nossos resíduos como matéria-prima para produzir novos produtos.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_5.5",
    "category": "environmental",
    "subcategory": "5. GESTAO DE RESIDUOS",
    "text": "A empresa monitora o volume de resíduos perigosos gerados?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 25
      }
    ]
  },
  {
    "id": "env_5.6",
    "category": "environmental",
    "subcategory": "5. GESTAO DE RESIDUOS",
    "text": "Existe alguma medida ou tecnologia aplicada às embalagens para evitar a proliferação de materiais plásticos?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 25
      }
    ]
  },
  {
    "id": "env_6.1",
    "category": "environmental",
    "subcategory": "6. AR E CLIMA",
    "text": "De que forma a sua empresa monitora as emissões de Gases de Efeito Estufa?",
    "description": "",
    "options": [
      {
        "label": "Atualmente não monitoramos.",
        "value": 0
      },
      {
        "label": "Monitoramos de forma parcial.",
        "value": 25
      },
      {
        "label": "Monitoramos através de um Inventário verificação de GEE.",
        "value": 50
      },
      {
        "label": "Monitoramos e estabelecemos metas de redução.",
        "value": 75
      },
      {
        "label": "Monitoramos e estabelecemos meta de carbono zero.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_6.3",
    "category": "environmental",
    "subcategory": "6. AR E CLIMA",
    "text": "De que forma a sua empresa monitora qualidade do ar nas suas instalações?",
    "description": "",
    "options": [
      {
        "label": "Atualmente não monitoramos.",
        "value": 0
      },
      {
        "label": "Não monitoramos, mas possuímos ambientes abertos e ventilados.",
        "value": 25
      },
      {
        "label": "Monitoramos periodicamente e possuímos aparelhos de filtragem de ar.",
        "value": 50
      },
      {
        "label": "Monitoramos periodicamente, possuímos aparelhos de filtragem de ar e estabelecemos metas de melhoria.",
        "value": 75
      },
      {
        "label": "Monitoramos periodicamente, possuímos aparelhos de filtragem de ar e alcançamos nossas metas de melhoria.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_7.1",
    "category": "environmental",
    "subcategory": "7. MATÉRIA-PRIMA",
    "text": "A empresa possui alguma certificação de rastreabilidade?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos a origem de nossas matérias-prima.",
        "value": 0
      },
      {
        "label": "Nossa matéria-prima é verificada, mas não é certificada.",
        "value": 25
      },
      {
        "label": "Utilizamos mais de 50% de matéria-prima certificada.",
        "value": 50
      },
      {
        "label": "Utilizamos apenas matéria-prima certificada.",
        "value": 75
      },
      {
        "label": "A empresa é certificada pela FSC ou por outras certificação de manejo florestal responsável.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_7.2",
    "category": "environmental",
    "subcategory": "7. MATÉRIA-PRIMA",
    "text": "Na empresa existem iniciativas para fortalecer o manejo sustentável dos fornecedores de madeira?",
    "description": "",
    "options": [
      {
        "label": "A empresa não possui iniciativas de fortalecimento de manejo estabelecidas e implantadas.",
        "value": 0
      },
      {
        "label": "A empresa planeja adotar iniciativas para fortalecer o manejo sustentável pelos fornecedores de madeira.",
        "value": 25
      },
      {
        "label": "Existem iniciativas de fortalecimento do manejo florestal estabelecidas e implantadas.",
        "value": 50
      },
      {
        "label": "As  iniciativas de fortalecimento de manejo  florestal estão estabelecidas e em implantação.",
        "value": 75
      },
      {
        "label": "Temos um programa de manejo sustentável com os fornecedores e também buscamos regenerar florestas como forma de compensar nossos impactos negativos.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_8.1",
    "category": "environmental",
    "subcategory": "8. DESIGN CIRCULAR E CICLO DE VIDA",
    "text": "A empresa possui a gestão do ciclo de vida do produto?",
    "description": "",
    "options": [
      {
        "label": "Não possuímos a gestão do ciclo de vida.",
        "value": 0
      },
      {
        "label": "Conhecemos o ciclo de vida do nosso produto, mas não nos responsabilizamos pela sua destinação final.",
        "value": 25
      },
      {
        "label": "Conhecemos o ciclo de vida do nosso produto e fazemos as recomendações na embalagem sobre o descarte adequado.",
        "value": 50
      },
      {
        "label": "Possuímos sistema de logística reversa.",
        "value": 75
      },
      {
        "label": "A empresa é certificada pela CRADLE TO CRADLE ou por outras certificação de controle de ciclo de vida de produto.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_8.2",
    "category": "environmental",
    "subcategory": "8. DESIGN CIRCULAR E CICLO DE VIDA",
    "text": "A empresa possui em seus processos produtivos a adoção do design voltado à segurança de seus produtos durante todo o ciclo de vida?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 25
      }
    ]
  },
  {
    "id": "env_8.3",
    "category": "environmental",
    "subcategory": "8. DESIGN CIRCULAR E CICLO DE VIDA",
    "text": "A empresa possui em seus processos produtivos a adoção do design voltado à circularidade e à redução de resíduos provenientes de seus produtos?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 25
      }
    ]
  },
  {
    "id": "env_8.4",
    "category": "environmental",
    "subcategory": "8. DESIGN CIRCULAR E CICLO DE VIDA",
    "text": "Qual o posicionamento da empresa relativo à produtos tóxicos?",
    "description": "",
    "options": [
      {
        "label": "Utilizamos produtos tóxicos e ainda não conseguimos pensar em alternativas para reduzir a toxicidade do nosso processo produtivo.",
        "value": 0
      },
      {
        "label": "Utilizamos produtos tóxicos e buscamos reduzir o seu uso.",
        "value": 25
      },
      {
        "label": "Utilizamos apenas o necessário de produtos tóxicos e já conseguimos pensar em alternativas para reduzir a toxicidade do nosso processo produtivo.",
        "value": 50
      },
      {
        "label": "Já possuímos alternativas implementadas e mais de 50% da nossa produção não utiliza produtos tóxicos.",
        "value": 75
      },
      {
        "label": "Não utilizamos produtos tóxicos em nosso processo produtivo.",
        "value": 100
      }
    ]
  },
  {
    "id": "env_8.5",
    "category": "environmental",
    "subcategory": "8. DESIGN CIRCULAR E CICLO DE VIDA",
    "text": "Sua empresa adotou alguma tecnologia para minimizar o impacto ambiental relacionado ao transporte em sua cadeia de abastecimento e distribuição?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 25
      },
      {
        "label": "Sim, possuímos programa de mobilidade verde",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_9.1",
    "category": "social",
    "subcategory": "9. DIREITOS HUMANOS",
    "text": "A empresa possui política ou compliance para evitar a ocorrência de violações de direitos humanos em sua cadeia de valor?",
    "description": "Os impactos relativos à violação de direitos humanos são o maior risco reputacional para uma empresa, na prática estamos falando de medidas como prevenção ao trabalho análogo à escravidão e ao trabalho infantil. As medidas positivas podem ser a contratação de imigrantes ou o apoio à alguma organização que o faça.",
    "options": [
      {
        "label": "Não possuímos o compromisso formal com os direitos humanos.",
        "value": 0
      },
      {
        "label": "Possuímos em nossos documentos (compliance ou outros) a expressa menção ou mecanismos para evitar violações de direitos humanos.",
        "value": 25
      },
      {
        "label": "Possuímos o compromisso com os direitos humanos em toda a nossa cadeia de valor, adotamos práticas responsáveis e exigimos o mesmo dos fornecedores.",
        "value": 50
      },
      {
        "label": "Fazemos verificações periódicas sobre os riscos associados aos direitos humanos em nossa cadeia de valor.",
        "value": 75
      },
      {
        "label": "Possuimos elevados níveis de colaboração com a agenda dos direitos humanos, adotamos políticas práticas internas e colaborações de nivel global.",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_9.2",
    "category": "social",
    "subcategory": "9. DIREITOS HUMANOS",
    "text": "A empresa monitora os riscos socioambientais associados aos seus produtos na cadeia de valor?",
    "description": "Os impactos relativos à violação de direitos humanos são o maior risco reputacional para uma empresa, na prática estamos falando de medidas como prevenção ao trabalho análogo à escravidão e ao trabalho infantil. As medidas positivas podem ser a contratação de imigrantes ou o apoio à alguma organização que o faça.",
    "options": [
      {
        "label": "Não consideramos os riscos socioambientais em nossa cadeia de valor.",
        "value": 0
      },
      {
        "label": "Temos um mapeamento de riscos, mas não fiscalizamos.",
        "value": 25
      },
      {
        "label": "Temos um mapeamento de riscos e frequentemente fiscalizamos nossos fornecedores e empresas contratadas.",
        "value": 50
      },
      {
        "label": "Exigimos que os nossos fornecedores e contratadas reportem suas práticas de prevenção à violação de direitos humanos.",
        "value": 75
      },
      {
        "label": "Temos normas formais acerca da gestão dos riscos socioambientais em nossa cadeia de valor",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_9.3",
    "category": "social",
    "subcategory": "9. DIREITOS HUMANOS",
    "text": "A empresa possui política de contratação de imigrantes ou de pessoas em situação de vulnerabilidade social?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 25
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_10.1",
    "category": "social",
    "subcategory": "10. PRÁTICAS TRABALHISTAS",
    "text": "A empresa possui um manual do funcionário formalizado por escrito?",
    "description": "",
    "options": [
      {
        "label": "A empresa não tem um manual do funcionário formalizado por escrito.",
        "value": 0
      },
      {
        "label": "Apenas uma declaração de não discriminação e informações gerais sobre os horários de trabalho",
        "value": 25
      },
      {
        "label": "Uma política contra o assédio com mecanismos de denúncia e processos e procedimentos disciplinares, medidas disciplinares e possíveis sanções",
        "value": 50
      },
      {
        "label": "O manual do funcionário aborda além das questões anteriores políticas sobre questões de remuneração e desempenho, capacitação e licenças",
        "value": 75
      },
      {
        "label": "O manual do funcionário é construido com a participação das partes interessadas, possui uma declaração de neutralidade sobre o direito dos trabalhadores à negociação coletiva e à liberdade de associação, além de regras sobre direitos humanos como a proibição do trabalho infantil e do trabalho forçado ou compulsório",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_10.2",
    "category": "social",
    "subcategory": "10. PRÁTICAS TRABALHISTAS",
    "text": "Qual o percentual de trabalhadores são terceirizados?",
    "description": "",
    "options": [
      {
        "label": "Mais de 70% da força de trabalho.",
        "value": 0
      },
      {
        "label": "Mais de 50% da força de trabalho.",
        "value": 25
      },
      {
        "label": "Menos de 50% da força de trabalho.",
        "value": 50
      },
      {
        "label": "Menos de 20% da força de trabalho.",
        "value": 75
      },
      {
        "label": "Não contratamos trabalhadores terceirizados.",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_10.3",
    "category": "social",
    "subcategory": "10. PRÁTICAS TRABALHISTAS",
    "text": "Número de trabalhadores temporários no último ano fiscal?",
    "description": "",
    "options": [
      {
        "label": "Mais de 70%",
        "value": 0
      },
      {
        "label": "Mais de 50%",
        "value": 25
      },
      {
        "label": "Menos de 50%",
        "value": 50
      },
      {
        "label": "Menos de 20%",
        "value": 75
      },
      {
        "label": "Não contratam trabalhadores temporários.",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_10.4",
    "category": "social",
    "subcategory": "10. PRÁTICAS TRABALHISTAS",
    "text": "A empresa oferece benefícios para aumentar a renda dos trabalhadores como a participação nos lucros e resultados ou acréscimo por produtividade.",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 100
      },
      {
        "label": "Sim",
        "value": 0
      }
    ]
  },
  {
    "id": "soc_11.1",
    "category": "social",
    "subcategory": "11. SAÚDE E SEGURANÇA",
    "text": "Quais os benefícios que a empresa oferece para complementar os benefícios governamentais?",
    "description": "",
    "options": [
      {
        "label": "Cobertura por invalidez ou seguro contra acidentes.",
        "value": 0
      },
      {
        "label": "Seguro de vida.",
        "value": 25
      },
      {
        "label": "Seguro odontológico privado",
        "value": 50
      },
      {
        "label": "Seguro de saúde privado.",
        "value": 75
      },
      {
        "label": "Seguro de saúde privado complementar com extensão dos benefícios de saúde ao cônjuge e aos filhos",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_11.2",
    "category": "social",
    "subcategory": "11. SAÚDE E SEGURANÇA",
    "text": "São feitas capacitações periódicas sobre o programa de saúde e segurança?",
    "description": "",
    "options": [
      {
        "label": "Não há um programa formal de saúde e segurança",
        "value": 0
      },
      {
        "label": "Fazemos capacitações em saúde e segurança para todos os trabalhadores, que inclua pelo menos uma simulação de emergência por ano.",
        "value": 25
      },
      {
        "label": "Registramos e divulgamos os dados sobre lesões, acidentes, dias perdidos ou dias de ausência para todos os trabalhadores",
        "value": 50
      },
      {
        "label": "Possuímos um sistema formal de denúncia de questões de segurança para que os funcionários possam apresentar suas preocupações relacionadas à segurança",
        "value": 75
      },
      {
        "label": "Existe uma comissão ou um funcionário responsável pela segurança ou um representante do programa de segurança que responda a um funcionário sênior (por exemplo, vice-presidente ou superior)",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_11.3",
    "category": "social",
    "subcategory": "11. SAÚDE E SEGURANÇA",
    "text": "Qual a política da empresa em relação à manipulação de substâncias ou equipamentos perigosos?",
    "description": "",
    "options": [
      {
        "label": "Todos os trabalhadores são informados dos riscos associados ao manuseio de materiais perigosos.",
        "value": 0
      },
      {
        "label": "A empresa exige que todos os trabalhadores que estão em contato com materiais perigosos usem equipamentos de proteção, incluindo roupas adequadas e proteção para os olhos e os pés.",
        "value": 25
      },
      {
        "label": "Todos os trabalhadores que estão em contato com materiais perigosos recebem capacitação inicial e continuada (pelo menos duas vezes por ano) relacionada ao armazenamento, manuseio e descarte adequados dos materiais.",
        "value": 50
      },
      {
        "label": "A empresa monitora a saúde de todos os funcionários que trabalham com materiais perigosos e fornece a eles check-ups de saúde anuais.",
        "value": 75
      },
      {
        "label": "A empresa realiza o monitoramento da saúde dos funcionários que trabalham em contato com materiais perigosos, fornecendo todas as instruções e materiais necessários para que não haja nenhum dano.",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_11.4",
    "category": "social",
    "subcategory": "11. SAÚDE E SEGURANÇA",
    "text": "A empresa monitora a incidência de acidentes graves e fatais no ambiente de trabalho?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Monitoramos e fazemos o acompanhamento preventivo.",
        "value": 25
      },
      {
        "label": "Possuímos um forte sistema de prevenção à acidentes de trabalho, além da CIPA.",
        "value": 50
      },
      {
        "label": "Buscamos monitorar e prevenir os danos, assim como a empresa fez investimentos em equipamentos mais seguros.",
        "value": 75
      },
      {
        "label": "Temos os orgulho de reportar que não houveram acidentes no último ano fiscal.",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_12.1",
    "category": "social",
    "subcategory": "12. ENGAJAMENTO E DIVERSIDADE",
    "text": "Qual o percentual dos seus trabalhadores são mulheres?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Até 10%",
        "value": 25
      },
      {
        "label": "Entre 10% e 15%",
        "value": 50
      },
      {
        "label": "Entre 15% e 25%",
        "value": 75
      },
      {
        "label": "50% ou mais",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_12.2",
    "category": "social",
    "subcategory": "12. ENGAJAMENTO E DIVERSIDADE",
    "text": "Qual o percentual dos seus trabalhadores são pessoas negras?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Até 10%",
        "value": 25
      },
      {
        "label": "Entre 10% e 15%",
        "value": 50
      },
      {
        "label": "Entre 15% e 25%",
        "value": 75
      },
      {
        "label": "50% ou mais",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_12.3",
    "category": "social",
    "subcategory": "12. ENGAJAMENTO E DIVERSIDADE",
    "text": "Qual o percentual dos seus trabalhadores são LGBTQIAPN+?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Até 10%",
        "value": 25
      },
      {
        "label": "Entre 10% e 15%",
        "value": 50
      },
      {
        "label": "Entre 15% e 25%",
        "value": 75
      },
      {
        "label": "50% ou mais",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_12.4",
    "category": "social",
    "subcategory": "12. ENGAJAMENTO E DIVERSIDADE",
    "text": "Qual o percentual dos seus trabalhadores possuem mais de 55 anos?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Até 10%",
        "value": 25
      },
      {
        "label": "Entre 10% e 15%",
        "value": 50
      },
      {
        "label": "Entre 15% e 25%",
        "value": 75
      },
      {
        "label": "50% ou mais",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_12.5",
    "category": "social",
    "subcategory": "12. ENGAJAMENTO E DIVERSIDADE",
    "text": "Existe uma politica de contratação inclusiva?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_12.6",
    "category": "social",
    "subcategory": "12. ENGAJAMENTO E DIVERSIDADE",
    "text": "Qual o percentual de trabalhadores são Pessoas Com Deficiência (PcDs)?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Até 10%",
        "value": 25
      },
      {
        "label": "Entre 10% e 15%",
        "value": 50
      },
      {
        "label": "Entre 15% e 25%",
        "value": 75
      },
      {
        "label": "50% ou mais",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_13.1",
    "category": "social",
    "subcategory": "13. FORNECEDORES",
    "text": "Os critérios socioambientais são considerados na escolha dos fornecedores?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_13.2",
    "category": "social",
    "subcategory": "13. FORNECEDORES",
    "text": "Qual o percentual dos seus fornecedores pertencem ao mercado local?",
    "description": "",
    "options": [
      {
        "label": "Não monitoramos.",
        "value": 0
      },
      {
        "label": "Até 10%",
        "value": 25
      },
      {
        "label": "Entre 10% e 15%",
        "value": 50
      },
      {
        "label": "Entre 15% e 25%",
        "value": 75
      },
      {
        "label": "50% ou mais",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_13.3",
    "category": "social",
    "subcategory": "13. FORNECEDORES",
    "text": "Existe um documento formal que declara o código de conduta de fornecedores ou avaliação periódica?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "soc_13.4",
    "category": "social",
    "subcategory": "13. FORNECEDORES",
    "text": "Os fornecedores recebem treinamentos e passam por auditorias periódicas?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_14.1",
    "category": "governance",
    "subcategory": "14. CULTURA E VALORES",
    "text": "A empresa tem definida sua declaração de missão, visão e valores?",
    "description": "",
    "options": [
      {
        "label": "A empresa não tem definida sua declaração de missão, visão e valores.",
        "value": 0
      },
      {
        "label": "A empresa possui definição de missão, visão e valores, porém sem metas associadas.",
        "value": 25
      },
      {
        "label": "A declaração de missão, visão e valores possui metas e objetivos relacionados.",
        "value": 50
      },
      {
        "label": "A empresa tem a sustentabilidade incluida em sua missão e estratégia.",
        "value": 75
      },
      {
        "label": "A empresa  tem a sustentabilidade incluída em sua missão e estratégia e faz o monitoramento dos indicadores ESG",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_15.1",
    "category": "governance",
    "subcategory": "15. GESTÃO DA SATISFAÇÃO DO CLIENTE",
    "text": "A empresa realiza periodicamente pesquisas para saber a opinião de seus clientes, fornecedores e comunidade do entorno (stakeholders) para entender suas expectativas e necessidades?",
    "description": "",
    "options": [
      {
        "label": "A empresa não realiza pesquisas nem possui canal de atendimento ao consumidor.",
        "value": 0
      },
      {
        "label": "A empresa não realiza pesquisas e possui canal de atendimento ao consumidor.",
        "value": 25
      },
      {
        "label": "A empresa  realiza pesquisas em diversos canais para conhecer a opinião de seus clientes, fornecedores e da comunidade.",
        "value": 50
      },
      {
        "label": "A empresa realiza pesquisas com todas as suas partes interessadas, possui canal de atendimento ao fornecedor e canal de denúncias.",
        "value": 75
      },
      {
        "label": "A empresa possui seus stakeholders em esferas decisórias da empresa, conselho de diretores por exemplo.",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_15.2",
    "category": "governance",
    "subcategory": "15. GESTÃO DA SATISFAÇÃO DO CLIENTE",
    "text": "A empresa monitora o grau de satisfação dos seus clientes?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_15.3",
    "category": "governance",
    "subcategory": "15. GESTÃO DA SATISFAÇÃO DO CLIENTE",
    "text": "A empresa possui procedimentos para acompanhamento e tratamento das reclamações/ sugestões recebidas em diferentes plataformas, inclusive redes sociais?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_16.1",
    "category": "governance",
    "subcategory": "16. QUALIDADE E SEGURANÇA DO PRODUTO",
    "text": "São oferecidas garantias extraordinárias além das estabelecidas em lei?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_17.1",
    "category": "governance",
    "subcategory": "17. ROTULAGEM E PRÁTICAS DE VENDA",
    "text": "A empresa possui em suas embalagens alguma certificação ou atributo identificado em suas embalagens?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_18.1",
    "category": "governance",
    "subcategory": "18. GERENCIAMENTO DE RISCOS",
    "text": "A empresa realizou o estudo e formou a sua matriz de materialidade para entender quais os principais riscos ESG para o negócio?",
    "description": "",
    "options": [
      {
        "label": "A empresa não realizou ainda o estudo da sua matriz de materialidade.",
        "value": 0
      },
      {
        "label": "Conhecemos nossos riscos, mas em nível gerencial, sem a devida divulgação e gestão.",
        "value": 25
      },
      {
        "label": "Realizamos a matriz de materialidade de forma interna, consultando a alta direção.",
        "value": 50
      },
      {
        "label": "Realizamos a matriz de materialidade de dupla materialidade, consultando a alta direção e as partes interessadas (stakeholders).",
        "value": 75
      },
      {
        "label": "A matriz de materialidade está publicada em nosso último relatorio de sustentabilidade.",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_18.2",
    "category": "governance",
    "subcategory": "18. GERENCIAMENTO DE RISCOS",
    "text": "A empresa adota procedimentos para a gestão dos seus riscos ESG?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_19.1",
    "category": "governance",
    "subcategory": "19. GESTÃO DE REQUISITOS LEGAIS",
    "text": "A empresa possui todas as autorizações necessárias para a sua atuação?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_19.2",
    "category": "governance",
    "subcategory": "19. GESTÃO DE REQUISITOS LEGAIS",
    "text": "A empresa atualiza periodicamente a sua análise de requisitos legais?",
    "description": "",
    "options": [
      {
        "label": "Não",
        "value": 0
      },
      {
        "label": "Sim",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_20.1",
    "category": "governance",
    "subcategory": "20. ETICA E TRANSPARÊNCIA",
    "text": "A empresa possui uma cultura de conduta clara sobre práticas de relacionamento ético com o poder público, fornecedores e clientes?",
    "description": "",
    "options": [
      {
        "label": "A empresa não define as práticas de relacionamento.",
        "value": 0
      },
      {
        "label": "Na empresa, os funcionários não conhecem bem a formalização das condutas.",
        "value": 25
      },
      {
        "label": "SIM, mas ainda não estão definidas em normas internas da empresa.",
        "value": 50
      },
      {
        "label": "SIM, as condutas estão definidas em normas e práticas éticas divulgadas na empresa.",
        "value": 75
      },
      {
        "label": "As normas estão definidas, formalizadas, divulgadas e os funcionários sáo treinados pelo menos anualmente.",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_20.2",
    "category": "governance",
    "subcategory": "20. ETICA E TRANSPARÊNCIA",
    "text": "O relatório financeiro da sua empresa atende:",
    "description": "",
    "options": [
      {
        "label": "Não possuímos relatório financeiro divulgado.",
        "value": 0
      },
      {
        "label": "Possuímos relatório financeiro o qual divulgamos internamente.",
        "value": 25
      },
      {
        "label": "Nosso relatório financeiro atende às normas de contabilidade locais.",
        "value": 50
      },
      {
        "label": "Nosso relatório financeiro atende às normas de contabilidade internacionais.",
        "value": 75
      },
      {
        "label": "Nosso relatório financeiro é auditado por entidade externa.",
        "value": 100
      }
    ]
  },
  {
    "id": "gov_20.3",
    "category": "governance",
    "subcategory": "20. ETICA E TRANSPARÊNCIA",
    "text": "Relatórios de Sustentabilidade",
    "description": "",
    "options": [
      {
        "label": "Não possuímos relatório de sustentabilidade divulgado.",
        "value": 0
      },
      {
        "label": "Possuímos relatório de sustentabilidade o qual divulgamos internamente.",
        "value": 25
      },
      {
        "label": "Divulgamos nossos indicadores de sustentabilidade em nosso site.",
        "value": 50
      },
      {
        "label": "Nosso relatório de sustentabilidade é realizado segundo as normas GRI.",
        "value": 75
      },
      {
        "label": "Nosso relatório de sustentabilidade pelas normas GRI já estão no segundo ano ou mais de reporte.",
        "value": 100
      }
    ]
  }
];
