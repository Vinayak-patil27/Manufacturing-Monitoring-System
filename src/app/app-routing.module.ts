import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './dashbord/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { MainPageComponent } from './dashbord/main-page/main-page.component';

//const routes: Routes = [];
const routes: Routes = [
  // Public Route
  { path: '', component: LoginComponent },

  // Protected Routes inside the Main Layout
  {
    path: '',component: MainPageComponent,canActivate: [AuthGuard],children: [
      { path: 'main', redirectTo: 'master/dashbord', pathMatch: 'full' },
      { 
        path: 'master', 
        loadChildren: () => import('./master/master.module').then(m => m.MasterModule) 
      },
      
    ]
  },
  {path:'main',component:MainPageComponent},
  // Wildcard redirect (Optional: sends unknown paths to login or dashboard)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
