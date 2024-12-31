import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCommonElementsComponent } from './angular-common-elements.component';

describe('AngularCommonElementsComponent', () => {

    let component: AngularCommonElementsComponent;
    let fixture: ComponentFixture<AngularCommonElementsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AngularCommonElementsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AngularCommonElementsComponent);
        component = fixture.componentInstance;
    });

    it('should create', async () => {
        fixture.componentRef.setInput('asdf', 'test');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component).toBeTruthy();
        // while (!component.clicked())
        //     await new Promise(resolve => setTimeout(resolve, 100));
    });
});
