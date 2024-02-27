// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection } from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDP6mYz_O44SHJNxIdLpEFMa81qEbtHurU",
    authDomain: "noteapp-46a07.firebaseapp.com",
    projectId: "noteapp-46a07",
    storageBucket: "noteapp-46a07.appspot.com",
    messagingSenderId: "761174305167",
    appId: "1:761174305167:web:02620782dbc49de1ca03fa",
    measurementId: "G-L598TRB6GF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
