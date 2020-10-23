import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceCaptureComponent } from './voice-capture.component';

describe('VoiceCaptureComponent', () => {
  let component: VoiceCaptureComponent;
  let fixture: ComponentFixture<VoiceCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
