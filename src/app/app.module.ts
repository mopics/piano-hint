import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule }    from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ng2-semanctic
import {SuiModule} from 'ng2-semantic-ui';

// config modules
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services';

//services
import { ProgressionsService } from './services';
import { ChordPatternsService } from './services';
import { GlobalSelectionsService } from './services';
import { SuiModalService } from 'ng2-semantic-ui';
import { ToneService } from './services';

//components
import { AppComponent } from './app.component';
import { ProgressionEditorComponent } from './progression-editor/progression-editor.component';
import { PianoComponent, EpDividerDirective } from './piano/piano.component';
import { PianoOctaveComponent } from './shared/piano-octave/piano-octave.component';
import { PartComponent } from './progression-editor/part/part.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressionSelectComponent } from './progression-select/progression-select.component';
import { ConfirmModalComponent } from './shared/modals/modal-confirm/modal-confirm.component';
import { SelectComponent } from './shared/select/select.component';
import { PianocolorLegendComponent } from './shared/pianocolor-legend/pianocolor-legend.component';
import { PatternEditorComponent } from './pattern-editor/pattern-editor.component';
import { SliderComponent } from './shared/slider/slider.component';
import { PatternPartComponent } from './pattern-editor/pattern-part/pattern-part.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressionEditorComponent,
    PianoComponent,
    EpDividerDirective,
    PianoOctaveComponent,
    PartComponent,
    MenuComponent,
    ProgressionSelectComponent,
    ConfirmModalComponent,
    SelectComponent,
    PianocolorLegendComponent,
    PatternEditorComponent,
    SliderComponent,
    PatternPartComponent
  ],
  entryComponents:[
    ConfirmModalComponent // dynamicly created components also need to be added to entryComponents
  ],
  imports: [
    SuiModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProgressionsService,
    ChordPatternsService,
    GlobalSelectionsService,
    SuiModalService,
    ToneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
