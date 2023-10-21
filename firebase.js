import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDEvCcHUMbqPLudjaHDgX4YyspqHtxd63g",
    authDomain: "eatwell-6c0d8.firebaseapp.com",
    projectId: "eatwell-6c0d8",
    storageBucket: "eatwell-6c0d8.appspot.com",
    messagingSenderId: "255969282670",
    appId: "1:255969282670:web:333f2a4fe12645cb17f47f",
    measurementId: "G-EJ30T0ETE3"
};

// Inicialize o Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Obtenha uma referência para o Firestore
const db = firebase.firestore();

export default db;

