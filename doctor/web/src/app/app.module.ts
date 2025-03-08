import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './modules/home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    /* Angular Modules */
    BrowserModule,
    BrowserAnimationsModule,

    /* Custom Modules */
    AppRoutingModule,
    CoreModule,
    HomeModule,
  ],
  providers: [
    provideAnimations(), 
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
