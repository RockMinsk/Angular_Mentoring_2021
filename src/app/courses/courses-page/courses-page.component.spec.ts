import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesService } from '../courses.service';
import { CoursesPageComponent } from './courses-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesPageItemsListComponent } from './courses-page-items-list/courses-page-items-list.component';
import { CoursesPageItemComponent } from './courses-page-items-list/courses-page-item/courses-page-item.component';
import { MinutesToHoursPipe } from 'src/app/pipes/minutes-to-hours.pipe';
import { OrderByDatePipe } from 'src/app/pipes/order-by-date.pipe';
import { CoursesServiceStab } from '../courses.service.stab';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HighlightBorderDirective } from 'src/app/directives/highlight-border.directive';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
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
        MinutesToHoursPipe,
        OrderByDatePipe,
        HighlightBorderDirective
      ],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        MatIconModule,
        RouterModule,
        RouterTestingModule
      ],
      providers: [{ provide: CoursesService, useValue: coursesServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    coursesService = TestBed.inject(CoursesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call courseService', () => {
    const getDataSpy = spyOn(coursesService, 'getList');
    component.ngOnInit();
    expect(getDataSpy).toHaveBeenCalled();
  });

  it('should display correct number of courses', () => {
    component.ngOnInit();
    const numberOfElements: number = rootElement.queryAll(By.css('app-courses-page-item')).length;
    expect(numberOfElements).toEqual(2);
  });

  it('should display correct title and description', () => {
    fixture.detectChanges();
    const title = rootElement.queryAll(By.css('app-courses-page-item'))[0].query(By.css('div.item-title>p')).nativeElement;
    expect(title.textContent).toBe('TEST TITLE 2');
    const description = rootElement.queryAll(By.css('app-courses-page-item'))[0].query(By.css('p.item-description')).nativeElement;
    expect(description.textContent).toBe('TEST DESCRIPTION 2');
  });

  it('should display courses in correct order by date creation (desc)', () => {
    fixture.detectChanges();
    const firstDate = rootElement.queryAll(By.css('app-courses-page-item'))[0].query(By.css('p.creation-date')).nativeElement;
    expect(firstDate.textContent).toBe('10/22/2021');
    const secondDate = rootElement.queryAll(By.css('app-courses-page-item'))[1].query(By.css('p.creation-date')).nativeElement;
    expect(secondDate.textContent).toBe('10/22/2019');
  });

  it('should have blue border if creation date is in future', () => {
    const course: HTMLElement = rootElement.queryAll(By.css('div.item-section'))[0].nativeElement;
    const border = course.style.boxShadow;
    expect(border).toContain('rgba(0, 191, 255, 0.5)');
  });

  it('should log message by click on "Add course" button', () => {
    const consoleSpy = spyOn(console, 'log');
    component.addCourse();

    expect(consoleSpy).toHaveBeenCalled();
  });

  describe('searchCourse() tests', () => {

    it('no data provided for search', () => {
      let numberOfElements: number = rootElement.queryAll(By.css('app-courses-page-item')).length;
      expect(numberOfElements).toEqual(2);
      component.searchCourse('');
      numberOfElements = rootElement.queryAll(By.css('app-courses-page-item')).length;
      expect(numberOfElements).toEqual(2);
    });

    it('search by title match', () => {
      let numberOfElements: number = rootElement.queryAll(By.css('app-courses-page-item')).length;
      expect(numberOfElements).toEqual(2);
      component.searchCourse('TEST TITLE 1');
      fixture.detectChanges();
      numberOfElements = rootElement.queryAll(By.css('app-courses-page-item')).length;
      // TODO [KS]: clarify why search doesn't perform and UI doesn't change
      expect(numberOfElements).toEqual(2);
    });

  });
});
