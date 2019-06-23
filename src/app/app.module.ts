import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import { MaterialModule } from './material.module';
import { EditorComponent } from './pages/editor/editor.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { DeviceColorPickerComponent } from './components/device-color-picker/device-color-picker.component';

//Swiper carousel
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ImagePickerComponent,
    ColorPickerComponent,
    DeviceColorPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ColorPickerModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
