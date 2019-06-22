import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatRadioModule, MatButtonToggleModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatRadioModule, MatButtonToggleModule],
  exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatRadioModule, MatButtonToggleModule],
})
export class MaterialModule { }