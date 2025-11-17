import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ServiceService } from '../../component/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {

  empForm: any;

  employeeRole: any = ["manager", "frontend developer", "backend developer", "ui desginer", "senior manager", "team leader", "java developer"]

  empData: any;
  btnMode: boolean = false

  constructor(private fb: FormBuilder, private service: ServiceService, private route: Router, private location: Location, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      empRole: ['', [Validators.required]],
      empGen: ['', [Validators.required]]
    })

    this.empData = this.router.snapshot.paramMap.get('id') || undefined;
    if(this.empData){
      this.service.empById(this.empData).subscribe(res => {
        this.empForm.patchValue(res)
      })
      this.btnMode = !this.btnMode
    }
  }

  onSubmit() {
    if (this.empForm.valid) {
      if(this.empData){
        this.service.updateData(this.empData, this.empForm.value).subscribe()
          this.allClear()
          alert("You update the employee details")
      }else{
        this.service.addEmp(this.empForm.value).subscribe()
          this.allClear()
          alert("You add a employee successfuly")
      }
    }
    else {
      alert("Please fill all details")
    }

    this.route.navigate(["dashboard/employee"])
  }

   allClear() {
    this.empForm.reset()
  }

  goBack(){
    this.location.back()
  }
}
