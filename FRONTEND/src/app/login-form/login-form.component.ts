import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRegistrationComponent } from './../dialogs/dialog-registration/dialog-registration.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * The component of the login form. It has 2 very simple duty: it sends the 
 * authentication data (username, password) to the backend, or opens up the
 * registration dialog if requested.
 *
 * @export
 * @class LoginFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() { }

  /**
   * The event handler of the login form's submit event. It takes the username and
   * password from the input fields and send them to the backend through the 
   * 'authService' service. If the login process is successful it sets the 
   * routing module's path to the user's project page. Otherwise it pops up an
   * error message.
   *
   * @memberof LoginFormComponent
   */
  async onSubmit() {
    // console.log(await this.authService.login('', ''));
    // this.router.navigate([`/users/${this.authService.currentUser.id}/projects`]);

    // if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      try {
        await this.authService.login(username, password);
        // await this.authService.login('atesz', 'a');
        this.router.navigate([`/users/${this.authService.currentUser.id}/projects`]);
      } catch {
        this.snackBar.open('SIKERTELEN BEJELENTKEZÉS!', 'HIBA', { duration: 2000 });
      }
    // }
  }

  /**
   * Opens up the registration dialog if the 'Registration' button is clicked.
   *
   * @memberof LoginFormComponent
   */
  public openRegDialog(): void {
    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
      width: '350px'
    });
  }
}
