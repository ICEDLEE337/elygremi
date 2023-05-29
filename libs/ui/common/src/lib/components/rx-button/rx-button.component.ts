import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, Subject, tap, withLatestFrom } from 'rxjs';
import { dot, RxComponent } from '../../base-classes/rx.component';

export class RxButtonInput {
  disabled: boolean;
  busy: boolean;
}

@Component({
  selector: 'oninet-rx-button',
  templateUrl: './rx-button.component.html',
})
export class RxButtonComponent extends RxComponent<RxButtonInput>{
  @Input() override input: RxButtonInput;
  @Output() clicked = new EventEmitter();
  disabled$ = this.input$.pipe(dot('disabled'));
  busy = false;
  busy$ = this.input$.pipe(dot('busy'), tap(busy => (this.busy = busy)));
  click$$ = new Subject();
  override subscriptions = [
    this.click$$.asObservable()
      .pipe(
        withLatestFrom(this.busy$),
        filter(([,busy]) => !busy),
        tap(() => this.clicked.emit())
      )
      .subscribe()
  ];
}
