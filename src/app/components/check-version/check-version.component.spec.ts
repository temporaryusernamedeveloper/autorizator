import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckVersionComponent } from './check-version.component';

describe('CheckVersionComponent', () => {
  let component: CheckVersionComponent;
  let fixture: ComponentFixture<CheckVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
