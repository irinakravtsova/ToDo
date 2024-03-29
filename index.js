//зависимости
import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-button');
const btnClearNode = document.querySelector('.js-clear-btn');

const initialTodos = [];
const model = createTodosModel(initialTodos);
const view = createView('.js-output', handleClickTodo);
const storage = createStorage(TODOS_STORAGE_KEY);

// const storageTodos = storage.pull();//на старте вызови данные из хранилища

storage.pull().then((todos) => { //асинхронная функция, обновляет модель и получая данные из модели отрисовывает
  model.setTodos(todos);
  view.renderTodos(model.getTodos());
});

// if (storageTodos) {
//   model.update(storageTodos); //если там что-то есть, обнови модель
// }

// view.render(model.get()); //и отрисуй

btnNode.addEventListener('click', function() { //при клике добавь содержимое инпута в модель
  const todoTitle = inputNode.value; 
  const todo = model.addTodo({
    title: todoTitle
  });
  
    view.addTodo(todo); //отрисуй

  storage.push(todo);//сохрани в хранилище
  
});

btnClearNode.addEventListener('click', function() { //при клике
  storage.delete(model.getTodos());//получи из модели и удали 
  
  model.setTodos([]);//удали данные из модели

  view.clearTodos();// отрисуй

})

function handleClickTodo(id) {
  model.toggleTodo(id);
  
  storage.update(model.getTodo(id));
}
