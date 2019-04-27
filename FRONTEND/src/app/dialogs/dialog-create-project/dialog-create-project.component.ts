import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

/**
 * The component of the 'New project' dialog.
 *
 * @export
 * @class DialogCreateProjectComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dialog-create-project',
  templateUrl: './dialog-create-project.component.html',
  styleUrls: [
    '../common-dialog-styles.scss',
    './dialog-create-project.component.scss'
  ]
})
export class DialogCreateProjectComponent implements OnInit {

  /**
   * Name of the new project.
   *
   * @type {string}
   * @memberof DialogCreateProjectComponent
   */
  public projectName: string;

  /**
   * Creates an instance of DialogCreateProjectComponent.
   * 
   * @ignore
   * @param {MatDialogRef<DialogCreateProjectComponent>} dialogRef
   * @memberof DialogCreateProjectComponent
   */
  constructor(private dialogRef: MatDialogRef<DialogCreateProjectComponent>) { }

  ngOnInit() { }
}
