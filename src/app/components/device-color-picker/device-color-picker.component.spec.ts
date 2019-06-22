import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceColorPickerComponent } from './device-color-picker.component';

describe('DeviceColorPickerComponent', () => {
  let component: DeviceColorPickerComponent;
  let fixture: ComponentFixture<DeviceColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
