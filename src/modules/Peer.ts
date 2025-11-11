import Todo from './Todo';

/**
 * Creates a new Peer
 * @property {number} id - Peer Id
 * @property {string} peername - Peer name
 * @method addTodo {Function} - Adds new todo
 * @method getTodos {Function} - Retrieves all todos
 */
export default class Peer {
  id: number;
  peername: string;
  #todos: Todo[] = [];

  constructor(id: number, peername: string) {
    this.id = id;
    this.peername = peername;
  }

  /**
   * Used to add a new todo
   * @param {Todo} todo - New todo
   * @returns {void} - Does not return anything
   */
  addTodo(todo: Todo): void {
    this.#todos.push(todo);
  }

  /**
   * Used to retrieve all todos
   * @returns {Todo[]} - Todos list
   */
  getTodos(): Todo[] {
    return this.#todos;
  }
}
