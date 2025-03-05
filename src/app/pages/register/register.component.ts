import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 private readonly authService=inject(AuthService);
 private readonly Router=inject(Router);
 loading:boolean=false;
 msgerror:string=""
 succes:string=""



register:FormGroup=new FormGroup({
  name:new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{7,}$/)]),
  rePassword:new FormControl(null,Validators.required),
  phone:new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
}, {validators:this.confirmPassword});
// {updateOn:'submit'}

submitFrom():void{
if (this.register.valid) {
  this.loading=true;
  this.authService.sendRegisterform(this.register.value).subscribe({
    next:(res)=>{
      console.log(res)
      if (res.message==='success') {
        this.loading=false
      setTimeout(()=>{
        this.Router.navigate(['/login']);
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
else{
  this.register?.setErrors({mismatch:true})
  this.register.markAllAsTouched()
}
    
}

 confirmPassword(group:AbstractControl){
  const password =group.get('password')?.value
  const rePassword =group.get('rePassword')?.value
return password===rePassword? null :{mismatch:true}

}
}
