import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as path from 'path';

// Import the current "source of truth" questions from the app
// We use require because this is a script and we might not have full TS execution for imports
// Alternatively, we can just copy the array here for the script's purpose to ensure it matches exactly.
const diagnosticQuestions = [
  {
    "id": "form_1.1",
    "category": "form",
    "subcategory": "IDENTIFICAÇÃO",
    "text": "Nome da Empresa",
    "inputType": "text"
  },
  {
    "id": "form_1.2",
    "category": "form",
    "subcategory": "IDENTIFICAÇÃO",
    "text": "CNPJ",
    "inputType": "text",
    "description": "Apenas números"
  },
  {
    "id": "form_1.3",
    "category": "form",
    "subcategory": "ESCOPO",
    "text": "Escopo da avaliação",
    "inputType": "text",
    "description": "Informe o período dos dados (Ex: Janeiro/2024 a Dezembro/2024)"
  },
  {
    "id": "form_1.4",
    "category": "form",
    "subcategory": "CATEGORIA",
    "text": "Setor de Atuação",
    "options": [
      { "label": "Atacado/Varejo", "value": "atacado_varejo" },
      { "label": "Fabricação", "value": "fabricacao" },
      { "label": "Serviço", "value": "servico" }
    ]
  },
  {
    "id": "form_1.5",
    "category": "form",
    "subcategory": "CLASSIFICAÇÃO",
    "text": "A sua empresa oferece produtos ou serviços?",
    "options": [
      { "label": "Produto", "value": "produto" },
      { "label": "Serviço", "value": "servico" }
    ]
  },
  {
    "id": "form_1.5_classe",
    "category": "form",
    "subcategory": "CLASSIFICAÇÃO",
    "text": "Qual a classe de classificação?",
    "dependsOn": { "questionId": "form_1.5", "value": "produto" },
    "options": [
      { "label": "Classe 1 - Produtos químicos para indústria, ciências e agricultura", "value": 1 },
      { "label": "Classe 2 - Tintas, vernizes e preparações contra corrosão", "value": 2 },
      { "label": "Classe 3 - Cosméticos, produtos de higiene e limpeza", "value": 3 },
      { "label": "Classe 4 - Óleos e graxas industriais; combustíveis e lubrificantes", "value": 4 },
      { "label": "Classe 5 - Produtos farmacêuticos, médicos e veterinários; suplementos", "value": 5 },
      { "label": "Classe 6 - Metais comuns e suas ligas; materiais de construção metálicos", "value": 6 },
      { "label": "Classe 7 - Máquinas, ferramentas mecânicas e motores", "value": 7 },
      { "label": "Classe 8 - Ferramentas e instrumentos manuais; cutelaria", "value": 8 },
      { "label": "Classe 9 - Aparelhos científicos, softwares, computadores e eletrônicos", "value": 9 },
      { "label": "Classe 10 - Aparelhos e instrumentos cirúrgicos, médicos e odontológicos", "value": 10 },
      { "label": "Classe 11 - Aparelhos de iluminação, aquecimento e refrigeração", "value": 11 },
      { "label": "Classe 12 - Veículos; aparelhos para locomoção por terra, ar ou água", "value": 12 },
      { "label": "Classe 13 - Armas de fogo; munições e projéteis; fogos de artifício", "value": 13 },
      { "label": "Classe 14 - Metais preciosos; joalheria; relojoaria", "value": 14 },
      { "label": "Classe 15 - Instrumentos musicais", "value": 15 },
      { "label": "Classe 16 - Papel, papelão e produtos de papelaria; material de escritório", "value": 16 },
      { "label": "Classe 17 - Borracha, guta-percha, amianto e plásticos semi-processados", "value": 17 },
      { "label": "Classe 18 - Couro e imitações; malas e bolsas; guarda-chuvas", "value": 18 },
      { "label": "Classe 19 - Materiais de construção não metálicos; monumentos", "value": 19 },
      { "label": "Classe 20 - Móveis, espelhos e molduras; produtos de madeira ou plástico", "value": 20 },
      { "label": "Classe 21 - Utensílios domésticos e de cozinha; vidraria e porcelana", "value": 21 },
      { "label": "Classe 22 - Cordas, redes, tendas e matérias têxteis fibrosas brutas", "value": 22 },
      { "label": "Classe 23 - Fios e linhas para uso têxtil", "value": 23 },
      { "label": "Classe 24 - Tecidos e substitutos de tecidos; roupa de cama e mesa", "value": 24 },
      { "label": "Classe 25 - Vestuário, calçados e chapelaria", "value": 25 },
      { "label": "Classe 26 - Rendas, fitas e bordados; flores artificiais; acessórios de cabelo", "value": 26 },
      { "label": "Classe 27 - Tapetes, capachos e revestimentos de pisos e paredes", "value": 27 },
      { "label": "Classe 28 - Jogos e brinquedos; artigos de esporte", "value": 28 },
      { "label": "Classe 29 - Carnes, peixes, laticínios; frutas e legumes conservados", "value": 29 },
      { "label": "Classe 30 - Café, chá, arroz, pães, massas e confeitos", "value": 30 },
      { "label": "Classe 31 - Produtos agrícolas, hortícolas e florestais brutos; animais vivos", "value": 31 },
      { "label": "Classe 32 - Cervejas; águas minerais; sucos e bebidas não alcoólicas", "value": 32 },
      { "label": "Classe 33 - Bebidas alcoólicas (exceto cervejas)", "value": 33 },
      { "label": "Classe 34 - Tabaco e artigos para fumantes; fósforos", "value": 34 }
    ]
  },
  {
    "id": "form_1.5_classe_servico",
    "category": "form",
    "subcategory": "CLASSIFICAÇÃO",
    "text": "Qual a classe de classificação?",
    "dependsOn": { "questionId": "form_1.5", "value": "servico" },
    "options": [
      { "label": "Classe 35 - Propaganda; gestão, organização e administração de negócios", "value": 35 },
      { "label": "Classe 36 - Serviços financeiros, monetários, bancários e imobiliários", "value": 36 },
      { "label": "Classe 37 - Serviços de construção, instalação e reparos", "value": 37 },
      { "label": "Classe 38 - Serviços de telecomunicações", "value": 38 },
      { "label": "Classe 39 - Transporte; embalagem e armazenamento de mercadorias", "value": 39 },
      { "label": "Classe 40 - Tratamento de materiais; reciclagem de resíduos", "value": 40 },
      { "label": "Classe 41 - Educação; provimento de treinamento; entretenimento", "value": 41 },
      { "label": "Classe 42 - Serviços científicos e tecnológicos; design e desenvolvimento de software", "value": 42 },
      { "label": "Classe 43 - Serviços de fornecimento de comida e bebida; alojamento temporário", "value": 43 },
      { "label": "Classe 44 - Serviços médicos, veterinários; cuidados de higiene e beleza", "value": 44 },
      { "label": "Classe 45 - Serviços jurídicos; serviços de segurança; serviços pessoais e sociais", "value": 45 }
    ]
  },
  {
    "id": "form_1.6a",
    "category": "form",
    "subcategory": "ATIVIDADE",
    "text": "Sobre a segurança dos dados em seu ambiente digital",
    "options": [
      { "label": "Não temos qualquer solução de segurança de dados", "value": "nenhuma_seguranca" },
      { "label": "Possuímos políticas e práticas de privacidade", "value": "politicas_privacidade" },
      { "label": "LGPD compliance", "value": "lgpd" }
    ]
  },
  {
    "id": "form_1.7",
    "category": "form",
    "subcategory": "FUNCIONÁRIOS",
    "text": "Número de Funcionários",
    "options": [
      { "label": "0 - 10 funcionários", "value": "0_10" },
      { "label": "10 - 50 funcionários", "value": "10_50" },
      { "label": "50 - 100 funcionários", "value": "50_100" },
      { "label": "100 - 200 funcionários", "value": "100_200" },
      { "label": "Acima de 200 funcionários", "value": "200_plus" }
    ]
  },
  {
    "id": "form_1.8",
    "category": "form",
    "subcategory": "SEDE",
    "text": "Cidade",
    "inputType": "text"
  },
  {
    "id": "form_1.9",
    "category": "form",
    "subcategory": "SEDE",
    "text": "Estado",
    "inputType": "select",
    "options": [
      { "label": "Acre", "value": "AC" }, { "label": "Alagoas", "value": "AL" }, { "label": "Amapá", "value": "AP" }, { "label": "Amazonas", "value": "AM" }, { "label": "Bahia", "value": "BA" }, { "label": "Ceará", "value": "CE" }, { "label": "Distrito Federal", "value": "DF" }, { "label": "Espírito Santo", "value": "ES" }, { "label": "Goiás", "value": "GO" }, { "label": "Maranhão", "value": "MA" }, { "label": "Mato Grosso", "value": "MT" }, { "label": "Mato Grosso do Sul", "value": "MS" }, { "label": "Minas Gerais", "value": "MG" }, { "label": "Pará", "value": "PA" }, { "label": "Paraíba", "value": "PB" }, { "label": "Paraná", "value": "PR" }, { "label": "Pernambuco", "value": "PE" }, { "label": "Piauí", "value": "PI" }, { "label": "Rio de Janeiro", "value": "RJ" }, { "label": "Rio Grande do Norte", "value": "RN" }, { "label": "Rio Grande do Sul", "value": "RS" }, { "label": "Rondônia", "value": "RO" }, { "label": "Roraima", "value": "RR" }, { "label": "Santa Catarina", "value": "SC" }, { "label": "São Paulo", "value": "SP" }, { "label": "Sergipe", "value": "SE" }, { "label": "Tocantins", "value": "TO" }
    ]
  },
  {
    "id": "form_1.10",
    "category": "form",
    "subcategory": "PROPRIEDADE",
    "text": "A empresa pertence a:",
    "options": [
      { "label": "Propriedade familiar", "value": "familiar" },
      { "label": "Pertence a mulheres", "value": "mulheres" },
      { "label": "Pertence a pessoa LGBTQIAPN+", "value": "lgbtqiapn" },
      { "label": "Pertence a pessoa negra ou indígena", "value": "negra_indigena" },
      { "label": "Pessoa com deficiência", "value": "deficiencia" }
    ]
  }
];

