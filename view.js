export function createView(selector, onClickTodo) {
  const node = document.querySelector(selector);

  return {
    node,
    renderTodos: function({todosIds, todosById}) {
      todosIds.forEach((id) => {
        this.addTodo(todosById[id]);
      });
    },
    clearTodos: function() { //очистить при нажатии на кнопку
      this.node.innerHTML = '';
    },
     
    addTodo: function(todo) { //умеет собрать элемент каждой todo
      const div = document.createElement('div');
      const input = document.createElement('input');
      const label = document.createElement('label');

      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', todo.id);

      input.onclick = () => { //определяем id todo, на котором произошел клик
        onClickTodo(todo.id);
      }

      if (todo.done) {
        input.setAttribute('checked', true)
      }

      label.innerText = todo.title,
      label.setAttribute('for', todo.id);

      div.append(input, label);

      this.node.append(div);
    }
  }
}