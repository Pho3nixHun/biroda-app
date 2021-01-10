import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnDemandComponent } from './onDemand/onDemand.component';

const routes: Routes = [
  { path: '', redirectTo: 'on-demand/popular', pathMatch: 'full' },
  { path: 'on-demand/:id', component: OnDemandComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
