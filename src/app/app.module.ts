import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule }    from '@angular/http';
// ng2-semanctic
import {SuiModule} from 'ng2-semantic-ui';

// config modules
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services';

//services
import { ProgressionsService } from './services';
import { GlobalSelectionsService } from './services';

//components
import { AppComponent } from './app.component';
import { ProgressionEditorComponent } from './progression-editor/progression-editor.component';
import { PianoComponent } from './piano/piano.component';
import { PianoOctaveComponent } from './shared/piano-octave/piano-octave.component';
import { NoteDropdownComponent } from './shared/note-dropdown/note-dropdown.component';
import { PartComponent } from './progression-editor/part/part.component';
import { ModeDropdownComponent } from './shared/mode-dropdown/mode-dropdown.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressionSelectComponent } from './progression-select/progression-select.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressionEditorComponent,
    PianoComponent,
    PianoOctaveComponent,
    NoteDropdownComponent,
    PartComponent,
    ModeDropdownComponent,
    MenuComponent,
    ProgressionSelectComponent
  ],
  imports: [
    SuiModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [ProgressionsService, GlobalSelectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
