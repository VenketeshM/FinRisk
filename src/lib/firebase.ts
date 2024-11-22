import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAOJhx93QD2cyudxIzzlWRpN6pHio3pxsE",
  authDomain: "finrisk-99b78.firebaseapp.com",
  projectId: "finrisk-99b78",
  storageBucket: "finrisk-99b78.firebasestorage.app",
  messagingSenderId: "282325061117",
  appId: "1:282325061117:web:4fd4fc0f11e468ea945d94",
  measurementId: "G-4PPPNFQ2BD"
};

console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
}); // For debugging

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only in browser environment
if (typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
}