import { Component, computed, HostListener, inject, input, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
 isLogin=input<boolean>(true)
  
 private readonly authService= inject(AuthService)
 private readonly myTranslateService= inject(MyTranslateService)
 private readonly cartService= inject(CartService)
 countCart:Signal<number> = computed(()=>  
  this.cartService.cartNumber()
 )
 

 out():void{
  this.authService.logOut()
 }


 change(lang:string):void{
this.myTranslateService.changeLang(lang)
 }

 ngOnInit(): void {
    //  this.cartService.cartNumber.subscribe({
    //   next:(value)=>{
    //     this.countCart = value
    //   }
    //  })

     this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.set(res.numOfCartItems)
      }
     })
 }

 isScrolling: boolean = false;

 @HostListener('window:scroll', [])
 onWindowScroll() {
   this.isScrolling = window.scrollY > 0;
 }

}
