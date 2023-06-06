import { Injectable } from '@angular/core';
import { DefaultApi, Inventory } from '@oninet/generated/account';
import { negate } from '@oninet/ui/common';
import { BehaviorSubject, map, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventorySearchService {
  data$$ = new BehaviorSubject<Inventory[]>([]);
  data$ = this.data$$.asObservable().pipe(shareReplay());
  page$$ = new BehaviorSubject<number>(0);
  page$ = this.page$$.asObservable().pipe(shareReplay());
  pageSize$$ = new BehaviorSubject<number>(3);
  pageSize$ = this.pageSize$$.asObservable();
  total$$ = new BehaviorSubject<number>(0);
  total$ = this.total$$.asObservable().pipe(shareReplay());
  loading$$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loading$$.asObservable().pipe(shareReplay());
  notLoading$ = this.loading$.pipe(map(negate));
  term$$ = new BehaviorSubject<string | null | undefined>(null);
  term$ = this.term$$.asObservable().pipe(shareReplay());

  constructor(private api: DefaultApi) { }

  async search(page: number) {
    this.loading$$.next(true);
    const { data, total } = (
      await this.api.inventoryControllerGetDashboard(
        this.term$$.value,
        this.pageSize$$.value,
        page
      )
    ).data;
    this.page$$.next(page);
    this.data$$.next(data);
    this.total$$.next(total);
    this.loading$$.next(false);
  }

  async reload() {
    this.term$$.next(null);
    await this.search(this.page$$.value);
  }
}
