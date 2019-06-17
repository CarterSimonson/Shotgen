import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import components
import { EditorComponent } from './pages/editor/editor.component';

const routes: Routes = [
  { path: '', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
