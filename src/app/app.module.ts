import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AssociatelistComponent } from './pages/associatelist/associatelist.component';
import { AssociateComponent } from './pages/associate/associate.component';
import { MaterialModule } from './Material.Module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AssociateReducer } from './store/associate.reducer';
import { AssociateEffect } from './store/associate.effects';
import { AppEffectes } from './common/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    AssociatelistComponent,
    AssociateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({associate: AssociateReducer}),
    EffectsModule.forRoot([AssociateEffect, AppEffectes]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
