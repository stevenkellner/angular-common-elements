import { Component, model, reflectComponentType, Type } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'ace-component-display-test',
    imports: [CardModule, ButtonModule],
    templateUrl: './component-display-test.component.html',
    styleUrl: './component-display-test.component.sass'
})
export class ComponentDisplayTestComponent {

    oldTimeoutInterval: number;

    description = model('')

    response = model<'success' | 'failure' | 'timeout' | null>(null);

    constructor() {
        this.oldTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 60 * 1000; // 5 minutes
        setTimeout(() => {
            if (this.response() === null)
                this.response.set('timeout');
        }, jasmine.DEFAULT_TIMEOUT_INTERVAL - 5000);
    }

    ngOnDestroy() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = this.oldTimeoutInterval;
    }

    successClicked() {
        this.response.set('success');
    }

    failureClicked() {
        this.response.set('failure');
    }

    async expect(description: string) {
        this.description.set(description);
        this.response.set(null);
        await this.waitForResponse();
    }

    async waitForResponse() {
        while (true) {
            expect(this.response()).withContext(`The component display test failed: '${this.description()}'`)
                .not.toEqual('failure');
            expect(this.response()).withContext(`The response for the component display test was not received within the timeout interval of ${jasmine.DEFAULT_TIMEOUT_INTERVAL - 5000} ms`)
                .not.toEqual('timeout');
            if (this.response() !== null)
                return;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

export namespace ComponentDisplayTestComponent {

    export function component(component: Type<unknown>, ...attributes: string[]): Component {
        const componentType = reflectComponentType(component);
        if (componentType === null)
            throw new Error('Component type not found');
        return {
            imports: [ComponentDisplayTestComponent, component],
            template: `
                <ace-component-display-test [(response)]="response" [(description)]="description">
                    <${componentType.selector} ${attributes.join(' ')} />
                </ace-component-display-test>
            `
        };
    }
}
