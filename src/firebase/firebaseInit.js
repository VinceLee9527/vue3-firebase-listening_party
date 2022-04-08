// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ5gA9pPe3iqRcMS7KMUYH8c06e5-GLY8",
  authDomain: "listening-party-580bf.firebaseapp.com",
  projectId: "listening-party-580bf",
  storageBucket: "listening-party-580bf.appspot.com",
  messagingSenderId: "694182591741",
  appId: "1:694182591741:web:c6dd1c9d76a89afa075294",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const albumsColRef = collection(db, "albums");

export default albumsColRef;
