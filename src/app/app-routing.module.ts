import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { AddComponent } from './vistas/add/add.component';
import { CodeComponent } from './vistas/code/code.component';
import { DataComponent } from './vistas/data/data.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'crear', component:AddComponent},
  {path:'code/:email', component:CodeComponent},
  {path:'data', component:DataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, AddComponent, CodeComponent, DataComponent]