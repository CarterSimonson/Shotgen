import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ImagePickerResponse } from 'src/models/image-picker-response';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {
  @Input() set url(newURL: string) {
    if(newURL == undefined) {
      newURL = "None selected";
    }
    this.imagePath = newURL 
  }
  @Output() fileSelected: EventEmitter<ImagePickerResponse> = new EventEmitter();

  public imagePath: string = "None selected";
  imgURL: any;
  public message: string;
  inputData: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    //Set name
    this.imagePath = files[0].name;

    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
      this.fileSelected.emit(new ImagePickerResponse(this.imagePath, reader.result as string));
    }

    //Clear input
    this.inputData = "";
    this.message = "";
  }
}
