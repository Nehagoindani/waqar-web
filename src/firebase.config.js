import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCN46EL7ZbzdrP6-Fie2DC2yCLH97ji0U4",
    authDomain: "waqar-salon-app-73343.firebaseapp.com",
    databaseURL: "https://waqar-salon-app-73343-default-rtdb.firebaseio.com",
    projectId: "waqar-salon-app-73343",
    storageBucket: "waqar-salon-app-73343.appspot.com",
    messagingSenderId: "408820122895",
    appId: "1:408820122895:web:ccdcb34ce667114970aa7a"
  };
   
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
 
  export default db;