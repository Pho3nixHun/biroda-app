import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnDemandComponent } from './onDemand/onDemand.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', redirectTo: 'on-demand/popular', pathMatch: 'full' },
  { path: 'on-demand/:id', component: OnDemandComponent },
  { path: 'details/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
