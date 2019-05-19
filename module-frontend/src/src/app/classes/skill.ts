import { User } from 'src/app/classes/user';
import { Task } from 'src/app/classes/task';

/**
 * Representation of a user skill.
 *
 * @export
 * @class Skill
 */
export class Skill {

  /**
   *
   *
   * @type {number}
   * @memberof Skill
   */
  public id: number;

  /**
   * Name of the skill.
   *
   * @type {string}
   * @memberof Skill
   */
  public name: string;

  /**
   * List of users having this skill.
   *
   * @type {User[]}
   * @memberof Skill
   */
  public owners: User[];

  /**
   * List of tasks requiring this skill.
   *
   * @type {Task[]}
   * @memberof Skill
   */
  public requiredBy: Task[];

  /**
   * Creates an instance of Skill.
   * 
   * @param {string} name Name of skill.
   * @memberof Skill
   */
  constructor(name: string) {
    this.name = name;
    this.owners = [];
    this.requiredBy = [];
  }
}
