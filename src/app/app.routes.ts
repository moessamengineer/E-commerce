import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { BrandComponent } from './layout/pages/brand/brand.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckoutComponent } from './layout/pages/checkout/checkout.component';
import { AllordersComponent } from './layout/pages/allorders/allorders.component';
import { ForgetpasswordComponent } from './layout/pages/forgetpassword/forgetpassword.component';
import { WishListComponent } from './layout/pages/wish-list/wish-list.component';
import { ProductComponent } from './layout/pages/product/product.component';

export const routes: Routes = [
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent,canActivate:[AuthGuard],title:'Home'},
{path:'cart',component:CartComponent ,canActivate:[AuthGuard],title:'Cart'},
{path:'productDetails/:id',component:ProductDetailsComponent ,canActivate:[AuthGuard],title:'id'},
{path:'brands',component:BrandComponent ,canActivate:[AuthGuard],title:'Brands'},
{path:'product',component:ProductComponent ,canActivate:[AuthGuard],title:'Products'},
{path:'allorders',component:AllordersComponent ,canActivate:[AuthGuard],title:'All Orders'},
{path:'categories',component:CategoriesComponent ,canActivate:[AuthGuard],title:'Categories'},
{path:'wish-list',component:WishListComponent ,canActivate:[AuthGuard],title:'Wish List'},
{path:'checkout',component:CheckoutComponent ,canActivate:[AuthGuard],title:'Checkout'},
{path:'login',component:LoginComponent,title:'Login'},
{path:'forgetpassword',component:ForgetpasswordComponent,title:'Forget Password'},
{path:'register',component:RegisterComponent,title:'Register'},
{path:'**',component:NotfoundComponent,title:'Not Found'},
];
     