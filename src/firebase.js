import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBLlFXyzwH7eW01j8HMix-CSc6ttGrGipQ",
    authDomain: "assignment-8f7ac.firebaseapp.com",
    projectId: "assignment-8f7ac",
    storageBucket: "assignment-8f7ac.appspot.com",
    messagingSenderId: "16746030568",
    appId: "1:16746030568:web:456762c6b5c047668db05d",
    measurementId: "G-BW398M7D4X"

});

const db = firebase.firestore();
const auth = firebase.auth();


export { db, auth };