import { TestBed } from '@angular/core/testing';

import { ProductEffectService } from './product-effect.service';

describe('ProductEffectService', () => {
  let service: ProductEffectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductEffectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
