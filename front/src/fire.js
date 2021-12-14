import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDczS28eMoi0Ou8_wNqMt6IM-FT45AtKw4",
  authDomain: "react-crud-6670f.firebaseapp.com",
  databaseURL: "https://react-crud-6670f-default-rtdb.firebaseio.com",
  projectId: "react-crud-6670f",
  storageBucket: "react-crud-6670f.appspot.com",
  messagingSenderId: "370903823602",
  appId: "1:370903823602:web:7ca102d35295901197cc6b"
};

// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();