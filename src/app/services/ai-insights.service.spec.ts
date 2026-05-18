import { TestBed } from '@angular/core/testing';

import { AiInsightsService } from './ai-insights.service';

describe('AiInsightsService', () => {
  let service: AiInsightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiInsightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
