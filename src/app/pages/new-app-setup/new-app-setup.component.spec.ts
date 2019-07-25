import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppSetupComponent } from './new-app-setup.component';

describe('NewAppSetupComponent', () => {
  let component: NewAppSetupComponent;
  let fixture: ComponentFixture<NewAppSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAppSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
