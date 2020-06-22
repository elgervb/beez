import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '@common/user';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let testMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProfileService);
    testMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially not have a currentUser', () => {
    expect(service.currentUser).toBeNull();
  });

  it('should get user profile', () => {

    const user: User = {
      id: '1',
      username: 'my-user'
    };

    service.getProfile('my-user', 'pass').subscribe(u => {
      expect(u).toBeTruthy();
      expect(u.username).toBe(user.username);
      expect(localStorage.getItem('currentUser')).not.toBeNull();

      expect(service.currentUser).toBe(user);
    });

    const request = testMock.expectOne('http://localhost:3000/profile');
    request.flush(user);
  });
});
