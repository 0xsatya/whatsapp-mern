import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCO8qHi09RxoQKhcw5m_E64qdxj6pgdpMQ",
    authDomain: "whatsapp-mern-4599b.firebaseapp.com",
    projectId: "whatsapp-mern-4599b",
    storageBucket: "whatsapp-mern-4599b.appspot.com",
    messagingSenderId: "308731426780",
    appId: "1:308731426780:web:1844332f52787262784119"
  };

  const firebaseApp = firebase.initializeApp (firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;
