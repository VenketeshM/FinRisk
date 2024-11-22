import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Asset {
  id?: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  type: 'stock' | 'crypto' | 'etf';
  userId: string;
}

export async function addAsset(asset: Omit<Asset, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'assets'), asset);
    return { id: docRef.id, ...asset };
  } catch (error) {
    console.error('Error adding asset:', error);
    throw error;
  }
}

export async function getUserAssets(userId: string) {
  try {
    const q = query(collection(db, 'assets'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Asset[];
  } catch (error) {
    console.error('Error getting user assets:', error);
    throw error;
  }
}

export async function updateAsset(id: string, data: Partial<Asset>) {
  try {
    const assetRef = doc(db, 'assets', id);
    await updateDoc(assetRef, data);
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
}

export async function deleteAsset(id: string) {
  try {
    await deleteDoc(doc(db, 'assets', id));
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
}