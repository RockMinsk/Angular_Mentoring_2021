import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesPageItemComponent } from '../courses-page-items-list/courses-page-item/courses-page-item.component';
import { CoursesPageItemsListComponent } from '../courses-page-items-list/courses-page-items-list.component';
import { CoursesPageComponent } from '../courses-page.component';
import { SearchBarComponent } from './search-bar.component';
import { MinutesToHoursPipe } from 'src/app/pipes/minutes-to-hours.pipe';
import { OrderByDatePipe } from 'src/app/pipes/order-by-date.pipe';
import { AddEditCoursePageComponent } from '../../add-edit-course-page/add-edit-course-page.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let rootElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchBarComponent,
        CoursesPageComponent,
        CoursesPageItemsListComponent,
        CoursesPageItemComponent,
        AddEditCoursePageComponent,
        MinutesToHoursPipe,
        OrderByDatePipe
      ],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        MatIconModule,
        RouterModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty default value for input field', () => {
    const input = rootElement.query(By.css('input'));
    const el = input.nativeElement;

    expect(el.value).toBe('');
  });

  it('should be possible to enter values to input field', () => {
    const input = rootElement.query(By.css('input'));
    const el = input.nativeElement;

    el.value = 'someValue';
    el.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.value).toBe('someValue');
  });


  it('should emit searchCourse by click', () => {
    const spy = spyOn(component, 'searchCourse');

    rootElement.query(By.css('button.search-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit searchCourse by press "Enter" button', () => {
    const spy = spyOn(component, 'searchCourse');

    rootElement.query(By.css('input.search-input-content')).triggerEventHandler('keyup.enter', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

});
