import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "indicador-de-temperatura.firebaseapp.com",
  databaseURL: "https://indicador-de-temperatura-default-rtdb.firebaseio.com",
  projectId: "indicador-de-temperatura",
  storageBucket: "indicador-de-temperatura.firebasestorage.app",
  messagingSenderId: "1070417547049",
  appId: "1:1070417547049:web:3edf592cfe9499a26b3138",
  measurementId: "G-RDP1C27Z03",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
