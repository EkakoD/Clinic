/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthUtilitiesService } from './auth-utilities.service';

describe('Service: AuthUtilities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthUtilitiesService]
    });
  });

  it('should ...', inject([AuthUtilitiesService], (service: AuthUtilitiesService) => {
    expect(service).toBeTruthy();
  }));
});
