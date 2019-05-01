import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import {GameService} from './control/game.service';
import {ResultService} from './model/result.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ GameService, ResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
