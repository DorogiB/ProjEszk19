import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from './../../classes/user';
import { Project } from './../../classes/projects';
import { ProjectService } from './../../services/project.service';
import { UserService } from './../../services/user.service';

/**
 * This component is responsible for 
 *
 * @export
 * @class DialogAddMemberComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: [
    '../common-dialog-styles.scss',
    './dialog-add-member.component.scss'
  ]
})
export class DialogAddMemberComponent implements OnInit {

  /**
   * List of users that are already assigned to the project.
   *
   * @private
   * @type {User[]}
   * @memberof DialogAddMemberComponent
   */
  private assignedUsers: User[];

  /**
   * List of all other (not assigned) users.
   *
   * @private
   * @type {User[]}
   * @memberof DialogAddMemberComponent
   */
  private users: User[];

  /**
   * Creates an instance of DialogAddMemberComponent.
   * 
   * @param {UserService} userService User service. This service is responsible for the communication with the backend through the '/users/*' endpoints.
   * @param {ProjectService} projectService Project service. This service is responsible for the communication with the backend through the '/projects/*' endpoints.
   * @param {Project} data The data injected into this dialog. It contains the project object where we want to add members.
   * @memberof DialogAddMemberComponent
   */
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  async ngOnInit() {
    this.users = await this.userService.getUsers();
    this.assignedUsers = await this.projectService.getMembers(this.data.id);
    this.users = this.users.filter(user => !(this.assignedUsers.map(aUser => aUser.id).includes(user.id)));
  }
}
