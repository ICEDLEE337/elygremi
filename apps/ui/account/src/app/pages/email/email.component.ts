import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultApi } from '@oninet/generated/account';
import { BaseComponent, SnackService } from '@oninet/ui/common';
import { catchError, concatMap, map, of, tap } from 'rxjs';

@Component({
  templateUrl: './email.component.html',
})
export class EmailComponent extends BaseComponent implements OnInit {
  hash$ = this.route.params.pipe(map((params) => params['hash']));
  success: boolean;

  constructor(
    private snackBar: SnackService,
    private route: ActivatedRoute,
    private api: DefaultApi,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.hash$
      .pipe(
        concatMap((hash) =>
          // this.api.userInvitationControllerGet(hash)
          hash
        ),
        tap(() => {
          this.busy$$.next(false);
          this.success = true;
        }),
        catchError((e) => {
          this.busy$$.next(false);
          this.success = false;
          return of(e);
        })
      )
      .subscribe();
  }

  handleError(e: Error) {
    console.warn(e);
    this.busy$$.next(false);
    this.snackBar.oops();
    this.changeDetectorRef.detectChanges();
  }
}
