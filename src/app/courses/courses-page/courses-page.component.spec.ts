import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesService } from '../courses.service';

import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let coursesService: CoursesService;
  const coursesServiceStub: Partial<CoursesService> = {
    getList: () => [
      {
        id: 12345,
        title: 'TEST',
        creationDate: 'TEST',
        duration: 12345,
        description: 'TEST'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPageComponent ],
      providers: [{ provide: CoursesService, useValue: coursesServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO [KS]: investigate how make test workable
  // it('should call courseService', () => {
  //   const getDataSpy = spyOn(coursesService, 'getList');
  //   component.ngOnInit();
  //   expect(getDataSpy).toHaveBeenCalled();
  // });

  it('should log message by click on "Add course" button', () => {
    const consoleSpy = spyOn(console, 'log');
    component.addCourse();

    expect(consoleSpy).toHaveBeenCalled();
  });
});
