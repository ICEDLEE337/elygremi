import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { versionRoute } from '@oninet/ui/common';
import { AppShellPageComponent } from './pages/app-shell-page/app-shell-page.component';
import { CodeComponent } from './pages/code/code.component';
import { EmailComponent } from './pages/email/email.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordComponent } from './pages/password/password.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignupComponent } from './pages/signup/signup.component';
import { routes } from './routes.constant';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: 'login/:redirect', component: LoginComponent, pathMatch: 'full' },
        { path: 'login', component: LoginComponent, pathMatch: 'full' },
        { path: 'signup', component: SignupComponent, pathMatch: 'full' },
        { path: 'forgot', component: ForgotComponent, pathMatch: 'full' },
        { path: 'reset/:hash', component: ResetPasswordComponent, pathMatch: 'full' },
        { path: 'email/:hash', component: EmailComponent, pathMatch: 'full' },
        { path: 'phone/:hash', component: PhoneComponent, pathMatch: 'full' },
        { path: 'code/:hash', component: CodeComponent, pathMatch: 'full' },
        { path: 'password/:hash', component: PasswordComponent, pathMatch: 'full' },
        versionRoute,
        {
          path: '',
          // canActivateChild: [AuthGuard],
          component: AppShellPageComponent,
          children: [...routes],
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  exports: [RouterModule],
})
export class RoutingModule { }
