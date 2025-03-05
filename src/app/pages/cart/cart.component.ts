import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService=inject(CartService)
  cartDetails:ICart={} as ICart;

 ngOnInit(): void {

  this.getCartData()
   
}


  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  removeItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails=res.data;
        this.cartService.cartNumber.set(res.numOfCartItems)

      },
      error:(err)=>{
        console.log(err)
      }
    })

    }


    upadtaCart(id:string,count:number):void{
      this.cartService.upadataCart(id,count).subscribe({
        next:(res)=>{
          console.log(res);
          this.cartDetails=res.data;
  
        },
        error:(err)=>{
          console.log(err)
        }
      })
      }


      clear():void{
        this.cartService.clearCart().subscribe({
          next:(res)=>{
            console.log(res);
            if (res.message === 'success') {
              this.cartDetails ={} as ICart;
              this.cartService.cartNumber.set(0)
              
            }
           
    
          },
          error:(err)=>{
            console.log(err)
          }
        })
        }
      }
    
  
 


