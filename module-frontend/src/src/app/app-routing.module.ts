import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProjectMembersComponent } from './project-members/project-members.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '',                       component: LoginFormComponent, },
  { path: 'users/:uid/projects',    component: UserProjectsComponent,   canActivate: [AuthGuard] },
  { path: 'users/:uid/profile',     component: UserProfileComponent,    canActivate: [AuthGuard] },
  { path: 'projects/:pid/tasks',    component: ProjectTasksComponent,   canActivate: [AuthGuard] },
  { path: 'projects/:pid/members',  component: ProjectMembersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
