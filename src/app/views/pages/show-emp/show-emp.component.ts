import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../component/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-emp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-emp.component.html',
  styleUrl: './show-emp.component.css'
})
export class ShowEmpComponent implements OnInit{

  data: any;
  namefirstLetter: string = '';

  constructor(private service: ServiceService, private router: ActivatedRoute, private location: Location, private route: Router){ }

  ngOnInit(): void {
    this.getOneEmp()
  }

  getOneEmp(){
    let id = this.router.snapshot.paramMap.get('id')

    this.service.empById(id).subscribe(res => {
      this.data = res
      
      this.namefirstLetter = this.data.name.split('')
      this.namefirstLetter = this.namefirstLetter[0]
    })
  }

  goBack(){
    this.location.back()
  }

  onEdit(id: string){
    this.route.navigate(["emp-form", id])
  }

  onDelete(id: string){
    this.service.deleteDate(id).subscribe()
    this.route.navigate(["/dashboard/employee"])
  }
}
