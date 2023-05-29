import { Component, Input } from '@angular/core';
import { TTransformer } from '../../types/transformer.type';

@Component({
  selector: 'oninet-dynamic-tabs',
  templateUrl: './dynamic-tabs.component.html',
})
export class DynamicTabsComponent<TData> {
  @Input() data: any;
  @Input() transformers?: Record<string, TTransformer<TData>>;
}
