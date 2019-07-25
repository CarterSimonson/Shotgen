import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceConfig } from 'src/models/device-config';

@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.scss']
})
export class SelectDeviceComponent implements OnInit {
  @Input() deviceOptions: DeviceConfig[];
  @Output() deviceSelected: EventEmitter<string> = new EventEmitter();

  phones = ["iPhone 8", "Pixel 3"]

  constructor() { }

  ngOnInit() {
  }

  deviceClicked(device: string) {
    this.deviceSelected.emit(device);
  }
}
