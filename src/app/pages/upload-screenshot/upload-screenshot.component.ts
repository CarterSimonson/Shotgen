import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-screenshot',
  templateUrl: './upload-screenshot.component.html',
  styleUrls: ['./upload-screenshot.component.scss']
})
export class UploadScreenshotComponent implements OnInit {
  @Output() screenshotUploaded: EventEmitter<string>;

  constructor() { }

  ngOnInit() {
  }

  fileSelected(file: string) {
    this.screenshotUploaded.emit(file);
  }
}
