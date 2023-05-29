import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  busy$$ = new BehaviorSubject(false);
  busy$ = this.busy$$.asObservable();
  destroyed$$ = new Subject();
  destroyed$ = this.busy$$.asObservable();
  subscriptions: Subscription[] = [];
}
