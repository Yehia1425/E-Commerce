import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  userData:any=null;
  private readonly router=inject(Router)


  sendRegisterform(data:object):Observable<any>{
  return  this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }
  sendloginform(data:object):Observable<any>{
  return  this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }


  saveUserData():void{
  if (  localStorage.getItem('userToken') !==null){
  this.userData=   jwtDecode(  localStorage.getItem('userToken')!);
  console.log('userData', this.userData.id)
  }
  }

  logOut():void{
    localStorage.removeItem('userToken');
    this.userData=null;

    this.router.navigate(['/login'])
  }




setEmailVarify(data:object):Observable<any>{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, data)
}
setCodeVarify(data:object):Observable<any>{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, data)
}
setResetPassword(data:object):Observable<any>{
  return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, data)
}

}
