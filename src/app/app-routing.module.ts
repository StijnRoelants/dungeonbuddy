import { NgModule } from '@angular/core';
import {PreloadAllModules, Router, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'characters',
    loadChildren: () => import('./characters/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'createchar',
    loadChildren: () => import('./createchar/createchar.module').then( m => m.CreatecharPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor(private router: Router) {}

  openCharacterPage(){
    this.router.navigate(['/']);
  }
}



