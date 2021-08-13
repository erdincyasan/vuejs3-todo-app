import firebase from "firebase/app";
import "firebase/firestore";
const config = {
 //firebase-configs
};
firebase.initializeApp(config);
const db = firebase.firestore();
const todoCollection = db.collection("todo");
export { todoCollection };
