import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
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
  @ViewChild('swiperWrapper', null) public swiperWrapper: any;

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

  deviceOptions = DeviceConfigs.devices;

  canvasControllers: CanvasController[] = [];
  canvasController: CanvasController;
  swiperIndex: number = 0;

  constructor() {
  }

  ngOnInit() {
    // this.canvasControllers.push(new CanvasController(1080, 1920, new CanvasConfig(DeviceConfigs.devices[0], 0.9)));
    // this.canvasControllers.push(new CanvasController(1080, 1920, new CanvasConfig(DeviceConfigs.devices[0], 0.9)));
    this.canvasControllers.push(new CanvasController(1080, 1920, new CanvasConfig(DeviceConfigs.devices[0], 0.9)));
    this.canvasController = this.canvasControllers[0];
  }

  addClicked() {
    //First, check if we have too many (8+) editors
    if(this.canvasControllers.length === 8) {
      alert("Error: cannot create more than eight editor windows");
      return;
    }

    this.canvasControllers.push(new CanvasController(1080, 1920, new CanvasConfig(DeviceConfigs.devices[0], 0.9)));
    this.swiperWrapper.directiveRef.update();
    
    //Wait for the new slide to process, then navigate to it
    setTimeout(() => {
      const index = this.canvasControllers.length - 1;
      this.swiperWrapper.directiveRef.setIndex(index);
    }, 10);
  }

  removeClicked(selectedController: CanvasController) {
    //First, check if our array length is greater than one
    if(this.canvasControllers.length === 1) {
      alert("Error: at least one editor window is required");
      return;
    }

    //Loop through each controller until we get a match
    for(let i = 0; i < this.canvasControllers.length; i++) {
      const indexController = this.canvasControllers[i];

      if(indexController === selectedController) {
        //If the index is zero, slide forward
        if(i === 0) {
          this.swiperWrapper.directiveRef.nextSlide();
        }
        //Else, slide backward
        else {
          this.swiperWrapper.directiveRef.prevSlide();
        }

        this.canvasControllers.splice(i, 1);
  
        //Update the swiper
        this.swiperWrapper.directiveRef.update();

        return;
      }
    }
  }

  exportScreenshots() {
    this.canvasController.downloadImage();
  }
  
  slideChanged(index: number) {
    console.log("Slide changed");
    this.swiperIndex = index;
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
