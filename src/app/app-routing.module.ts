import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './COMPONENTS/login/login.component';
import { DashboardComponent } from './COMPONENTS/dashboard/dashboard.component';
import { AuthGuard } from './SERVICES/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:DashboardComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
