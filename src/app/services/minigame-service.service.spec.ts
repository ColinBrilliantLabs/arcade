import { TestBed } from '@angular/core/testing';

import { MinigameServiceService } from './minigame-service.service';

describe('MinigameServiceService', () => {
  let service: MinigameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
