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
  appId: "1:918915005871:web:09d672c4a5d9002389035a",
  measurementId: "G-HE1QSBMYS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);