// Script to migrate questions to Firestore
// Run with: npx ts-node scripts/migrateQuestions.ts

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc,
  getDocs,
  writeBatch
} from 'firebase/firestore';

// Your Firebase config (from .env or firebase config)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Import the new questions
import { diagnosticQuestions } from '../src/data/questions';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateQuestions() {
  console.log('🚀 Starting question migration...\n');
  
  // Step 1: Get all existing questions
  console.log('📋 Step 1: Fetching existing questions...');
  const questionsRef = collection(db, 'questions');
  const snapshot = await getDocs(questionsRef);
  const existingQuestions = snapshot.docs.map(d => d.id);
  console.log(`   Found ${existingQuestions.length} existing questions`);
  
  // Step 2: Delete old questions in batches
  if (existingQuestions.length > 0) {
    console.log('\n🗑️  Step 2: Deleting old questions...');
    const batch = writeBatch(db);
    
    for (const questionId of existingQuestions) {
      const questionDoc = doc(db, 'questions', questionId);
      batch.delete(questionDoc);
    }
    
    await batch.commit();
    console.log(`   ✓ Deleted ${existingQuestions.length} old questions`);
  } else {
    console.log('\n✓ No existing questions to delete');
  }
  
  // Step 3: Upload new questions
  console.log('\n📤 Step 3: Uploading new ESG 2026 questions...');
  let uploaded = 0;
  
  for (const question of diagnosticQuestions) {
    const questionDoc = doc(db, 'questions', question.id);
    await setDoc(questionDoc, question);
    uploaded++;
    
    if (uploaded % 10 === 0) {
      console.log(`   Progress: ${uploaded}/${diagnosticQuestions.length} questions uploaded...`);
    }
  }
  
  console.log(`   ✓ Successfully uploaded ${uploaded} questions`);
  
  console.log('\n✅ Migration completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Deleted: ${existingQuestions.length} old questions`);
  console.log(`   - Uploaded: ${uploaded} new ESG 2026 questions`);
  console.log(`   - Categories: Form, Environmental, Social, Governance`);
  
  process.exit(0);
}

migrateQuestions().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
