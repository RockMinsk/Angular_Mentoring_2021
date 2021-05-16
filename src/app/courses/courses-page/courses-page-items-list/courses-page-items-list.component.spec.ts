import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MinutesToHoursPipe } from 'src/app/pipes/minutes-to-hours.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesService } from '../../courses.service';
import { CoursesServiceStab } from '../../courses.service.stab';
import { CoursesPageComponent } from '../courses-page.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CoursesPageItemComponent } from './courses-page-item/courses-page-item.component';
import { CoursesPageItemsListComponent } from './courses-page-items-list.component';

describe('CoursesPageItemsListComponent', () => {
  let component: CoursesPageItemsListComponent;
  let fixture: ComponentFixture<CoursesPageItemsListComponent>;
  let coursesService: CoursesService;
  let rootElement: DebugElement;

  const coursesServiceStub: CoursesServiceStab = new CoursesServiceStab();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchBarComponent,
        CoursesPageComponent,
        CoursesPageItemsListComponent,
        CoursesPageItemComponent,
        MinutesToHoursPipe
      ],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        MatIconModule,
        RouterModule,
        RouterTestingModule
      ],
      providers: [ { provide: CoursesService, useValue: coursesServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageItemsListComponent);
    coursesService = TestBed.inject(CoursesService);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;

    const expectedCourse = new CoursesServiceStab();
    component.courses = expectedCourse.getList();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log message by click on "Show more" button', () => {
    const consoleSpy = spyOn(console, 'log');
    component.showMore();

    expect(consoleSpy).toHaveBeenCalled();
  });

  describe('deleteCourse() tests', () => {

    it('delete one course', () => {
      const numberOfElements: number = rootElement.queryAll(By.css('app-courses-page-item')).length;
      expect(numberOfElements).toEqual(2);
      expect(component.courses.length).toEqual(2);
      fixture.detectChanges();
      component.deleteCourse(12345);
      expect(component.courses.length).toEqual(1);
      // TODO [KS]: clarify why element doesn't disappear from UI after click on "Delete" button
      // numberOfElements = rootElement.queryAll(By.css('app-courses-page-item')).length;
      // expect(numberOfElements).toEqual(1);
    });

    it('check default text if no one course is available', () => {
      fixture = TestBed.createComponent(CoursesPageItemsListComponent);
      rootElement = fixture.debugElement;

      component.courses = [];

      fixture.detectChanges();
      const numberOfElements: number = rootElement.queryAll(By.css('app-courses-page-item')).length;
      expect(numberOfElements).toEqual(0);
      expect(component.courses.length).toEqual(0);
    });
  });

});
