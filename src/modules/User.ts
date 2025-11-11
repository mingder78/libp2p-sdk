import Todo from './Todo';

/**
 * Creates a new User
 * @property {number} id - User Id
 * @property {string} username - User username
 * @method addTodo {Function} - Adds new todo
 * @method getTodos {Function} - Retrieves all todos
 */
export default class User {
  id: number;
  username: string;
  #todos: Todo[] = [];

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
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
