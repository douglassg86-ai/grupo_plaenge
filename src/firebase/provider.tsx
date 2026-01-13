'use client';

import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export const FirebaseContext = createContext<{
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
} | null>(null);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }

  return context;
};

export const useFirebaseApp = () => useFirebase()?.firebaseApp;
export const useFirestore = () => useFirebase()?.firestore;
export const useAuth = () => useFirebase()?.auth;

export function FirebaseProvider(
  props: PropsWithChildren<{
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  }>
) {
  const { firebaseApp, firestore, auth, children } = props;
  return (
    <FirebaseContext.Provider value={{ firebaseApp, firestore, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}
