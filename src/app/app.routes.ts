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

export const routes: Routes = [
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent,canActivate:[AuthGuard],title:'Home'},
{path:'cart',component:CartComponent ,canActivate:[AuthGuard],title:'Cart'},
{path:'productDetails/:id',component:ProductDetailsComponent ,canActivate:[AuthGuard],title:'id'},
{path:'brands',component:BrandComponent ,canActivate:[AuthGuard],title:'Brands'},
{path:'products',component:ProductsComponent ,canActivate:[AuthGuard],title:'Products'},
{path:'categories',component:CategoriesComponent ,canActivate:[AuthGuard],title:'Categories'},
{path:'login',component:LoginComponent,title:'Login'},
{path:'register',component:RegisterComponent,title:'Register'},
{path:'**',component:NotfoundComponent,title:'Not Found'},
];
     