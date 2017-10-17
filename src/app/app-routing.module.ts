import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { PianoComponent }   from './piano/piano.component';
import { ProgressionEditorComponent }      from './progression-editor/progression-editor.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/piano', pathMatch: 'full' },
  { path: 'piano',  component: PianoComponent },
  { path: 'progression-editor/:id', component: ProgressionEditorComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
export class AppRoutingModule {}