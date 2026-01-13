'use client';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { PropsWithChildren, useEffect, useState } from 'react';

import { firebaseConfig } from './config';
import { FirebaseProvider } from './provider';

// This is a workaround to allow the Firebase client to be initialized only once.
// We are using a client component to initialize the Firebase client, and then
// passing the initialized client to the FirebaseProvider.
//
// The issue is that if we initialize the Firebase client in a server component,
// the client will be initialized on every request. This is not ideal, as it
// will create a new connection to the Firebase backend on every request.
//
// By using a client component, we can ensure that the Firebase client is
// initialized only once, when the component is mounted.
export function FirebaseClientProvider(props: PropsWithChildren) {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setFirebaseApp(app);
    setFirestore(getFirestore(app));
    setAuth(getAuth(app));
  }, []);

  if (!firebaseApp || !firestore || !auth) {
    return null;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      firestore={firestore}
      auth={auth}
    >
      {props.children}
    </FirebaseProvider>
  );
}
