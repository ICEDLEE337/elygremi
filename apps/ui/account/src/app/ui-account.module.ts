import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { accountApiProvider, MaterialModule, UiCommonModule } from '@oninet/ui/common';

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
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { InventoryDialogComponent } from './components/inventory-dialog/inventory-dialog.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { InventoryCardComponent } from './components/inventory-card/inventory-card.component';

const components = [
  AppComponent,
  DownloadButtonComponent,
  InventoryTableComponent,
  InventoryFormComponent,
  InventoryDialogComponent,
  SearchFormComponent,
  FileUploadComponent,
  InventoryCardComponent,
];

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
  InventoryPageComponent
];

@NgModule({
  declarations: [...components, ...pages],
  imports: [
    UiCommonModule.configure(environment),
    MaterialModule,
    RoutingModule,
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

