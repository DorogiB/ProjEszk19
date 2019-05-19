import { DialogAddMemberComponent } from './../dialogs/dialog-add-member/dialog-add-member.component';
import { MatDialog } from '@angular/material';
import { ProjectService } from './../services/project.service';
import { User } from './../classes/user';
import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../classes/projects';
import { select } from 'd3';

/**
 * Component of the project members page.
 *
 * @export
 * @class ProjectMembersComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: [
    '../common-styles.scss',
    './project-members.component.scss'
  ]
})
export class ProjectMembersComponent implements OnInit {

  /**
   * The project where we want to add/remove members.
   *
   * @type {Project}
   * @memberof ProjectMembersComponent
   */
  public project: Project = new Project('', 0);

  /**
   * List of the already assigned project members.
   *
   * @type {User[]}
   * @memberof ProjectMembersComponent
   */
  public assignedUsers: User[];
  
  /**
   * ???
   *
   * @type {User}
   * @memberof ProjectMembersComponent
   */
  public selectedUser: User;

  /**
   * List of the users own projects.
   *
   * @type {Project[]}
   * @memberof ProjectMembersComponent
   */
  public userOwnProjects: Project[];

  /**
   * List of projects where the user contributes.
   *
   * @type {Project[]}
   * @memberof ProjectMembersComponent
   */
  public userProjects: Project[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    const projectId: number = parseInt(this.route.snapshot.paramMap.get('pid'), 10);
    this.project = await this.projectService.getProject(projectId);
    this.assignedUsers = await this.projectService.getMembers(projectId);
  }

  /**
   * Opens up a dialog where the project owner can select which members should be added
   * to the project.
   *
   * @memberof ProjectMembersComponent
   */
  public openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(DialogAddMemberComponent, {
      width: '350px',
      data: this.project
    });

    dialogRef.afterClosed().subscribe(async selectedUser => {
      console.log(selectedUser);

      if (!selectedUser) { return; }
      console.log(await this.projectService.addMember(this.project.id, selectedUser));
      const projectId: number = parseInt(this.route.snapshot.paramMap.get('pid'), 10);
      this.project = await this.projectService.getProject(projectId);
      this.assignedUsers = await this.projectService.getMembers(projectId);
      });
  }

  /**
   * Definitely does something but what????
   *
   * @param {User} user Some sort of user.
   * @memberof ProjectMembersComponent
   */
  public async selectUser(user: User) {
    this.selectedUser = user;
    this.userProjects = await this.projectService.getAllProjects();
//    this.userProjects = this.userProjects.filter(project => project.members.includes(user.id));

    // this.projectService.getUserProjects(user.id).subscribe(projects => this.userProjects = projects);
    // this.projectService.getUserOwnProjects(user.id).subscribe(projects => this.userOwnProjects = projects);
  }

  /**
   * Removes a user from the project's members list.
   *
   * @memberof ProjectMembersComponent
   */
  public async removeUser() {
    await this.projectService.removeMember(this.project.id, this.selectedUser.username);
    const projectId: number = parseInt(this.route.snapshot.paramMap.get('pid'), 10);
    this.project = await this.projectService.getProject(projectId);
    this.assignedUsers = await this.projectService.getMembers(projectId);
  }
}
