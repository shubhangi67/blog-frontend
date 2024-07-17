import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { BlogdetailsComponent } from './component/blogdetails/blogdetails.component';
import { ManageblogsComponent } from './component/admin/manageblogs/manageblogs.component';
import { BlogFormComponent } from './component/admin/blog-form/blog-form.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [

  {
    path:"",
    component:HomeComponent
  },
  {
    path:"about",
    component:AboutComponent
  },
  {
    path:"blogs",
    component:BlogsComponent
  },
  {
    path:"blogdetails/:id",
    component:BlogdetailsComponent
  },
  {
    path:"admin/blogs",
    component:ManageblogsComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/form/create",
    component:BlogFormComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/form/update/:id",
    component:BlogFormComponent,
    canActivate:[authGuard]
  },
  {
    path:"login",
    component:LoginComponent
  }
];
