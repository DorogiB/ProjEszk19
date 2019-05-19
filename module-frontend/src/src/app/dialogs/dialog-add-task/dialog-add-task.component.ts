import { startWith, map } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SkillService } from './../../services/skill.service';
import { Skill } from './../../classes/skill';
import { TaskService } from './../../services/task.service';
import { MAT_DIALOG_DATA, MatAutocomplete, MatChipInputEvent } from '@angular/material';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Task } from 'src/app/classes/task';
import { Project } from 'src/app/classes/projects';
import { ProjectService } from 'src/app/services/project.service';

/**
 * The component of the 'Add tasks' dialog. This dialog provides a form 
 * where the project leader can give information (such as name, prerequisities and 
 * and required skills) about the new task in the project.
 *
 * @export
 * @class DialogAddTaskComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: [
    '../common-dialog-styles.scss',
    './dialog-add-task.component.css'
  ]
})
export class DialogAddTaskComponent implements OnInit {

  /**
   * List of all tasks in the project.
   *
   * @type {Task[]}
   * @memberof DialogAddTaskComponent
   */
  public projectTasks: Task[];

  /**
   * List of all skills of all users that have ever registered.
   *
   * @type {Skill[]}
   * @memberof DialogAddTaskComponent
   */
  public allSkills: Skill[] = [];

  /**
   * Temporary object of the new task. This will be provided to the backend.
   *
   * @type {Task}
   * @memberof DialogAddTaskComponent
   */
  public _task: Task;

  /**
   * Temporary skill object. It is used in the registration process of the 
   * new required skills.
   *
   * @type {Skill}
   * @memberof DialogAddTaskComponent
   */
  public _skill: Skill;

  /**
   * Property of the Material chip list of skills.
   *
   * @memberof DialogAddTaskComponent
   */
  public selectable = true;

  /**
   * Property of the Material chip list of skills.
   *
   * @memberof DialogAddTaskComponent
   */
  public removable = true;

  /**
   * Form control object.
   *
   * @memberof DialogAddTaskComponent
   */
  public myControl = new FormControl();

  /**
   * Async list of the skill combobox options.
   *
   * @type {Observable<string[]>}
   * @memberof DialogAddTaskComponent
   */
  public filteredOptions: Observable<string[]>;

  /**
   * Separators of the different skills in the input field.
   *
   * @type {number[]}
   * @memberof DialogAddTaskComponent
   */
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * Fuck knows...???
   *
   * @memberof DialogAddTaskComponent
   */
  public addBlurOn = true;

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  /**
   * Creates an instance of DialogAddTaskComponent. 
   * 
   * @param {SkillService} skillService
   *  Skill service. This service is responsible for the communication
   *  with the backend through the '/skills/*' endpoints.
   * @param {TaskService} taskService
   *  Task service. This service is responsible for the communication
   *  with the backend through the '/tasks/*' endpoints.
   * @param {{ project: Project, tasks: Task[] }} data
   * @memberof DialogAddTaskComponent
   */
  constructor(
    private skillService: SkillService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project, tasks: Task[] }
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(null),
      map((src: string | null) => src ? this._filter(src) : this.allSkills.map(skill => skill.name))
    );
  }

  /**
   * Filters the options of the skill autocomplete combobox. This function is called
   * after every keypress.
   *
   * @private
   * @param {string} value The value of the input field. Elements of the final list will match this string.
   * @returns {string[]} The filtered list. It contains the names of those skills that matches the parameter.
   * @memberof DialogAddTaskComponent
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0).map(skill => skill.name);
  }

  async ngOnInit() {
    this._task = new Task();
    this._task.projectId = this.data.project.id;
    const allTasks: Task[] = await this.taskService.getTasks();
    this.projectTasks = allTasks.filter(task => task.project.id === this.data.project.id);
    this.allSkills = await this.skillService.getAllSkills();
  }

  /**
   * Adds a skill to the task's skill requirements.
   *
   * @param {MatChipInputEvent} event
   * @memberof DialogAddTaskComponent
   */
  public async addSkill(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      let _skill = this.allSkills.find(item => item.name === value);

      if (_skill === undefined) {
        _skill = new Skill(value);
        _skill = await this.skillService.addNewSkill(_skill);
      }

      this._task.requiredSkills.push(_skill.id);
    }
  }

  /**
   * Removes a skill from the task's skill requirements.
   *
   * @param {Skill} skillToRemove
   * @memberof DialogAddTaskComponent
   */
  public async removeSkill(skillToRemove: Skill) {
    this._task.requiredSkills = this._task.requiredSkills.filter(skill => skill !== skillToRemove.id);
  }
}
