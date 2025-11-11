/**
 * Creates a new Todo
 * @property {number} id - Todo id
 * @property {string} title - Todo title
 * @property {string} description - Todo description
 * @property {boolean} isCompleted - Todo isCompleted status
 */
export default class Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;

  constructor(id: number, title: string, description: string, isCompleted: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
  }
}
