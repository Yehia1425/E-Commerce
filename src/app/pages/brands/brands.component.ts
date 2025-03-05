import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly brandsService=inject(BrandsService)


   brands:WritableSignal< IBrands []> = signal([])

ngOnInit(): void {
    this.getAllBrand()
}


  getAllBrand():void{
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.brands.set(res.data)
      }
    })
  }

}
