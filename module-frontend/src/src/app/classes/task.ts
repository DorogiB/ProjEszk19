import { Skill } from './skill';
import { Project } from 'src/app/classes/projects';
import { User } from './user';

/**
 * Representation of a task.
 *
 * @export
 * @class Task
 */
export class Task {

  /**
   * Task ID.
   *
   * @type {number}
   * @memberof Task
   */
  public id: number;

  /**
   * Name of the task.
   *
   * @type {string}
   * @memberof Task
   */
  public name: string;

  /**
   * List of skills required by this task.
   *
   * @memberof Task
   */
  public requiredSkills;

  /**
   * List of users assigned to this task.
   *
   * @type {User[]}
   * @memberof Task
   */
  public assignees: User[];

  /**
   * List of prerequisites. These task have to be completed
   * before assignees can start working on this task.
   *
   * @type {Task[]}
   * @memberof Task
   */
  public prerequisites: Task[];

  /**
   * List of task that are requiring this task to be done.
   * These tasks cannot be started before this task is not
   * completed.
   *
   * @type {Task[]}
   * @memberof Task
   */
  public requiredBy: Task[];

  /**
   * TRUE if the task is completed. Otherwise FASLE.
   *
   * @type {boolean}
   * @memberof Task
   */
  public complete: boolean;

  /**
   * Date and time when members started working on
   * this task. NULL if not yet started.
   *
   * @type {Date}
   * @memberof Task
   */
  public startTime: Date;

  /**
   * Date and time when a member completed this task.
   * NULL if not yet completed.
   *
   * @type {Date}
   * @memberof Task
   */
  public endTime: Date;

  /**
   * Name of the member who completed the task.
   *
   * @type {string}
   * @memberof Task
   */
  public completedBy: string;
  
  /**
   * TRUE if anybody can join to this task.
   * FALSE if only the project leader can add members.
   *
   * @type {boolean}
   * @memberof Task
   */
  public isOpen: boolean;

  /**
   *
   *
   * @type {Project}
   * @memberof Task
   */
  public project: Project;

  /**
   *
   *
   * @type {number}
   * @memberof Task
   */
  public projectId: number;

  /**
   * State of the project. (0: Not available; 1: Available; 2: In progress;
   * 3: Completed)
   *
   * @type {number}
   * @memberof Task
   */
  public state: number;


  /**
   * Creates an instance of Task.
   * 
   * @ignore
   * @memberof Task
   */
  constructor() {
    this.requiredSkills = [];
    this.assignees = [];
    this.prerequisites = [];
    this.requiredBy = [];
    this.complete = false;
    this.isOpen = false;
    this.state = 1;
  }
}
