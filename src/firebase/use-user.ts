// This is a modified version of the useAuthState hook from the react-firebase-hooks library.
// The original library is not yet compatible with the new App Router.
'use client';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuth } from './provider';

export const useUser = () => {
  const [user, setUser] = useState<User | null>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const auth = useAuth();
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  return { user, loading, error };
};
