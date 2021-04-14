import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageItemComponent } from './courses-page-item.component';

describe('CoursesPageItemComponent', () => {
  let component: CoursesPageItemComponent;
  let fixture: ComponentFixture<CoursesPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
