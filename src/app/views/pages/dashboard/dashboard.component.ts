import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../../component/service/service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  empData: any

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit():void{
    this.allEmpluyee()
  }


  allEmpluyee(){
    this.service.getEmp().subscribe(res => {
      this.empData = res
    })
  }

  addEmp(){
    this.router.navigate(["emp-form"])
  }
}
