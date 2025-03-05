
import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/orerr/order.service';
import { RouterLink } from '@angular/router';
import { IOrders } from '../../shared/interfaces/iorders';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly orderService=inject(OrderService)
  private readonly authService=inject(AuthService)

  userId:string = '';

  allOrder:WritableSignal< IOrders[]>=signal ([])

ngOnInit(): void {
  
    this.authService.saveUserData();
    this.userId=this.authService.userData.id
    this.orderService.getUserOrders( this.userId ).subscribe({
      next:(res)=>{
        console.log(res)
        this.allOrder.set(res)
           
      }
    })
  
}



  }



