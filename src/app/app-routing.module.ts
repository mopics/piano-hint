import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { PianoComponent }   from './piano/piano.component';
import { PatternEditorComponent } from './pattern-editor/pattern-editor.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/piano', pathMatch: 'full' },
  { path: 'piano',  component: PianoComponent },
  { path: 'pattern-editor', component: PatternEditorComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
export class AppRoutingModule {}