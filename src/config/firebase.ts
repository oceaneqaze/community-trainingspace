
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiNtpcjT0RiJD1SegW0jVI9lJN727qcKI",
  authDomain: "dope-content.firebaseapp.com",
  projectId: "dope-content",
  storageBucket: "dope-content.firebasestorage.app",
  messagingSenderId: "757886940503",
  appId: "1:757886940503:web:409bd832c61607ef28fa12",
  measurementId: "G-SFDMHHHP4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
export default app;