// Note: You need a service account key file to run this script.
const SERVICE_ACCOUNT_PATH = './service-account.json';

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('Error: service-account.json not found.');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

interface Question {
  id: string;
  category: string;
  subcategory?: string;
  text: string;
  description?: string;
  options?: any[];
  inputType?: string;
  dependsOn?: any;
}

async function importQuestions() {
  const formsDir = path.join(__dirname, '../Forms');
  const files = [
    { name: '3. SIMB 2024 - AMBIENTAL.csv', category: 'environmental' },
    { name: '4. SIMB 2024 - SOCIAL.csv', category: 'social' },
    { name: '5. SIMB 2024 - GOVERNANÇA.csv', category: 'governance' }
  ];

  const questions: Question[] = [...(diagnosticQuestions as any)];

  for (const file of files) {
    console.log(`Processing ${file.name}...`);
    const filePath = path.join(formsDir, file.name);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true
    });

    let currentSubcategory = '';
    let currentQuestion: Question | null = null;

    for (const row of records) {
      const tema = row['TEMA'] || row['TEMA MATERIAL'];
      const subId = row[''] || row['SUB'];
      const text = row['PERGUNTA'];
      
      if (text && (subId || row['DIMENSÃO'] || row['TEMA'])) {
        if (currentQuestion) questions.push(currentQuestion);
        
        currentSubcategory = tema || currentSubcategory;
        
        currentQuestion = {
          id: `${file.category}_${subId || (questions.length + 1)}`,
          category: file.category,
          subcategory: currentSubcategory,
          text: text,
          inputType: 'radio',
          options: []
        };
      } else if (text && currentQuestion) {
        const label = text.replace(/^\d+[\)\.]\s*/, '').trim();
        const value = row['PONTUAÇÃO'] || row['PONTOS'] || label;
        
        currentQuestion.options?.push({
          label,
          value: isNaN(Number(value)) ? value : Number(value),
          points: Number(row['PONTUAÇÃO'] || row['PONTOS'] || 0),
          weight: Number((row['PESO'] || '1').replace(',', '.')),
          message: row['MENSAGEM'] || row['POR QUE ISSO É IMPORTANTE?'] || row['RELEVÂNCIA'],
          recommendation: row['RECOMENDAÇÕES']
        });
      }
    }
    if (currentQuestion) questions.push(currentQuestion);
  }

  console.log(`Parsed ${questions.length} questions. Uploading to Firestore...`);

  const batchSize = 500;
  for (let i = 0; i < questions.length; i += batchSize) {
    const batch = db.batch();
    const chunk = questions.slice(i, i + batchSize);
    
    chunk.forEach(q => {
      const docRef = db.collection('questions').doc(q.id);
      batch.set(docRef, q);
    });

    await batch.commit();
    console.log(`Uploaded batch ${Math.floor(i / batchSize) + 1}`);
  }

  console.log('Import completed successfully!');
}

importQuestions().catch(console.error);

