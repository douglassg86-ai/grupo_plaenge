// This is a modified version of the useCollection hook from the react-firebase-hooks library.
// The original library is not yet compatible with the new App Router.
'use client';
import {
  DocumentData,
  FirestoreError,
  Query,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useFirestore } from './provider';

export const useCollection = <T = DocumentData,>(
  query: Query<T> | null,
  options?: {
    snapshotListenOptions?: any;
  }
) => {
  const [value, setValue] = useState<{ docs: T[]; loading: boolean }>();
  const [error, setError] = useState<FirestoreError>();

  const { snapshotListenOptions } = options ?? {};

  const firestore = useFirestore();

  useEffect(() => {
    if (!query || !firestore) {
      return;
    }
    const unsubscribe = onSnapshot(
      query,
      {
        ...snapshotListenOptions,
      },
      (snapshot) => {
        const result = snapshot.docs.map((doc) => doc.data());
        setValue({ docs: result, loading: false });
      },
      (error) => {
        console.error(error);
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [query, firestore]);

  return { data: value?.docs, loading: value?.loading, error };
};
