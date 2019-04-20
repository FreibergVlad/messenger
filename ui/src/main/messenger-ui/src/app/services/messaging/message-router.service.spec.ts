import { TestBed } from '@angular/core/testing';

import { MessageRouterService } from './message-router.service';

describe('MessageRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageRouterService = TestBed.get(MessageRouterService);
    expect(service).toBeTruthy();
  });
});
