import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from './search-bar.component';

describe('MenuComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchCourse by click', () => {
    const spy = spyOn(component, 'searchCourse');

    fixture.debugElement.query(By.css('button.search-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit searchCourse by press "Enter" button', () => {
    const spy = spyOn(component, 'searchCourse');

    fixture.debugElement.query(By.css('input.search-input-content')).triggerEventHandler('keyup.enter', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

});
