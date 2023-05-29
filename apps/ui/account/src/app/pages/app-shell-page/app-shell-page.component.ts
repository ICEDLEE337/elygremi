import { Component } from '@angular/core';
import { routes } from '../../routes.constant';

@Component({
  templateUrl: './app-shell-page.component.html',
  styleUrls: ['./app-shell-page.component.scss'],
})
export class AppShellPageComponent {
  routes = routes;
}
