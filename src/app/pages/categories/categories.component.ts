import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ICategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { SubCategoriesService } from '../../core/services/SubCategories/sub-categories.service';
import { ISubCategories } from '../../shared/interfaces/isub-categories';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
   private readonly subCategoriesService= inject(SubCategoriesService)
   private readonly cartService=inject(CartService);
   private readonly toastrService=inject(ToastrService);

   Subcategories:WritableSignal< ISubCategories []> = signal([]);



   ngOnInit(): void {
       this.getAllSub()
   }

   getAllSub():void{
    this.subCategoriesService.getAllSub().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.Subcategories.set(res.data)
      }
    })
   }





}
