import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, of, startWith, Subscription, tap } from 'rxjs';
import { TTransformer } from '../../types/transformer.type';

@Component({
  selector: 'oninet-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<TData> implements OnChanges {
  @Input() columns?: string[];
  @Input() transformers?: Record<string, TTransformer<TData>>;
  @Input() data: any[];

  form: FormGroup;
  data$: any;

  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.init();
    }
  }

  init() {
    this.form = this.fb.group({});

    if (!this.columns?.length) {
      this.columns = this.data
        .reduce((columns, row) => {
          return [...new Set([...columns, ...Object.keys(row)])];
        }, [])
        .sort();
    }

    const formDefinition =
      this.columns?.reduce((def, col) => {
        return { ...def, [col]: [null] };
      }, {}) ?? {};

    this.form = this.fb.group(formDefinition);

    const mappedData = of(this.data).pipe(
      map((data) => {
        if (this.transformers) {
          const transformersInScope = Object.entries(
            this.transformers || []
          ).filter(([key]) => this.columns?.includes(key));
          if (transformersInScope.length) {
            return data.map((record) => {
              return transformersInScope.reduce(
                (mappedData, [key, transformer]: any) => {
                  mappedData[key] = mappedData[key]
                    ? transformer(key, mappedData[key])
                    : mappedData[key];
                  return mappedData;
                },
                record
              );
            });
          }
          return data;
        }

        return data;
      })
    );

    const formValue = this.form.valueChanges.pipe(startWith({}));

    this.data$ = combineLatest([mappedData, formValue]).pipe(
      map(([data, form]) => {
        const filters = Object.entries(form).filter(Boolean);
        return data.filter((record) =>
          filters.every(
            ([key, value]) =>
              !value ||
              record[key]?.toString?.()?.toLowerCase?.()?.includes?.(value)
          )
        );
      })
    );
  }
}
