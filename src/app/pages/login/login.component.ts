import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 private readonly authService=inject(AuthService);
 private readonly Router=inject(Router);
 loading:boolean=false;
 msgerror:string=""
 succes:string=""



login:FormGroup=new FormGroup({
 
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{7,}$/)]),
});
// {updateOn:'submit'}

submitFrom():void{
if (this.login.valid) {
  this.loading=true;
  this.authService.sendloginform(this.login.value).subscribe({
    next:(res)=>{
      console.log(res)
      if (res.message==='success') {
        this.loading=false
      setTimeout(()=>{

        localStorage.setItem('userToken',res.token)



        this.authService.saveUserData()

        this.Router.navigate(['/home']);
      },500)
        this.succes=res.message
      }
    },
    error:(err:HttpErrorResponse)=>{
    console.log(err)
  this.msgerror= err.error.message;
    this.loading=false
    }
  })
}
    
}



}

