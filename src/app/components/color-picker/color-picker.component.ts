import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input() colorOptions: string[];
  @Input() set color(newColor: string) { this.selectedColor = newColor }
  @Output() colorSelected: EventEmitter<string> = new EventEmitter();
  selectedColor: string;

  constructor() {
  }

  ngOnInit() {
    if(this.selectedColor == null) {
      this.setDefaultColor();
    }
  }

  setDefaultColor() {
    this.selectedColor = this.colorOptions[0];
    this.colorChanged(this.selectedColor);
  }

  colorChanged(color: string) {
    this.selectedColor = color;
    this.colorSelected.emit(color);
  }
}
