import { HttpClient } from '@angular/common/http';
import { Skill } from './../classes/skill';
import { AuthenticationService } from './../services/auth.service';
// import { User } from 'src/app/classes/user';
import { DialogAddTaskComponent } from './../dialogs/dialog-add-task/dialog-add-task.component';
import { MatDialog } from '@angular/material';
import { Task } from './../classes/task';
import { TaskService } from './../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Project } from '../classes/projects';
import { ProjectService } from '../services/project.service';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';
import { UserService } from '../services/user.service';
import { dateToString } from '../globals';
import { User } from '../classes/user';

/**
 * This is the key part of the app. This component is responsible for the 
 * task management (dependency tree, etc.) in a project.
 * 
 * NOTE: This component is still being  implemented.
 *
 * @export
 * @class ProjectTasksComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: [
    '../common-styles.scss',
    './project-tasks.component.scss'
  ]
})
export class ProjectTasksComponent implements OnInit {

  /**
   * Reference to a global function.
   *
   * @public
   * @memberof ProjectTasksComponent
   */
  public dateToString;

  /**
   * DagreD3 renderer.
   *
   * @private
   * @memberof ProjectTasksComponent
   */
  private render;

  /**
   * Graph component.
   *
   * @private
   * @memberof ProjectTasksComponent
   */
  private graph;

  /**
   * The SVG DOM element where DagreD3 can render.
   *
   * @private
   * @memberof ProjectTasksComponent
   */
  private svg;

  /**
   * The project which is currently managed by its owner.
   *
   * @type {Project}
   * @memberof ProjectTasksComponent
   */
  public project: Project;

  /**
   * List of all tasks that belong to this project.
   *
   * @type {Task[]}
   * @memberof ProjectTasksComponent
   */
  public tasks: Task[];

  /**
   * This variable holds the selected task which is being edited.
   *
   * @type {Task}
   * @memberof ProjectTasksComponent
   */
  public selectedTask: Task;

  /**
   * 
   *
   * @type {User[]}
   * @memberof ProjectTasksComponent
   */
  public users: User[];

  /**
   * Creates an instance of ProjectTasksComponent.
   * Sets the reference to a global helper function and initializes the
   * 'project' variable.
   * 
   * @param {ActivatedRoute} route
   * @param {ProjectService} projectService
   * @param {TaskService} taskService
   * @param {UserService} userService
   * @param {AuthenticationService} authService
   * @param {MatDialog} dialog
   * @memberof ProjectTasksComponent
   */
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.dateToString = dateToString;
    this.project = new Project('', 0);
  }

  async ngOnInit() {
    this.svg = d3.select('svg');
    this.render = new dagreD3.render();

    this.initGraph();
  }

  /**
   * Initializes the task dependency graph.
   *
   * @private
   * @returns
   * @memberof ProjectTasksComponent
   */
  private async initGraph() {

    const projectID: number = parseInt(this.route.snapshot.paramMap.get('pid'), 10);
    this.project = await this.projectService.getProject(projectID);
    if (this.project.tasks === undefined) {
      this.project.tasks = [];
    }

    console.log('PROJECT:', this.project);

    const allTasks: Task[] = await this.taskService.getTasks();
    this.tasks = allTasks.filter(task => task.project.id === this.project.id);

    console.log('PROJECT TASKS:', this.tasks);

    this.graph = new dagreD3.graphlib.Graph().setGraph({});

    if (!this.tasks.length) {
      return;
    }

    this.tasks.forEach(task => {
      let fillColor = '#cd5555';  // Not available (red)
      let textColor = '#ffffff';

      task.state = 0;

      if (task.complete) {  // Completed (green)
        fillColor = '#0b6623';
        task.state = 3;
      } else if (task.startTime != null  && !task.complete) {  // In progress (yellow)
        fillColor = '#ffcc00';
        textColor = '#000000';
        task.state = 2;
      } else if (this.checkAvailability(task)) {  // Available to work on (white)
        fillColor = '#ffffff';
        textColor = '#000000';
        task.state = 1;
      }

      this.graph.setNode(task.id, {
        label: task.name,
        labelStyle:
          'font-weight: 300;'
          + 'font-size: 16px;'
          + 'font-family: "Roboto Condensed";'
          + 'cursor: pointer;'
          + 'fill: ' + textColor,
        style:
          'stroke: #000;'
          + 'stroke-width: 2px;'
          + 'cursor: pointer;'
          + 'fill: ' + fillColor,
        task: task
      });
    });

    this.tasks.forEach(task => {
      task.prerequisites.forEach(pre => {
        this.graph.setEdge(pre.id, task.id, {
          arrowhead: 'vee',
          curve: d3.curveBasis
        });
      });
    });

    this.svg.selectAll('*').remove();
    const inner = this.svg.append('g');

    this.render(inner, this.graph);

    this.svg.selectAll('g.node').on('click', id => this.nodeClicker(id));

    const xCenterOffset = (this.svg.attr('width') - this.graph.graph().width) / 2;
    inner.attr('transform', 'translate(' + xCenterOffset + ', 20)');
    this.svg.attr('height', this.graph.graph().height + 40);
  }

  /**
   * Checks if a task is available for project member to work on.
   *
   * @private
   * @param {Task} task The task which is being checked.
   * @returns {boolean}
   *  Returns TRUE if all prerequisites of the given task are completed.
   *  Otherwise returns FALSE.
   * @memberof ProjectTasksComponent
   */
  private checkAvailability(task: Task): boolean {
    let available = true;
    task.prerequisites.forEach(pre => {
      if (!this.tasks.find(t => t.id === pre.id).complete) {
        available = false;
      }
    });
    return available;
  }

  /**
   * Adds a task to the project. It opens up a dialog ({DialogAddTaskComponent})
   * where the project leader can provide the properties of the new task.
   *
   * @memberof ProjectTasksComponent
   */
  public addTask(): void {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '350px',
      data: {
        project: this.project,
        tasks: this.tasks
      }
    });

    dialogRef.afterClosed().subscribe(async newTask => {
      if (newTask !== undefined) {
        console.log('NEW TASK:', newTask);
        console.log(typeof newTask.prerequisites);

        await this.taskService.addTask(newTask);
        this.initGraph();
      }
    });
  }

  /**
   * Deletes the selected task from the project. A task can only be deleted,
   * if it has not yet been started.
   *
   * @memberof ProjectTasksComponent
   */
  public async deleteTask() {
    await this.taskService.deleteTask(this.selectedTask.id);
    this.selectedTask = null;
    this.initGraph();
  }

  /**
   * 'onClick' event handler for the nodes of the task dependecy tree.
   *
   * @private
   * @param {string} id Node ID.
   * @memberof ProjectTasksComponent
   */
  private nodeClicker(id: string): void {
    const node = this.graph.node(id);
    this.selectedTask = node.task;
  }

  /**
   * "Begins" the selected task. This is an event handler for the "Begin task" button.
   *
   * @memberof ProjectTasksComponent
   */
  public async beginTask() {
    if (this.selectedTask.startTime === null) {
      await this.taskService.beginTask(this.selectedTask.id);
    }

    // await this.taskService.assignTaskToUser(this.selectedTask.id, this.authService.currentUser);
    this.initGraph();
    this.selectedTask = null;
  }

  /**
   * "Ends" the selected task. This is an event handler for the "End task" button.
   *
   * @memberof ProjectTasksComponent
   */
  public async endTask() {
    await this.taskService.endTask(this.selectedTask.id, this.authService.currentUser);
    this.initGraph();
    this.selectedTask = null;
  }

  /**
   * Determines that the "Delete task" button is visible or not. (The task is deletable or not.)
   *
   * @returns {boolean}
   * @memberof ProjectTasksComponent
   */
  public deleteBtnVisibility(): boolean {
    if (this.selectedTask.assignees.length || this.project.leader.id !== this.authService.currentUser.id || this.selectedTask.complete) {
      return false;
    }

    return true;
  }

  /**
   * Determines that the "Begin task" button is visible or not.
   *
   * @returns {boolean}
   * @memberof ProjectTasksComponent
   */
  public startBtnVisibility(): boolean {
    // tslint:disable-next-line:max-line-length
    // if ([1, 2].includes(this.selectedTask.state) && !(this.selectedTask.assignees.map(user => user.id).includes(this.authService.currentUser.id))) {
    if (this.selectedTask.state === 1) {
      return true;
    }

    return false;
  }

  /**
   * Being implemented.
   *
   * @ignore
   * @private
   * @memberof ProjectTasksComponent
   */
  private async joinTask() {

  }
}
