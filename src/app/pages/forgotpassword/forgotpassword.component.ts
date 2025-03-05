import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
private readonly authService= inject(AuthService);
private readonly router= inject(Router);

  step:number=1

  verifyEmail:FormGroup=new FormGroup({

    email:new FormControl(null , [Validators.required , Validators.email])

  })
  verifycode:FormGroup=new FormGroup({

    resetCode:new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{6}$/)])

  })
  resetPassword:FormGroup=new FormGroup({

    email:new FormControl(null , [Validators.required , Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{7,}$/)]),

  })



  verifyEmailsubmit():void{
   let emailvalue= this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailvalue)
    this.authService.setEmailVarify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.statusMsg==='success'){
          this.step=2;

        }
      },
      error:(err)=>{
        console.log(err)
      }
      
    })

  }
  verifyResetPasswordsubmit():void{
    this.authService.setResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem('userToken',res.token)
        this.authService.saveUserData()
        this.router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err)
      }
      
    })

  }
  verifyCodesubmit():void{
    this.authService.setCodeVarify(this.verifycode.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status==='Success'){
          this.step=3;

        }
      },
      error:(err)=>{
        console.log(err)
      }
      
    })

  }


}
