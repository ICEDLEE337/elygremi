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
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CommonModule } from '@angular/common';
import { DynaOrgFormComponent } from './components/dyna-org-form/dyna-org-form.component';
import { SystemOrgCreatePageComponent } from './pages/system-org-create-page/system-org-create-page.component';
import { AngularMaterialFormsModule } from '@onivoro/angular-material-forms';
import { AdminOrgPageComponent } from './pages/admin-org-page/admin-org-page.component';
import { OrgListComponent } from './components/org-list/org-list.component';
import { InputFilterFormComponent } from './components/input-filter-form/input-filter-form.component';
import { SystemOrgsPageComponent } from './pages/system-orgs-page/system-orgs-page.component';

const pages = [
  AppShellPageComponent,
  CodeComponent,
  EmailComponent,
  ForgotComponent,
  LoginComponent,
  PasswordComponent,
  PhoneComponent,
  ResetPasswordComponent,
  SystemOrgCreatePageComponent,
  SystemOrgsPageComponent,
  AdminOrgPageComponent,
];

const components = [
  DynaOrgFormComponent,
  OrgListComponent,
  InputFilterFormComponent,
];

@NgModule({
  declarations: [AppComponent, ...pages, ...components],
  imports: [
    CommonModule,
    MaterialModule,
    RoutingModule,
    UiCommonModule,
    AngularMaterialFormsModule,
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

