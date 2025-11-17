import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  LoggedIn: boolean = false
  sideBar: boolean = true

  constructor(private service: ServiceService, private route: Router){ }

  ngOnInit(): void {
   let save = localStorage.getItem("loggedIn")
   
   if(save === 'true'){
    this.LoggedIn = true
    this.service.isLoggedIn.next(true)
   }

   this.service.isLoggedIn.subscribe(status => {
    this.LoggedIn = status
   })
  }

  logOut(){
    localStorage.removeItem("authToken")
    localStorage.removeItem("expireToken")
    localStorage.removeItem("loggedIn")
    this.LoggedIn = false
    this.route.navigate(["user-form"])
    this.sideBar = !this.sideBar
  }

  // login(){
  //   this.route.navigate(["user-form"])
  // }

  sideBarGo(){
    this.sideBar = !this.sideBar
  }
}
