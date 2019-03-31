import { Skill } from './../classes/skill';
import { AuthenticationService } from './../services/auth.service';
import { SkillService } from './../services/skill.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    '../common-styles.scss',
    './user-profile.component.scss'
  ]
})
export class UserProfileComponent implements OnInit {

  public currentUser: User;

  public allSkills: Skill[] = [];

  public skillControl = new FormControl();
  public filteredOptions: Observable<string[]>;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public selectable = true;
  public removable = true;
  public addBlurOn = true;

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private skillService: SkillService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.filteredOptions = this.skillControl.valueChanges.pipe(
      startWith(null),
      map((src: string | null) => src ? this._filter(src) : this.allSkills.map(skill => skill.name))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0).map(skill => skill.name);
  }

  async ngOnInit() {
    this.currentUser = new User('', '', '');
    this.currentUser = JSON.parse(JSON.stringify(this.authService.currentUser));
    this.allSkills = await this.skillService.getAllSkills();
  }

  public async add(event: KeyboardEvent) {
    if (event.charCode == 13) {
      var _skill: Skill = await this.skillService.addNewSkill(new Skill(this.skillControl.value));
      this.currentUser = await this.userService.addSkill(this.currentUser.id, _skill);
      this.authService.currentUser = this.currentUser;
      this.allSkills = await this.skillService.getAllSkills();
      this.skillControl.setValue('');
    }
  }

  public async remove(skill: Skill) {
    this.currentUser = await this.userService.removeSkill(this.currentUser.id, skill);
    this.authService.currentUser = this.currentUser;
  }

  async selected(event: MatAutocompleteSelectedEvent) {
    const _skill = this.allSkills.find(item => item.name === event.option.viewValue);

    this.currentUser = await this.userService.addSkill(this.currentUser.id, _skill);
    this.allSkills = await this.skillService.getAllSkills();

    this.skillControl.setValue('');
  }

  public async saveUserData() {
    this.authService.currentUser = this.currentUser;
    const _user = this.currentUser;
    _user.skills = null;
    await this.userService.editUser(_user);
  }

  public async restoreUserData() {
    this.currentUser = await this.userService.getUser(this.currentUser.id);
  }
}
