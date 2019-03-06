import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  const authState: any = {
    displayName: null,
    isAnonymous: true,
    uid: '56s4dfsd1sga5dsg4ad6g456ad4g64'
  };

  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInAnonymously': Promise.resolve({
        code: 'auth/operation-not-allowed'
      }),
    }),
    authState: of(authState)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AuthService, useClass: AuthService }
      ]
    });
  });

  describe('Calling methods of AuthService ', () => {
    const email: string = 'email';
    const password: string = 'password';
    const authStub: any = {
      authState: {},
      auth: {
        signInWithEmailAndPassword() {
          return Promise.resolve();
        },
        createUserWithEmailAndPassword() {
          return Promise.resolve();
        },
        signOut() {
          return Promise.resolve();
        }
      }
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {provide: AngularFireAuth, useValue: authStub},
          {provide: AngularFireDatabase},
          AuthService
        ],
        imports: [ RouterTestingModule ],
      });
      authStub.authState = of(null);
    });

    it('Service should call login method', inject([AuthService], (service: AuthService) => {
      const mock = TestBed.get(AngularFireAuth);
      const spy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callThrough();
      mock.auth = authStub.auth;

      service.login({email, password});

      expect(spy).toHaveBeenCalledWith(email, password);
    }));

    it('Service should call registerUser method', inject([AuthService], (service: AuthService) => {
      const mock = TestBed.get(AngularFireAuth);
      const spy = spyOn(authStub.auth, 'createUserWithEmailAndPassword').and.callThrough();
      mock.auth = authStub.auth;

      service.registerUser({email, password});

      expect(spy).toHaveBeenCalledWith(email, password);
    }));

    it('Service should call logout method', inject([AuthService], (service: AuthService) => {
      const mock = TestBed.get(AngularFireAuth);
      const spy = spyOn(authStub.auth, 'signOut').and.callThrough();
      mock.auth = authStub.auth;

      service.logout();

      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('Service should return error to anonymous user', () => {
    beforeEach(() => {
      const spy = spyOn(mockAngularFireAuth, 'authState');

      spy.and.returnValue(throwError(new Error('Something went wrong')));
    });

    describe('AngularFireAuth.authState', () => {
      it('Should invoke it’s onError function', () => {
        mockAngularFireAuth.authState.subscribe(null,
          (error: Error) => {
            expect(error).toEqual(new Error('Something went wrong'));
          });
      });
    });
  });
});
