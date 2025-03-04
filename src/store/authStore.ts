import { create } from 'zustand';
import { User } from '../types';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: 'partner' | 'customer') => Promise<void>;
  loginWithGoogle: (userType: 'partner' | 'customer') => Promise<void>;
  signup: (email: string, password: string, name: string, userType: 'partner' | 'customer') => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email, password, userType) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Create user object with Firebase user data and selected type
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName || email.split('@')[0],
        userType: userType,
      };
      
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },

  loginWithGoogle: async (userType) => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = userCredential.user;
      
      // Create user object with Google user data and selected type
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName!,
        userType: userType,
      };
      
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      throw new Error('Google sign-in failed');
    }
  },
  
  signup: async (email, password, name, userType) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Create user object with Firebase user data and selected type
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: name,
        userType: userType,
      };
      
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      throw new Error('Failed to create account');
    }
  },
  
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem('user');
    } catch (error) {
      throw new Error('Failed to logout');
    }
  },
}));