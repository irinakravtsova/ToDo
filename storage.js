import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  writeBatch, 
  serverTimestamp, 
  query, 
  orderBy,
  updateDoc
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB9zZ-ME_ouV3SX2gYaZsE2fD2a30_dYdQ",
  authDomain: "todo-c3bb2.firebaseapp.com",
  projectId: "todo-c3bb2",
  storageBucket: "todo-c3bb2.appspot.com",
  messagingSenderId: "25359745853",
  appId: "1:25359745853:web:86142fff7727b235417b54"
};

export function createStorage(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {//получить todo и данные
    key,
    db,
    pull: async function() { //асинхронный метод обращается по сети и получает данные из хранилища, ф-я копируется из firebase get()
      const ref = collection(this.db, this.key)
      const q = query(ref, orderBy("createdAt")); //сделай порядок задач по полю createdAd
      const querySnapshot = await getDocs(q); //коллекция из хранилища
     
      const todos = []; //локальный массив- создай пустой массив

      querySnapshot.forEach((doc) => { //перебирая данные коллекции из коллекции хранилища
        todos.push({  //добавь в массив набор объектов, состоящих из id и title
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done
        });

    
        // console.log(`${doc.id} => ${doc.data().title}`);
    });
    return todos;
      
      // const data = localStorage.getItem(this.key);

      // if (!data) {
      //   return null;
      // }

      // return JSON.parse(data);
    },
    // push: function(data) {
    //   const preparedData = JSON.stringify(data);
    //   localStorage.setItem(this.key, preparedData);
    // } 
    push: async function(todo) {//добавить новую todo
      try {
        await setDoc(doc(this.db, this.key, todo.id), {//заменили add на set (add автоматически генерирует id)
          title: todo.title,
          done: todo.done,
          createdAt: serverTimestamp()//+ дату создания для сортировки
        });
       
      } catch (e) {
          console.error("Error adding document: ", e);
      }
     
    },

    delete: async function ({ todosIds }) {//механизм батчей (в одном механизме описать набор разных операций)
      const batch = writeBatch(this.db);
      
      todosIds.forEach((id) => { //пройти по каждой туду и создать операцию удаления каждой
        const ref = doc(this.db, this.key, id);
        batch.delete(ref);//ставить в очередь на удаление
      });
      await batch.commit(); //удаление всех
    },
    update: async function(todo) {// обновление
      const ref = doc(this.db, this.key, todo.id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(ref, {
        done: todo.done
      });
    }
  }
}