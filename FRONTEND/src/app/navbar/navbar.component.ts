import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

/**
 * This component represents the top navigation bar in the app.
 *
 * @export
 * @class NavbarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * Routing parameter: user ID.
   *
   * @type {number}
   * @memberof NavbarComponent
   */
  public uid: number;

  /**
   * Routing parameter: project ID.
   *
   * @type {number}
   * @memberof NavbarComponent
   */
  public pid: number;

  /**
   * Creates an instance of NavbarComponent.
   * 
   * @ignore
   * @param {AuthenticationService} authService
   * @param {ActivatedRoute} route
   * @memberof NavbarComponent
   */
  constructor(
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  /**
   * Initializes the two variables (uid, pid) from the routing path.
   * One of them will always be NULL.
   *
   * @memberof NavbarComponent
   */
  ngOnInit() {
    this.pid = parseInt(this.route.snapshot.paramMap.get('pid'), 10);
    this.uid = parseInt(this.route.snapshot.paramMap.get('uid'), 10);
  }
}
