import { Task } from 'src/app/classes/task';
import { Skill } from './skill';
import { Project } from 'src/app/classes/projects';

/**
 * Representation of a user.
 *
 * @export
 * @class User
 */
export class User {
  
  /**
   * User ID.
   *
   * @type {number}
   * @memberof User
   */
  public id: number;

  /**
   * Full name of the user.
   *
   * @type {string}
   * @memberof User
   */
  public name: string;

  /**
   * Username of the user.
   *
   * @type {string}
   * @memberof User
   */
  public username: string;

  /**
   * User's password. (Not stored on frontend.)
   *
   * @type {string}
   * @memberof User
   */
  public password: string;

  /**
   * List of projects where this user is contributing.
   *
   * @type {Project[]}
   * @memberof User
   */
  public projects: Project[];

  /**
   * List of users own projects.
   *
   * @type {Project[]}
   * @memberof User
   */
  public ownedProjects: Project[];

  /**
   * List of user's own skills.
   *
   * @type {Skill[]}
   * @memberof User
   */
  public skills: Skill[];

  /**
   * List of tasks where this user is assigned to.
   *
   * @type {Task[]}
   * @memberof User
   */
  public assignedTasks: Task[];

  /**
   * Creates an instance of User.
   * 
   * @param {string} name Name of user.
   * @param {string} userName Username of user.
   * @param {string} password Password of user.
   * @memberof User
   */
  constructor(name: string, userName: string, password: string) {
    this.name = name;
    this.username = userName;
    this.password = password;
    this.projects = [];
    this.ownedProjects = [];
    this.skills = [];
    this.assignedTasks = [];
  }
}
