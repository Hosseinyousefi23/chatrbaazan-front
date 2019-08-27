import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordconfrimComponent } from './resetpasswordconfrim.component';

describe('ResetpasswordconfrimComponent', () => {
  let component: ResetpasswordconfrimComponent;
  let fixture: ComponentFixture<ResetpasswordconfrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordconfrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordconfrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
