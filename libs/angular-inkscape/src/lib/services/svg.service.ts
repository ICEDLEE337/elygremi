import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SvgService {
  readonly colorHighlight$$ = new BehaviorSubject<string>('yellow');
  readonly colorHighlight$ = this.colorHighlight$$.asObservable().pipe(shareReplay());

  readonly colorClick$$ = new BehaviorSubject<string>('hotpink');
  readonly colorClick$ = this.colorHighlight$$.asObservable().pipe(shareReplay());

  readonly list$$ = new BehaviorSubject<Record<string, any>[]>([]);
  readonly list$ = this.list$$.asObservable().pipe(shareReplay());

  readonly registered$$ = new BehaviorSubject<Record<string, any>>({});
  readonly registered$ = this.registered$$.asObservable().pipe(shareReplay());

  async register(id: string, value: any) {
    const updatedRegistry = { ...this.registered$$.value, [id]: value };
    this.registered$$.next(updatedRegistry);
  }
}
