import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userlogin } from './userlogin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {

  //private baseUrl = "http://localhost:8080/userlogin/login";
  apiUrl = 'http://localhost:8080'; //springboot backend url

  //constructor(private httpClient: HttpClient) { }
constructor(private http:HttpClient){}
  
// loginUser (user:Userlogin):Observable<object> {
//   console.log(user)
//   return this.httpClient.post(`${this.baseUrl}`,user);
  
loginUser(user:any){
  console.log(user)
  return this.http.post(`${this.apiUrl}/login`, user);
}

signUpUser(user: any): Observable<any> {
  console.log(user)
  return this.http.post<any>(`${this.apiUrl}/signup`, user);
}


}



