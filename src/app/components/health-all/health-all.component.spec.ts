import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAllComponent } from './health-all.component';

describe('HealthAllComponent', () => {
  let component: HealthAllComponent;
  let fixture: ComponentFixture<HealthAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
