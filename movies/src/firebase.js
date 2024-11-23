import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDT9Ea3QTKr2UcHfALyfV1GO_wTuFfuCjc",
    authDomain: "react-movies-d05e8.firebaseapp.com",
    projectId: "react-movies-d05e8",
    storageBucket: "react-movies-d05e8.firebasestorage.app",
    messagingSenderId: "445343672324",
    appId: "1:445343672324:web:b0cfe40201d0c114912d51",
    measurementId: "G-8F40FX2H3G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 