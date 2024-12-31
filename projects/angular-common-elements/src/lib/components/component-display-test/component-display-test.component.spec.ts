import { Component, input, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { ComponentDisplayTestComponent } from './component-display-test.component';

/******************** Component Under Test ********************/
@Component({
    selector: 'test-component',
    template: '<p id="title">{{ title() }} {{ index() }}</p>'
})
class TestComponent {

    title = input.required<string>();

    index = signal(0);

    ngOnInit() {
        new Promise(async () =>{
            while (true) {
                await new Promise(resolve => setTimeout(resolve, 100));
                this.index.update(index => index + 1);
            }
        });
    }
}
/******************** Component Under Test ********************/

@Component(ComponentDisplayTestComponent.component(TestComponent, '[title]="title()"'))
class TestComponentWrapper extends ComponentDisplayTestComponent {

    title = signal('');
}

describe('ComponentDisplayTestComponent', () => {

    let component: TestComponentWrapper;
    let fixture: ComponentFixture<TestComponentWrapper>;

    beforeEach(async () => {
            await TestBed.configureTestingModule({
            imports: [TestComponentWrapper],
            providers: [
                provideAnimationsAsync(),
                providePrimeNG({
                    theme: {
                        preset: Aura,
                        options: {
                            darkModeSelector: false || 'none'
                        }
                    }
                })
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponentWrapper);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should display the title', async () => {
        component.title.set('Hello');
        await component.expect('Should display the title `Hello`.');
    });
});
