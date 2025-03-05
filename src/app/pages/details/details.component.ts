import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute= inject(ActivatedRoute);
  private readonly ProductsService= inject(ProductsService);
  private readonly cartService= inject(CartService);
  private readonly toastrService= inject(ToastrService);
  detailsProduct:IProduct|null=null ;

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next:(p)=>{
        let idProduct=p.get('id');
        this.ProductsService.getSpeificProducts(idProduct).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.detailsProduct=res.data;
          },
          error:(err)=>{
            console.log(err.data)
          }
        })

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
