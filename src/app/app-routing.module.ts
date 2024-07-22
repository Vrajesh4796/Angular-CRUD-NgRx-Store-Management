import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociatelistComponent } from './pages/associatelist/associatelist.component';

const routes: Routes = [
  {
    path: '',
    component: AssociatelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
