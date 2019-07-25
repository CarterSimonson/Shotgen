import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLayoutComponent } from './select-layout.component';

describe('SelectLayoutComponent', () => {
  let component: SelectLayoutComponent;
  let fixture: ComponentFixture<SelectLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
