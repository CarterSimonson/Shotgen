import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface, SwiperComponent } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-new-app-setup',
  templateUrl: './new-app-setup.component.html',
  styleUrls: ['./new-app-setup.component.scss']
})
export class NewAppSetupComponent implements OnInit {
  tab = "select-platform"
  platform: string;
  device: string;
  screenshot: string;
  layout: string;

  constructor() { }

  ngOnInit() {}

  platformSelected(platform: string) {
    console.log(platform);
    this.platform = platform;
    this.tab = "select-device";
  }

  deviceSelected(device: string) {
    console.log(device);
    this.device = device;
    this.tab = "upload-screenshot";
  }

  screenshotUploaded(screenshot: string) {
    this.screenshot = screenshot;
    this.tab = "select-layout";
  }

  layoutSelected(layout: string) {
    
  }
}
