import firebase from "firebase/app";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyADXHTBFP7jUMI7apfBTKD9YPEod51tlSA",
  authDomain: "todo-app-aeb25.firebaseapp.com",
  projectId: "todo-app-aeb25",
  storageBucket: "todo-app-aeb25.appspot.com",
  messagingSenderId: "864577890664",
  appId: "1:864577890664:web:85d2397748620899310edd",
};
firebase.initializeApp(config);
const db = firebase.firestore();
const todoCollection = db.collection("todo");
export { todoCollection };
