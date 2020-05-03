import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent} from './items/items.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { LoginComponent } from './login';
import {AuthGuard} from "./_guards";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ItemDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
