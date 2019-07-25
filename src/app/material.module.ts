import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatRadioModule, MatButtonToggleModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatRadioModule, MatButtonToggleModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatRadioModule, MatButtonToggleModule, MatCardModule],
})
export class MaterialModule { }