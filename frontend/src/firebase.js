import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC5R68N0pGDkI2otSvF2L902yK6fRRjIE8",
    authDomain: "afproject-bf42f.firebaseapp.com",
    projectId: "afproject-bf42f",
    storageBucket: "afproject-bf42f.appspot.com",
    messagingSenderId: "1060228637419",
    appId: "1:1060228637419:web:417bd8627787ed344154ae",
    measurementId: "G-XP68J8XW22"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://afproject-bf42f.appspot.com");

export default storage;


