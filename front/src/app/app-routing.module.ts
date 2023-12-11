import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { noLoginGuard } from './shared/guards/no-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Login/login.module').then((m) => m.LoginPageModule),
    canActivate: [noLoginGuard],
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule,
      ),
    canActivate: [noLoginGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./Register-Account/registro.module').then(
        (m) => m.RegistroPageModule,
      ),
    canActivate: [noLoginGuard],
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./Home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'chat-bot',
    loadChildren: () =>
      import('./chat-bot/chat-bot.module').then((m) => m.ChatBotPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyPageModule,
      ),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./Menu/menu.module').then((m) => m.MenuPageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
