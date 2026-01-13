// This is a modified version of the useDocument hook from the react-firebase-hooks library.
// The original library is not yet compatible with the new App Router.
'use client';
import {
  DocumentData,
  DocumentReference,
  FirestoreError,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useDoc = <T = DocumentData,>(
  docRef: DocumentReference<T> | undefined,
  options?: {
    snapshotListenOptions?: any;
  }
) => {
  const [value, setValue] = useState<T | undefined>();
  const [error, setError] = useState<FirestoreError>();

  const { snapshotListenOptions } = options ?? {};

  useEffect(() => {
    if (!docRef) return;
    const unsubscribe = onSnapshot(
      docRef,
      {
        ...snapshotListenOptions,
      },
      (snapshot) => {
        setValue(snapshot.data());
      },
      (error) => {
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  return { data: value, error };
};
