import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerNewComponent } from './organizer-new.component';

describe('OrganizerNewComponent', () => {
  let component: OrganizerNewComponent;
  let fixture: ComponentFixture<OrganizerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
