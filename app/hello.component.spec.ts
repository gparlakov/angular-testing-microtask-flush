import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { HelloComponent } from './hello.component';
import { AuthService, User } from './auth.service';


describe('Integration::HelloComponent', () => {



  it('should call auth service getUser method on login', () => {
    // given
    const { comp, auth } = setup().withUser(Promise.resolve(User.Empty));

    // when
    comp.login();

    // then
    expect(auth.getUser).toHaveBeenCalled();
  });

  it('should redirect to login if getUser returns the empty user', fakeAsync(() => {
    // given
    const { comp, router } = setup().withUser(Promise.resolve(User.Empty));
    
    // when
    comp.login();
    //flushMicrotasks();

    // then
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));
});


// a setup finction that returns a builder object allowing for test env build
function setup() {

  const auth = jasmine.createSpyObj<AuthService>('auth', ['getUser']);
  const router = jasmine.createSpyObj<Router>('router', ['navigate'])
  
  TestBed.configureTestingModule({
    declarations: [HelloComponent],
    providers: [
      { provide: AuthService, useValue: auth },
      { provide: Router, useValue: router }
    ]
  });

  const fixture = TestBed.createComponent(HelloComponent);
  const comp = fixture.componentInstance;

  const builder = { 
    comp, 
    fixture, 
    auth: TestBed.get(AuthService) as jasmine.SpyObj<AuthService>,
    router: TestBed.get(Router) as jasmine.SpyObj<Router>,
    withUser: (u: Promise<User>) => {
      auth.getUser.and.returnValue(u);
      return builder;
    }
  }
  return builder;
}