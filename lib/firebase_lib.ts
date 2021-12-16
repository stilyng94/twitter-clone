import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCBanhqfx5JIPT8-TQqApHbyCmWIXMYcic",
  authDomain: "firetest-flavours-production.firebaseapp.com",
  projectId: "firetest-flavours-production",
  storageBucket: "firetest-flavours-production.appspot.com",
  messagingSenderId: "196427420902",
  appId: "1:196427420902:web:28d0797b1b0cb6b2911727",
  measurementId: "G-HLSLPRT92Z"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getFirestore(app);
const storage = getStorage(app)

export default app;
export { database, storage }