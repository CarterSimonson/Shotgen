import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {
  @Output() fileSelected: EventEmitter<string> = new EventEmitter();

  public imagePath: string = "None selected";
  imgURL: any;
  public message: string;
 
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
      this.fileSelected.emit(reader.result as string);
    }
  }
}
