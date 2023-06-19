import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { MaterialModule } from './material.module';

import { BusyComponent } from './components/busy/busy.component';
import { JsonDetailComponent } from './components/json-detail/json-detail.component';
import { TableComponent } from './components/table/table.component';
import { DynamicTabsComponent } from './components/dynamic-tabs/dynamic-tabs.component';
import { LogoComponent } from './components/logo/logo.component';
import { ModalPageComponent } from './components/modal-page/modal-page.component';
import { NavComponent } from './components/nav/nav.component';
import { PageComponent } from './components/page/page.component';

import { AuthHttpInterceptor } from './interceptors/auth-http.interceptor';

import { OptionalDatePipe } from './pipes/optional-date.pipe';
import { TitlePipe } from './pipes/title.pipe';

import { Config } from './providers/config.class';
import { AngularMaterialFormsModule } from '@onivoro/angular-material-forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { RedirectService } from './services/redirect.service';
import { VersionComponent } from './components/version/version.component';
import { AccentButtonComponent } from './components/accent-button/accent-button.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { AccentLinkComponent } from './components/accent-link/accent-link.component';
import { PrimaryLinkComponent } from './components/primary-link/primary-link.component';
import { RxButtonComponent } from './components/rx-button/rx-button.component';
import { RxComponent } from './base-classes/rx.component';
import { LinkComponent } from './components/link/link.component';

const pages: any[] = [];

const providers = [
  CookieService,
  {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
  },
  DatePipe,
  RedirectService,
];

const components = [
  AccentButtonComponent,
  AccentLinkComponent,
  BusyComponent,
  DialogComponent,
  DynamicTabsComponent,
  JsonDetailComponent,
  LogoComponent,
  ModalPageComponent,
  NavComponent,
  PageComponent,
  PrimaryButtonComponent,
  PrimaryLinkComponent,
  TableComponent,
  VersionComponent,
  RxButtonComponent,
  RxComponent,
  LinkComponent
];

const pipes = [
  OptionalDatePipe,
  TitlePipe,
];

const declarations = [...components, ...pages, ...pipes];

@NgModule({
  imports: [
    AngularMaterialFormsModule,
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations,
  providers,
  exports: [
    ...declarations,
    AngularMaterialFormsModule,
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class UiCommonModule {
  static configure(
    config: Config
  ) {
    return {
      ngModule: UiCommonModule,
      providers: [
        { provide: Config, useValue: config },
      ],
    };
  }
}
