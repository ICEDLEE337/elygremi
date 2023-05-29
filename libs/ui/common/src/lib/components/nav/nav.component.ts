import { Component, Input, OnInit } from '@angular/core';
import { TAppRoute } from '../../types/app-route.type';

@Component({
  selector: 'oninet-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() routes: TAppRoute[];
  @Input() fire?: boolean;
  @Input() water?: boolean;
}
