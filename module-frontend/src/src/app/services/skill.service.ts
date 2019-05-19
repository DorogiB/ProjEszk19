import { Injectable } from '@angular/core';
import { Skill } from './../classes/skill';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private route = 'skills/';
  private SKILLS: Skill[];

  constructor(private httpService: HttpService) { }

  public getAllSkills(): Promise<Skill[]> {
    return this.httpService.get<Skill[]>(this.route);
  }

  public addNewSkill(skill: Skill): Promise<Skill> {
    const json = JSON.stringify(skill);
    return this.httpService.post<Skill>(this.route + 'new', json);
  }

  public getSkill(skillID: number): Promise<Skill> {
    return this.httpService.get<Skill>(this.route + skillID);
  }

  public deleteSkill(skillID: number): Promise<Skill> {
    return this.httpService.delete<Skill>(this.route + 'delete/' + skillID);
  }

  public editSkill(skill: Skill): Promise<Skill> {
    const json = JSON.stringify(skill);
    return this.httpService.put<Skill>(this.route + 'edit/' + skill.id, json);
  }
}
