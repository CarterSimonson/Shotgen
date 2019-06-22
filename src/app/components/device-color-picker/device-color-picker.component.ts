import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceColor } from 'src/models/device-color';
import { DeviceConfig } from 'src/models/device-config';

@Component({
  selector: 'app-device-color-picker',
  templateUrl: './device-color-picker.component.html',
  styleUrls: ['./device-color-picker.component.scss']
})
export class DeviceColorPickerComponent implements OnInit {
  @Input() device: DeviceConfig;
  @Output() colorSelected: EventEmitter<DeviceColor> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  colorChanged(color: DeviceColor) {
    this.device.selectedColor = color;
    this.colorSelected.emit(color);
  }
}
