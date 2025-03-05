import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggodGuard } from './core/guards/loggod.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: '',
        component: AuthLayoutComponent,canActivate:[loggodGuard],
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
                title: 'Login Page'
            },
            {
                path: 'Register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
                title: 'Register Page'
            },
            {
                path: 'forgot',
                loadComponent: () => import('./pages/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent),
                title: 'Forgot Password Page'
            }
        ]
    },

    {
        path: '',
        component: BlankLayoutComponent,canActivate:[authGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
                title: 'Home Page'
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
                title: 'Cart Page'
            },
            {
                path: 'wish',
                loadComponent: () => import('./pages/wish-list/wish-list.component').then(m => m.WishListComponent),
                title: 'Favourite Page'
            },

            {
                path: 'products',
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
                title: 'Products Page'
            },
            {
                path: 'brands',
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent),
                title: 'Brands Page'
            },
            {
                path: 'categories',
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
                title: 'Categories Page'
            },
            {
                path: 'categoriesDetails/:id',
                loadComponent: () => import('./pages/categories-details/categories-details.component').then(m => m.CategoriesDetailsComponent),
                title: 'Categories Details Page'
            },
            {
                path: 'checkout/:id',
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
                title: 'Checkout Page'
            },
            {
                path: 'details/:id',
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
                title: 'Details Page'
            },
            {
                path: 'allorders',
                loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent),
                title: 'Allorders Page'
            },
            {
                path: '**',
                loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
                title: 'Not Found Page'
            }
        ]
    }
];
