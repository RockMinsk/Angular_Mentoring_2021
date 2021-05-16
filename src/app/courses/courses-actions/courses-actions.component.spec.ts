import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesActionsComponent } from './courses-actions.component';

describe('CoursesActionsComponent', () => {
  let component: CoursesActionsComponent;
  let fixture: ComponentFixture<CoursesActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
