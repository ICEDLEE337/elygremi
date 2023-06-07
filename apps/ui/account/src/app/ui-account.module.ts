import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { accountApiProvider, MaterialModule, UiCommonModule } from '@oninet/ui/common';
import { UiInventoryModule } from '@oninet/ui-inventory';

import { RoutingModule } from './routing.module';
import { environment } from '../environments/environment';
import { AppShellPageComponent } from './pages/app-shell-page/app-shell-page.component';
import { CodeComponent } from './pages/code/code.component';
import { EmailComponent } from './pages/email/email.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordComponent } from './pages/password/password.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CommonModule } from '@angular/common';

const pages = [
  AppShellPageComponent,
  CodeComponent,
  EmailComponent,
  ForgotComponent,
  LoginComponent,
  PasswordComponent,
  PhoneComponent,
  ResetPasswordComponent,
  SignupComponent,
];

@NgModule({
  declarations: [AppComponent, ...pages],
  imports: [
    CommonModule,
    MaterialModule,
    RoutingModule,
    UiCommonModule,
    UiCommonModule.configure(environment),
    UiInventoryModule,
  ],
  providers: [
    accountApiProvider(
      environment
    ),
  ],
  exports: pages,
  bootstrap: [AppComponent],
})
export class UiAccountModule {}

