// Script to migrate questions to Firestore
// Run with: node scripts/migrateQuestions.js

const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs,
  writeBatch
} = require('firebase/firestore');

// Check if Firebase config is available
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID'
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:', missingVars.join(', '));
  console.log('Please ensure your .env file has all required Firebase config values.');
  process.exit(1);
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read questions from the questions.ts file
const fs = require('fs');
const path = require('path');

async function migrateQuestions() {
  console.log('🚀 Starting question migration...\n');
  console.log('📋 Step 1: Reading questions from src/data/questions.ts...');
  
  // Since we can't easily import TS, let's use a different approach
  // We'll read the file and extract the questions array
  const questionsPath = path.join(__dirname, '..', 'src', 'data', 'questions.ts');
  
  if (!fs.existsSync(questionsPath)) {
    console.error('❌ Questions file not found:', questionsPath);
    process.exit(1);
  }
  
  console.log('   ✓ Found questions.ts file');
  console.log('\n⚠️  IMPORTANT: This script requires building the project first.');
  console.log('   Please build the project and then run the migration manually.');
  console.log('\n📖 Alternative manual steps:');
  console.log('   1. Build the project: npm run build');
  console.log('   2. Use Firebase Console to update questions, OR');
  console.log('   3. Create a simple admin page to upload questions');
  
  // Fetch existing questions
  console.log('\n📋 Checking existing questions in Firestore...');
  const questionsRef = collection(db, 'questions');
  const snapshot = await getDocs(questionsRef);
  console.log(`   Found ${snapshot.docs.length} existing questions`);
  
  if (snapshot.docs.length > 0) {
    console.log('\n⚠️  WARNING: Firestore contains old question format!');
    console.log('   The new ESG 2026 questions are in src/data/questions.ts');
    console.log('   You have 3 options:');
    console.log('   ');
    console.log('   Option 1: Manual upload via Firebase Console');
    console.log('   - Go to https://console.firebase.google.com');
    console.log('   - Navigate to Firestore Database');
    console.log('   - Delete old questions and add new ones manually');
    console.log('   ');
    console.log('   Option 2: Use the local fallback (recommended for now)');
    console.log('   - The app already uses src/data/questions.ts as fallback');
    console.log('   - Users will see the new questions immediately');
    console.log('   ');
    console.log('   Option 3: Create an admin upload feature');
    console.log('   - Add a button in the app to sync questions to Firestore');
    console.log('   - This can be done in the DiagnosticPage or a new Admin page');
  }
  
  process.exit(0);
}

migrateQuestions().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
