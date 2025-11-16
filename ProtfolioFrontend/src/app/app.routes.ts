import { Routes } from '@angular/router';
import { authguardGuard } from './authguard-guard';
export const routes: Routes = [
       { path: '',loadComponent: () =>
      import('./login-page/login-page').then((m) => m.LoginPage), title:"PortFolio", pathMatch:'full', },
      {path:'main',loadComponent: () =>
      import('./Start/start').then((m) => m.Main),title:"PortFolio" ,canActivate:[authguardGuard]},
      // { path: '',loadComponent: () =>
      // import('./others/others').then((m) => m.Others), title:"PortFolio", pathMatch:'full', },
      // { path: '',loadComponent: () =>
      // import('./others1/others1').then((m) => m.Others1), title:"PortFolio", pathMatch:'full', },
      
  {
    path:'**',
    loadComponent:()=>
        import('./error/error').then((m)=>m.Error),title:'error-404'
  }

];
