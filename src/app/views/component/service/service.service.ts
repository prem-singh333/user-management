import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  isLoggedIn = new BehaviorSubject<boolean>(false)

  empURL = "http://10.194.163.27:3000/employee"
  userURL = "http://10.194.163.27:3000/users"

  constructor(private http: HttpClient) { }

  addEmp(data: any):Observable<any>{
    return this.http.post(this.empURL, data)
  }

  getEmp():Observable<any>{
    return this.http.get(this.empURL)
  }

  empById(id: any):Observable<any>{
    return this.http.get(`${this.empURL}/${id}`)
  }

  updateData(id: any, data: any):Observable<any>{
    return this.http.put(`${this.empURL}/${id}`, data)
  }

  deleteDate(id: any):Observable<any>{
    return this.http.delete(`${this.empURL}/${id}`)
  }

  // user sign up 

  signUp(data: any):Observable<any>{
    return this.http.post(this.userURL, data)
  }

  getUser(data: any):Observable<any>{
    let email = data.email;
    let password = data.password;

    return this.http.get<any[]>(this.userURL).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password)
        console.log(user)

        if(user){
          localStorage.setItem("loggedIn", "true")
          localStorage.setItem("authToken", "authrizedUser");

          let expireAt = new Date().getTime() + (30 * 60 * 1000)

          localStorage.setItem("expireToken", expireAt.toString())
          this.isLoggedIn.next(true)
          return user
        }else{
          console.log("invalid user")
        }
      })
    )
  }
}
