import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { single } from 'rxjs';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})



export class HomeComponent implements OnInit {
 private readonly productsService=inject(ProductsService);
 private readonly categoriesService=inject(CategoriesService);
 private readonly cartService=inject(CartService);
 private readonly toastrService=inject(ToastrService);
 private readonly brandsService=inject(BrandsService);

 customMainSilder: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  rtl:true,
  dots: false,
  navSpeed: 700,
  items:1,
  nav: false,
  autoplay:true,
}


 customOptions: OwlOptions = {
  loop: true,
  rtl:true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:1000,
  autoplayHoverPause:false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}


 products:WritableSignal<IProduct[]>=signal ([])
 categories:WritableSignal< ICategories []> = signal([]);
 barnds:WritableSignal< IBrands []> = signal([]);





 ngOnInit(): void {

  this.getProductData()
  this.getCategoriesData()
  this.getBrandsData()
 }
 


 getProductData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.products.set(res.data)
    },
    error:(err)=>{

      console.log(err)
    }
   })
 }

 getBrandsData():void{

  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.barnds.set(res.data)
    
    },
    error:(err)=>{

      console.log(err.data)
    }
   })
 }
 getCategoriesData():void{

  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categories.set(res.data)
    
    },
    error:(err)=>{

      console.log(err.data)
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
    