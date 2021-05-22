import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerEditComponent } from './organizer-edit.component';

describe('OrganizerEditComponent', () => {
  let component: OrganizerEditComponent;
  let fixture: ComponentFixture<OrganizerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
