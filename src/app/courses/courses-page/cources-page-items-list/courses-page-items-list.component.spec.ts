import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourcesPageItemsListComponent } from './courses-page-items-list.component';

describe('CourcesPageItemsListComponent', () => {
  let component: CourcesPageItemsListComponent;
  let fixture: ComponentFixture<CourcesPageItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourcesPageItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourcesPageItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
