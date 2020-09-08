import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps';

import { MainComponent } from './main.component';
import { FormComponent } from './components/form/form.component';
import { MapComponent } from './components/map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './components/map/popup/popup.component';




@NgModule({
  declarations: [MainComponent, FormComponent, MapComponent, PopupComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule
  ],
 exports: [MainComponent]
})
export class MainModule { }
