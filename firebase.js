import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC5vhXGu_PYKMCn7nsrks2e4K1nZOpZqsQ",
  authDomain: "stephen-chat-app.firebaseapp.com",
  projectId: "stephen-chat-app",
  storageBucket: "stephen-chat-app.appspot.com",
  messagingSenderId: "95937595341",
  appId: "1:95937595341:web:04b96c91c39202d4b56684"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();