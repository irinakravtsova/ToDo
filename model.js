import { v4 as uuidv4 } from 'uuid';
//реализуем следующую схему данных
// const todosIds = [id1, id2, id3] //отдельно массив с id
// const todosById = {//ключ id, значение - сама todo
//   id1: {},
//   id2: {},
//   id3: {}
// }

export function createTodosModel(todos) {
  return {
    todosIds: [],
    todosById: {},
    addTodo: function({title}) {//метод добавить новую todo (создает, добавляет во все необходимые структуры и возвращает)
      const todo = {
        title,
        done: false,
        id: uuidv4()
      };
      this.todosIds.push(todo.id);
      this.todosById[todo.id] = todo;

      return todo;
    },
    setTodos: function(todos) {//метод создать список
      this.todosIds = [];
      this.todosById = {};
      
      todos.forEach(todo => {
        this.todosIds.push(todo.id),
        this.todosById[todo.id] = todo;
      });
    },
    getTodos: function() {//метод получить список
      return {
        todosById: this.todosById,
        todosIds: this.todosIds
      };
    },
 
    toggleTodo: function(id) {//метод переключить todo
      this.todosById[id].done = !this.todosById[id].done
    },
    getTodo: function(id) {//получить todo
      return this.todosById[id];
    }
  }
    
}
