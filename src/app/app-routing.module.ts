import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';

const routes: Routes = [
  { path: 'templateForm', component: TemplateFormComponent },
  { path: 'dataForm', component: DataFormComponent },
<<<<<<< HEAD
  { path: '', pathMatch: 'full', redirectTo: 'dataForm' }
=======
  { path: '', pathMatch: 'full', redirectTo: 'templateForm' },
>>>>>>> 57a0172206f0cf1c460d4b08406283f8eb93aea8
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
