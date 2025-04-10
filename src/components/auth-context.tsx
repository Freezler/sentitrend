"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

interface AuthContextType {
  user: any | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!firebaseConfig.apiKey) {
      console.warn("Firebase API key not found. Authentication will not work.");
      setLoading(false);
      return;
    }

    try {
      const newApp = initializeApp(firebaseConfig);
      const newAuth = getAuth(newApp);

      setApp(newApp);
      setAuth(newAuth);

      const unsubscribe = newAuth.onAuthStateChanged(
        (user) => {
          setUser(user);
          setLoading(false);
        },
        (error) => {
          console.error("Firebase Auth Error:", error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error: any) {
      console.error("Firebase initialization error:", error);
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) {
      console.error("Firebase Auth not initialized.");
      return;
    }

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const signOutHandler = async () => {
    if (!auth) {
      console.error("Firebase Auth not initialized.");
      return;
    }

    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  const value = {
    user,
    signInWithGoogle,
    signOut: signOutHandler,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
