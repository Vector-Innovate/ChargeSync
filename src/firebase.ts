import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCt88JCjsGfOA1FWylVMNkOzA1MWdXS5J0",
    authDomain: "codevoltz-ae1c3.firebaseapp.com",
    projectId: "codevoltz-ae1c3",
    storageBucket: "codevoltz-ae1c3.firebasestorage.app",
    messagingSenderId: "295508994710",
    appId: "1:295508994710:web:73b09a29a6e45c05b570b7",
    measurementId: "G-W4HZE23XB4"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();