import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceColor } from '../../../models/device-color';
import { DeviceConfig } from '../../../models/device-config';

@Component({
  selector: 'app-device-color-picker',
  templateUrl: './device-color-picker.component.html',
  styleUrls: ['./device-color-picker.component.scss']
})
export class DeviceColorPickerComponent implements OnInit {
  @Input() device: DeviceConfig;
  @Input() set deviceColor(newColor) { this.selectedColor = newColor }
  @Output() colorSelected: EventEmitter<DeviceColor> = new EventEmitter();

  selectedColor: DeviceColor;

  constructor() {
  }

  ngOnInit() {
  }

  colorChanged(color: DeviceColor) {
    this.colorSelected.emit(color);
  }
}
