import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../component/service/service.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sign-up-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-sign-up-login-form.component.html',
  styleUrl: './user-sign-up-login-form.component.css'
})
export class UserSignUpLoginFormComponent implements OnInit {

  userForm: any
  loginMode: boolean = true

  passHide: boolean = false

  email: any
  password: any

  btn: boolean = false

  constructor(private service: ServiceService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {

    if (this.userForm.valid) {
      if (!this.loginMode) {
        this.service.signUp(this.userForm.value).subscribe()
        this.loginMode = true
        this.userForm.reset()
        alert("You sign up successfuly")
      } else {
        this.service.getUser(this.userForm.value).subscribe(res => {
          if (res) {
            this.route.navigate(["dashboard/employee"])
            alert("You Logged in")
          } else {
            alert("Invalid User")
            this.userForm.reset()
          }
        })
        console.log("login")
      }
    } else {
      alert("Please fill all details")
    }
  }

  isLoggedIn() {
    this.loginMode = !this.loginMode
  }

  hideShow() {
    this.passHide = !this.passHide
  }

}
