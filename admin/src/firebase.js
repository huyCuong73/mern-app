import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCCb__-A0uPAtquMCv-wdEPTexoTZpCDyI",
    authDomain: "mern-app-35567.firebaseapp.com",
    projectId: "mern-app-35567",
    storageBucket: "mern-app-35567.appspot.com",
    messagingSenderId: "945694657816",
    appId: "1:945694657816:web:55c65ef2bbc30a947f226d",
    measurementId: "G-LGP50G6WJJ"
};
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase)


export default storage;
