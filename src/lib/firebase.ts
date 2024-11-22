import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAxmxXslE3lwLBcrENSo9Lm922Ul5aRkHI",
  authDomain: "fintech-risk-management.firebaseapp.com",
  projectId: "fintech-risk-management",
  storageBucket: "fintech-risk-management.firebasestorage.app",
  messagingSenderId: "918915005871",
  appId: "1:918915005871:web:2868c7ff7875645689035a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only in browser environment
if (typeof window !== 'undefined') {
  export const analytics = getAnalytics(app);
}