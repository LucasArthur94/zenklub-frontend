import { NgModule } from '@angular/core';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfessionalComponent } from './professional/professional.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, ProfessionalComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
