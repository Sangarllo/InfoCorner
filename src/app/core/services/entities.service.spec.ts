import { TestBed } from '@angular/core/testing';

import { EntityService } from './entities.service';

describe('EntitiesService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
