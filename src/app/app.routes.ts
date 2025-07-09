// import { Routes } from '@angular/router';
// import { authGuardFn } from './core/auth.guard';
// import { StartPageComponent } from './pages/start-page/start-page.component';
// import { HomePageComponent } from './pages/home-page/home-page.component';

// export const routes: Routes = [
//      { path: '',      component: StartPageComponent },
//   {
//     path: 'home',
//     component: HomePageComponent,
//     canActivate: [authGuardFn]
//   },
// ];
import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] }
];