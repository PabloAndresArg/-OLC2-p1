import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntradaComponent } from './components/entrada/entrada.component';


const routes: Routes = [
  {path: '', redirectTo: 'entrada', pathMatch: 'full' },
  {path: 'entrada', component: EntradaComponent},
  {path:'**', redirectTo: 'entrada'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
