import { TestBed } from '@angular/core/testing';

import { AngularCommonElementsService } from './angular-common-elements.service';

describe('AngularCommonElementsService', () => {

    let service: AngularCommonElementsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AngularCommonElementsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
