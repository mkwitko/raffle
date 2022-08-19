import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'forgot',
    loadChildren: () =>
      import('./pages/auth/forgot/forgot.module').then(
        (m) => m.ForgotPageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'create-campaing',
    loadChildren: () =>
      import(
        './pages/menu/campaing/create-campaing/create-campaing.module'
      ).then((m) => m.CreateCampaingPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'explore',
    loadChildren: () =>
      import('./pages/menu/explore/explore/explore.module').then(
        (m) => m.ExplorePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'my-campaing',
    loadChildren: () =>
      import('./pages/menu/admin/my-campaing/my-campaing.module').then(
        (m) => m.MyCampaingPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'my-participations',
    loadChildren: () =>
      import(
        './pages/menu/campaing/my-participations/my-participations.module'
      ).then((m) => m.MyParticipationsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile-home',
    loadChildren: () =>
      import('./pages/menu/profile/profile-home/profile-home.module').then(
        (m) => m.ProfileHomePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile-edit',
    loadChildren: () =>
      import('./pages/menu/profile/profile-edit/profile-edit.module').then(
        (m) => m.ProfileEditPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'campaing-home',
    loadChildren: () =>
      import('./pages/menu/campaing/campaing-home/campaing-home.module').then(
        (m) => m.CampaingHomePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'campaing-details',
    loadChildren: () =>
      import(
        './pages/menu/campaing/campaing-details/campaing-details.module'
      ).then((m) => m.CampaingDetailsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-group',
    loadChildren: () =>
      import('./pages/menu/admin/super/create-group/create-group.module').then(
        (m) => m.CreateGroupPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'campaign-admin-details',
    loadChildren: () =>
      import(
        './pages/menu/admin/campaign-admin-details/campaign-admin-details.module'
      ).then((m) => m.CampaignAdminDetailsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'raffle-details',
    loadChildren: () =>
      import('./modal/raffle-details/raffle-details.module').then(
        (m) => m.RaffleDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitations',
    loadChildren: () =>
      import(
        './pages/menu/admin/solicitation/solicitations/solicitations.module'
      ).then((m) => m.SolicitationsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'sellers-home',
    loadChildren: () => import('./pages/menu/sellers/sellers-home/sellers-home.module').then( m => m.SellersHomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
