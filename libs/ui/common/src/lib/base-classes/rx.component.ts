import { Component, Directive, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, Subscription } from 'rxjs';

export function dot<TInput>(key: keyof TInput) {
  return (source$: Observable<null | undefined | TInput>) => source$.pipe(map((input: null | undefined | TInput) => {
    if (input) {
      return input[key] as any;
    }

    return input;
  }));
}

@Directive({selector: 'blah'})
export class RxComponent<TInput> implements OnInit, OnChanges, OnDestroy {
  input: TInput;

  // subjects
  private input$$ = new BehaviorSubject<TInput>(null as any);
  private destroyed$$ = new Subject();

  // observables
  input$ = this.input$$.asObservable();
  destroyed$ = this.destroyed$$.asObservable();

  subscriptions: Subscription[] = [];

  unsubscribe () {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    this.input$$.next(this.input);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.input$$.next(changes['input'].currentValue as TInput);
  }

  ngOnDestroy() {
    this.unsubscribe();
    this.input$$.complete();
    this.destroyed$$.next(true);
    this.destroyed$$.complete();
  }
}
