import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, collection, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to emulators
connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(db, 'localhost', 8080);

const seedData = async () => {
  try {
    // Create test user
    const userCredential = await signInWithEmailAndPassword(auth, 'test@example.com', 'password123');
    const userId = userCredential.user.uid;

    // Add user profile
    await setDoc(doc(db, 'users', userId), {
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date().toISOString(),
    });

    // Add sample portfolio
    await setDoc(doc(db, `users/${userId}/portfolios`, 'default'), {
      name: 'Default Portfolio',
      createdAt: new Date().toISOString(),
      stocks: [
        { symbol: 'AAPL', shares: 10 },
        { symbol: 'GOOGL', shares: 5 },
        { symbol: 'MSFT', shares: 8 },
      ],
    });

    // Add sample watchlist
    await setDoc(doc(db, `users/${userId}/watchlist`, 'default'), {
      name: 'Default Watchlist',
      stocks: ['TSLA', 'NVDA', 'AMD'],
      createdAt: new Date().toISOString(),
    });

    console.log('Test data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
