import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishList/wishlist.service';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {

private readonly wishlistService=inject(WishlistService);


ngOnInit(): void {
    this.getlogged()
}

getlogged():void{
  this.wishlistService.getWish().subscribe({
    next:(res)=>{
 console.log(res)
    }
  })
}
removeItem(id:string):void{
  this.wishlistService.removeWish(id).subscribe({
    next:(res)=>{
 console.log(res)
    }
  })
}

}
