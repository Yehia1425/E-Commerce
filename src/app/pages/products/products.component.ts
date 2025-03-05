import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly ProductsService= inject ( ProductsService )
  private readonly cartService= inject ( CartService )
  private readonly toastrService=inject(ToastrService);


   products:WritableSignal<IProduct[]>=signal ([])



   ngOnInit(): void {
       this.getProductData()
   }

   getProductData():void{
    this.ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.products.set(res.data)
      }
    })
   }

   addcart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastrService.success(res.message,'FreahCart')
        this.cartService.cartNumber.set(res.numOfCartItems)
        console.log(this.cartService.cartNumber())
      },
      error:(err)=>{
        console.log(err)
      }
    })
  
  }


}
