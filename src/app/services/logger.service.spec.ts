import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerServiceService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log message', () => {
    const consoleSpy = spyOn(console, 'log');
    service.getLifeCycleHookMessage('OnChanges', 'TEST');

    expect(consoleSpy).toHaveBeenCalled();
  });
});
