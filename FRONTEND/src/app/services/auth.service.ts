import { User } from 'src/app/classes/user';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Authentication service.
 *
 * @export
 * @class AuthenticationService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * Represents the currently logged in user.
   *
   * @type {User}
   * @memberof AuthenticationService
   */
  public currentUser: User = null;

  /**
   * @ignore
   */
  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  /**
   * Logs in the user with the given username and password.
   *
   * @param {string} username Username
   * @param {string} password Password
   * @returns {Promise<User>} An object, representing the logged in user.
   * @memberof AuthenticationService
   */
  public async login(username: string, password: string): Promise<User> {
    try {
      const token = btoa(`${username}:${password}`);
      window.localStorage.setItem('token', token);
      this.currentUser = await this.httpService.post<User>('users/login', username);
      // this.currentUser = await this.httpService.get<User>('users/1');
      return Promise.resolve(this.currentUser);
    } catch (e) {
      console.log('LOGIN ERROR:', e);
      this.currentUser = null;
      window.localStorage.setItem('token', '');
      return Promise.reject();
    }
  }

  /**
   * Logs out the user.
   *
   * @memberof AuthenticationService
   */
  public logout(): void {
    this.currentUser = null;
    window.localStorage.setItem('token', '');
    this.router.navigate(['']);
  }
}
