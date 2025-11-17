import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignUpLoginFormComponent } from './user-sign-up-login-form.component';

describe('UserSignUpLoginFormComponent', () => {
  let component: UserSignUpLoginFormComponent;
  let fixture: ComponentFixture<UserSignUpLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSignUpLoginFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSignUpLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
