import { ProjectService } from 'src/app/services/project.service';
import { Observable, of } from 'rxjs';
import { Task } from './../classes/task';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private route = 'tasks/';

  constructor(private httpService: HttpService) { }

  public getTasks(): Promise<Task[]> {
    return this.httpService.get<Task[]>(this.route);
  }

  public getTask(taskID: number): Promise<Task> {
    return this.httpService.get<Task>(this.route + taskID);
  }

  public addTask(task: Task): Promise<Task> {
    const json = JSON.stringify(task);
    return this.httpService.post<Task>(this.route + 'new', json);
  }

  public deleteTask(taskID: number): Promise<Task> {
    return this.httpService.delete<Task>(this.route + taskID + '/delete');
  }

  public assignTaskToUser(taskID: number, user: User): Promise<Task> {
    const json = JSON.stringify(user);
    return this.httpService.put<Task>(this.route + taskID + '/assign', json);
  }

  public unassignTaskFromUser(taskID: number, user: User): Promise<Task> {
    const json = JSON.stringify(user);
    return this.httpService.put<Task>(this.route + taskID + '/unassign', json);
  }

  public beginTask(taskID: number): Promise<Task> {
    return this.httpService.post<Task>(this.route + taskID + '/start', '{}');
  }

  public endTask(taskID: number, user: User): Promise<Task> {
    const json = JSON.stringify(user);
    return this.httpService.put<Task>(this.route + taskID + '/complete', json);
  }
}
