import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB9zZ-ME_ouV3SX2gYaZsE2fD2a30_dYdQ",
  authDomain: "todo-c3bb2.firebaseapp.com",
  projectId: "todo-c3bb2",
  storageBucket: "todo-c3bb2.appspot.com",
  messagingSenderId: "25359745853",
  appId: "1:25359745853:web:86142fff7727b235417b54"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//добавляем в и получаем из

async function add() {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: "Задача 3",
      status: "active",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function get() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().title}`);
});
  
}
add();
get();
