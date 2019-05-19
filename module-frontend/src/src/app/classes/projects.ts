import { User } from './user';

/**
 * Representation of a project.
 *
 * @export
 * @class Project
 */
export class Project {
  
  /**
   * Project ID.
   *
   * @type {number}
   * @memberof Project
   */
  public id: number;

  /**
   * Name of the project.
   *
   * @type {string}
   * @memberof Project
   */
  public name: string;

  /**
   * The owner of the project.
   *
   * @type {User}
   * @memberof Project
   */
  public leader: User;

  /**
   * ???
   *
   * @type {number}
   * @memberof Project
   */
  public leaderId: number;

  /**
   * IDs of project members.
   *
   * @type {number[]}
   * @memberof Project
   */
  public members: number[];

  /**
   * IDs of tasks associated with the project.
   *
   * @type {number[]}
   * @memberof Project
   */
  public tasks: number[];

  /**
   * Date of project's deadline.
   *
   * @type {Date}
   * @memberof Project
   */
  public deadline: Date;

  /**
   * Creates an instance of Project.
   * 
   * @param {string} name Name of the project.
   * @param {number} leaderId User ID of the project owner.
   * @memberof Project
   */
  constructor(name: string, leaderId: number) {
    this.name = name;
    this.leaderId = leaderId;
  }
}
