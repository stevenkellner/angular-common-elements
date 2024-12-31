import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCommonElementsComponent } from './angular-common-elements.component';

describe('AngularCommonElementsComponent', () => {
  let component: AngularCommonElementsComponent;
  let fixture: ComponentFixture<AngularCommonElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularCommonElementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularCommonElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
