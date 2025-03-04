import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
      ]
    });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
