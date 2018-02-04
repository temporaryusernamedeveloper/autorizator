import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReindexAllModalComponent } from './reindex-all-modal.component';

describe('ReindexAllModalComponent', () => {
  let component: ReindexAllModalComponent;
  let fixture: ComponentFixture<ReindexAllModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReindexAllModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReindexAllModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
