import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesService } from 'src/app/courses/courses.service';
import { CoursesServiceStab } from 'src/app/courses/courses.service.stab';

import { CoursesPageItemComponent } from './courses-page-item.component';
import { MinutesToHoursPipe } from '../../../../pipes/minutes-to-hours.pipe';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { CoursesPageComponent } from '../../courses-page.component';
import { CoursesPageItemsListComponent } from '../courses-page-items-list.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CoursesPageItemComponent', () => {
  let component: CoursesPageItemComponent;
  let fixture: ComponentFixture<CoursesPageItemComponent>;
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
      providers: [{ provide: CoursesService, useValue: coursesServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageItemComponent);
    coursesService = TestBed.inject(CoursesService);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;

    const expectedCourse = new CoursesServiceStab();
    component.course = expectedCourse.getList()[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete by click', () => {
    component.ngOnInit();
    const spy = spyOn(component, 'delete');

    rootElement.query(By.css('button.delete-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
