import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';
import { SvgInfoComponent } from '../components/svg-info.component';

@Injectable({ providedIn: 'root' })
export class SvgService {
  readonly colorHighlight$$ = new BehaviorSubject<string>('yellow');
  readonly colorHighlight$ = this.colorHighlight$$.asObservable().pipe(shareReplay());

  readonly colorClick$$ = new BehaviorSubject<string>('hotpink');
  readonly colorClick$ = this.colorHighlight$$.asObservable().pipe(shareReplay());

  readonly list$$ = new BehaviorSubject<Record<string, any>[]>([]);
  readonly list$ = this.list$$.asObservable().pipe(shareReplay());

  readonly data$$ = new BehaviorSubject<any>({});
  readonly data$ = this.data$$.asObservable().pipe(
    tap(data => this.dialog.open(SvgInfoComponent, {data})),
    map(() => ''),
    shareReplay()
  );

  readonly registered$$ = new BehaviorSubject<Record<string, any>>({});
  readonly registered$ = this.registered$$.asObservable().pipe(shareReplay());

  constructor(private dialog: MatDialog) {}

  async register(id: string, value: any) {
    const updatedRegistry = { ...this.registered$$.value, [id]: value };
    this.registered$$.next(updatedRegistry);
  }
}
