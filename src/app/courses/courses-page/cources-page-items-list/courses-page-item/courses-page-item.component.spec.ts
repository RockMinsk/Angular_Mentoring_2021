import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesPageItemComponent } from './courses-page-item.component';
import { MinutesToHoursPipe } from '../../../../pipes/minutes-to-hours.pipe';

@Pipe({
  name: 'date',
  pure: false // required to update the value when the promise is resolved
})

class MockedDatePipe implements PipeTransform {
  public name = 'date';

  public transform(query: string, ...args: any[]): any {
      return query;
  }
}

describe('CoursesPageItemComponent', () => {
  let component: CoursesPageItemComponent;
  let fixture: ComponentFixture<CoursesPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesPageItemComponent,
        MockedDatePipe,
        MinutesToHoursPipe
      ]
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

  it('should emit delete by click', () => {
    const spy = spyOn(component, 'delete');

    fixture.debugElement.query(By.css('button.delete-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
