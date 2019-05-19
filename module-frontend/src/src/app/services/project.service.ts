
import { Injectable } from '@angular/core';
import { Project } from './../classes/projects';
import { HttpService } from './http.service';
import { User } from '../classes/user';

/**
 * This service provides an easy-to-use access to the backend's '/project/*' endpoints.
 *
 * @export
 * @class ProjectService
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  /**
   * 
   *
   * @private
   * @memberof ProjectService
   */
  private route = 'projects/';

  /**
   * Creates an instance of ProjectService.
   * 
   * @ignore
   * @param {HttpService} httpService
   * @memberof ProjectService
   */
  constructor(private httpService: HttpService) { }

  public getAllProjects(): Promise<Project[]> {
    return this.httpService.get<Project[]>(this.route);
  }

  public addNewProject(project: Project): Promise<Project> {
    const json = JSON.stringify(project);
    return this.httpService.post<Project>(this.route + 'new', json);
  }

  public getProject(projectID: number): Promise<Project> {
    return this.httpService.get<Project>(this.route + projectID);
  }

  public deleteProject(projectID: number): Promise<Project> {
    return this.httpService.delete(this.route + projectID);
  }

  public editProject(project: Project): Promise<Project> {
    const json = JSON.stringify(project);
    return this.httpService.put<Project>(this.route + 'edit/' + project.id, json);
  }

  public getMembers(projectID: number): Promise<User[]> {
    return this.httpService.get<User[]>(this.route + projectID + '/members');
  }

  public addMember(projectID: number, member: User): Promise<User[]> {
    const json = JSON.stringify(member);
    console.log(json);

    return this.httpService.post<User[]>(this.route + projectID + '/addMember/', json);
  }

  public removeMember(projectID: number, memberName: string): Promise<User> {
    return this.httpService.post<User>(this.route + projectID + '/removeMember/0', `{"username": "${memberName}"}`);
  }
}