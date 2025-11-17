import { Routes } from '@angular/router';
import { UserSignUpLoginFormComponent } from './views/pages/user-sign-up-login-form/user-sign-up-login-form.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { EmployeeFormComponent } from './views/pages/employee-form/employee-form.component';
import { ShowEmpComponent } from './views/pages/show-emp/show-emp.component';
import { authGuard } from './views/component/service/auth.guard';

export const routes: Routes = [
    {path: "", redirectTo: "dashboard/employee", pathMatch: "full"},
    {path: "user-form", component: UserSignUpLoginFormComponent},
    {path: "dashboard/employee", canActivate:[authGuard], component: DashboardComponent},
    {path: "dashboard/employee/:id", canActivate:[authGuard], component: ShowEmpComponent},
    {path: "emp-form", canActivate:[authGuard], component: EmployeeFormComponent},
    {path: "emp-form/:id", canActivate:[authGuard], component: EmployeeFormComponent}

];
