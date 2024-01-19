// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe2yB0fyZ7oUoPswGp2N80IoalAq71wT4",
  authDomain: "checkoutfuture.firebaseapp.com",
  projectId: "checkoutfuture",
  storageBucket: "checkoutfuture.appspot.com",
  messagingSenderId: "537549904005",
  appId: "1:537549904005:web:759f0312c6a16b4aa631ec"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();