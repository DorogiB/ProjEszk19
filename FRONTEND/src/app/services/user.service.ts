import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpService } from './http.service';
import { Skill } from '../classes/skill';
import { Project } from '../classes/projects';
import { Task } from '../classes/task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private route = 'users/';
  private USERS: User[];

  constructor(private httpService: HttpService) {
    // this.USERS = [
    //   {
    //     id: 1,
    //     userName: 'johnny',
    //     name: 'John Doe',
    //     ownedProjects: [100],
    //     projects: [101],
    //     skills: [12, 13],
    //     assignedTasks: []
    //   } as User,
    //   {
    //     id: 2,
    //     userName: 'jane',
    //     name: 'Jane Doe',
    //     ownedProjects: [101],
    //     projects: [100],
    //     skills: [11, 12],
    //     assignedTasks: []
    //   } as User,
    //   {
    //     id: 3,
    //     userName: 'doki',
    //     name: 'Dr. Strange',
    //     ownedProjects: [],
    //     projects: [],
    //     skills: [11, 13],
    //     assignedTasks: []
    //   } as User,
    //   {
    //     id: 4,
    //     userName: 'ironman',
    //     name: 'Tony Stark',
    //     ownedProjects: [],
    //     projects: [],
    //     skills: [11, 12, 13],
    //     assignedTasks: []
    //   } as User,
    //   {
    //     id: 5,
    //     userName: 'thunder',
    //     name: 'Thor',
    //     ownedProjects: [],
    //     projects: [],
    //     skills: [11, 12, 13],
    //     assignedTasks: []
    //   } as User
    // ];
  }

  public registerUser(user: User): Promise<User> {
    const json = JSON.stringify(user);
    return this.httpService.post<User>(this.route + 'new', json);
  }

  public getUsers(): Promise<User[]> {
    return this.httpService.get<User[]>(this.route);
  }

  public getUser(id: number): Promise<User> {
    return this.httpService.get<User>(this.route + id);
  }

  public deleteUser(id: number): Promise<User> {
    return this.httpService.delete<User>(this.route + id);
  }

  public editUser(user: User): Promise<User> {
    const json = JSON.stringify(user);
    return this.httpService.put<User>(this.route + user.id + '/edit', json);
  }

  public getSkillsOfUser(userID: number): Promise<Skill[]> {
    return this.httpService.get<Skill[]>(this.route + userID + '/skills');
  }

  public addSkill(userID: number, skill: Skill): Promise<Skill> {
    const json = JSON.stringify(skill);
    return this.httpService.put<Skill>(this.route + userID + '/skills/add', json);
  }

  public removeSkill(userID: number, skill: Skill): Promise<Skill> {
    const json = JSON.stringify(skill);
    return this.httpService.put<Skill>(this.route + userID + '/skills/remove', json);
  }

  public getOwnProjects(userID: number): Promise<Project[]> {
    return this.httpService.get<Project[]>(this.route + userID + '/ownedProjects');
  }

  public getProjects(userID: number): Promise<Project[]> {
    return this.httpService.get<Project[]>(this.route + userID + '/projects');
  }

  public getAssignedTasks(userID: number): Promise<Task[]> {
    return this.httpService.get<Task[]>(this.route + userID + '/assignedTasks');
  }
}
