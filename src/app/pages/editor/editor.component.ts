import { Component, OnInit } from '@angular/core';
import * as createjs from 'createjs-module';
import { CanvasController } from 'src/models/canvas-controller';
import { CanvasConfig } from 'src/models/canvas-config';
import { DeviceConfig } from 'src/models/device-config';
import { DeviceConfigs } from 'src/config/devices';
import { DeviceColor } from 'src/models/device-color';
import { SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ImagePickerResponse } from 'src/models/image-picker-response';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  swiperConfig: SwiperConfigInterface = {
    direction: "horizontal",
    centeredSlides: true,
    slidesPerView: 2.2,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 20,
      slideShadows: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: "bullets",
      clickable: true
    },
    breakpoints: {
      1000: {
        slidesPerView: 1,
        spaceBetween: 16
      }
    }
  }

  canvasControllers: CanvasController[] = [];
  canvasController: CanvasController;

  deviceOptions = DeviceConfigs.devices;

  textColorOptions = [
    "#e2e2e2", //Light
    "#f3f3f3", //Lighter
    "#2a2a2a", //Dark
    "#191919"  //Darker
  ];

  fontOptions = [
    "Roboto",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Comic Sans MS",
    "Arial",
    "Impact"
  ];

  constructor() {
  }

  ngOnInit() {
    this.canvasControllers.push(new CanvasController(1080, 1920, new CanvasConfig(DeviceConfigs.devices[0], 0.9)));
    this.canvasControllers.push(new CanvasController(1080, 1920, new CanvasConfig(DeviceConfigs.devices[0], 0.9)));
    this.canvasControllers.push(new CanvasController(1080, 1920, new CanvasConfig(DeviceConfigs.devices[0], 0.9)));
    this.canvasController = this.canvasControllers[0];
  }

  exportScreenshots() {
    this.canvasController.downloadImage();
  }
  
  slideChanged(index: number) {
    this.canvasController = this.canvasControllers[index];
  }

  //Device
  deviceChanged(newDevice: DeviceConfig) {
    this.canvasController.setDeviceColor(newDevice.colors[0]);
  }

  deviceColorChanged(deviceColor: DeviceColor) {
    this.canvasController.setDeviceColor(deviceColor);
  }

  //Text
  captionChanged(newCaption: string) {
    this.canvasController.setText(newCaption);
  }

  fontSelectionChanged(font: string) {
    this.canvasController.setTextFont(font);
  }

  fontSizeChanged(fontSize: string) {
    this.canvasController.setTextFontSize(fontSize);
  }

  fontColorChanged(color: string) {
    this.canvasController.setTextColor(color);
  }

  captionPlacementChanged(placement: string) {
    this.canvasController.setTextPlacement(placement);
  }

  //Background
  backgroundTypeChanged(type: string) {
    this.canvasController.setBackgroundType(type);
  }

  backgroundSolidColorChanged(color: string) {
    this.canvasController.setBackgroundSolidColor(color);
  }

  backgroundGradientStartColorChanged(color: string) {
    this.canvasController.setGradientStartColor(color);
  }

  backgroundGradientEndColorChanged(color: string) {
    this.canvasController.setGradientEndColor(color);
  }

  backgroundChanged(newBackground: ImagePickerResponse) {
    this.canvasController.canvasConfig.backgroundURL = newBackground.url;
    this.canvasController.setBackgroundImage(newBackground.data);
  }

  screenshotChanged(newScreenshot: ImagePickerResponse) {
    this.canvasController.canvasConfig.screenshotURL = newScreenshot.url;
    this.canvasController.setScreenshot(newScreenshot.data);
  }
}
