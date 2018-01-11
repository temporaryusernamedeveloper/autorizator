import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DowloadComponentComponent } from './dowload-component.component';

describe('DowloadComponentComponent', () => {
  let component: DowloadComponentComponent;
  let fixture: ComponentFixture<DowloadComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowloadComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowloadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
