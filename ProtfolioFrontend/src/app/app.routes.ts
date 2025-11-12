import { Routes } from '@angular/router';
import { authguardGuard } from './authguard-guard';
export const routes: Routes = [
      // { path: '',loadComponent: () =>
      // import('./aminmation/aminmation').then((m) => m.Aminmation), title:"PortFolio", pathMatch:'full' },
       { path: '',loadComponent: () =>
      import('./login-page/login-page').then((m) => m.LoginPage), title:"PortFolio", pathMatch:'full', },
      //  { path: '',loadComponent: () =>
      // import('./Start/start').then((m) => m.Main), title:"PortFolio", pathMatch:'full' },
      {path:'main',loadComponent: () =>
      import('./Start/start').then((m) => m.Main),title:"PortFolio" ,canActivate:[authguardGuard]},
//   {
//     path: 'main',
//     loadComponent: () =>
//       import('./main/main').then((m) => m.Main), title:"Main Page"
//   },
  {
    path:'**',
    loadComponent:()=>
        import('./error/error').then((m)=>m.Error),title:'error-404'
  }

];
