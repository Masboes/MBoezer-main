import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P5SketchesPageComponent } from './p5-sketches-page.component';

describe('P5SketchesPageComponent', () => {
  let component: P5SketchesPageComponent;
  let fixture: ComponentFixture<P5SketchesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P5SketchesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P5SketchesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
