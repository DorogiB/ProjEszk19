import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

export interface RegistrationData {
  name: string;
  email: string;
}

/**
 * Component of the registration dialog. The dialog contains a registration form where
 * the user can add the required information (full name, username and password) for 
 * the registration process.
 *
 * @export
 * @class DialogRegistrationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: [
    '../common-dialog-styles.scss',
    './dialog-registration.component.scss'
  ]
})
export class DialogRegistrationComponent implements OnInit {

  /**
   * Full name of the new user.
   *
   * @type {string}
   * @memberof DialogRegistrationComponent
   */
  public name: string;

  /**
   * Username of the new user. This is going to be used for authentication during the login process.
   *
   * @type {string}
   * @memberof DialogRegistrationComponent
   */
  public userName: string;

  /**
   * Password of the new user. This is going to be used for authentication during the login process.
   *
   * @type {string}
   * @memberof DialogRegistrationComponent
   */
  public passwd: string;

  /**
   * User password again for verification purposes.
   *
   * @type {string}
   * @memberof DialogRegistrationComponent
   */
  public passwd2: string;

  constructor(
    private dialogRef: MatDialogRef<DialogRegistrationComponent>,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.name = this.userName = this.passwd = this.passwd2 = '';
  }

  /**
   * Registration form validator function. It checks if all data fields are filled
   * and the 2 passwords match. If any of these criterias are not met it pops up an
   * error message and returns.
   * Otherwise it sends the data to the backend and depending on the servers answer
   * it pops up a verification or error message.
   *
   * @returns
   * @memberof DialogRegistrationComponent
   */
  public async validateRegForm() {

    if (!this.name.length || !this.userName.length || !this.passwd.length) {
      this.snackBar.open('Minden adatot meg kell adni!', 'HIBA', { duration: 2000 });
      return;
    } else if (this.passwd !== this.passwd2) {
      this.snackBar.open('A két jelszó nem egyezik meg!', 'HIBA', { duration: 2000 });
      return;
    }

    const _user = new User(this.name, this.userName, this.passwd);

    try {
      await this.userService.registerUser(_user);
      this.snackBar.open('Sikeres regisztráció.', '', { duration: 2000 });
      this.dialogRef.close();
    } catch {
      this.snackBar.open('Sikertelen regisztráció!', 'HIBA', { duration: 2000 });
    }
  }
}
