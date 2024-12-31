import { Component, input, signal } from '@angular/core';

@Component({
    selector: 'lib-angular-common-elements',
    imports: [],
    template: `
        <p (click)="onClick()" style="cursor: pointer;">
            angular-common-elements works {{ asdf() }}!
        </p>
    `,
    styles: ``
})
export class AngularCommonElementsComponent {

    asdf = input.required<string>();

    clicked = signal(false);

    onClick() {
        console.log('clicked');
        this.clicked.set(true);
    }
}
