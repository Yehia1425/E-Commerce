import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/orerr/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute= inject(ActivatedRoute);
  private readonly orderService= inject(OrderService);

cardId:string="";

  checkoutFrom:FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((param)=>{
      this.cardId=param.get('id')!
      })
  }

  submitForm():void{
    console.log(this.checkoutFrom.value);
    this.orderService.checkOutSession(this.cardId,this.checkoutFrom.value ).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){

          open(res.session.url , '_self');

        }
       
      },
      error:(err)=>{
        console.log(err)
      }
    })
    }
  }


