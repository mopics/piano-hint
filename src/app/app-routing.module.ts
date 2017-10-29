import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { PianoComponent }   from './piano/piano.component';
import { PatternEditorComponent } from './pattern-editor/pattern-editor.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/pattern', pathMatch: 'full' },
  // { path: 'progression',  component: ProgressionEditorComponent },
  { path: 'pattern', component: PatternEditorComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
export class AppRoutingModule {}