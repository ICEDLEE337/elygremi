import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultApi } from '@oninet/generated/account';
import { formatRegexes } from '@oninet/ui/angular-serializable-forms';
import { BaseComponent, SnackService } from '@oninet/ui/common';
import { catchError, concatMap, from, map, of, tap } from 'rxjs';

@Component({
  templateUrl: './code.component.html',
})
export class CodeComponent extends BaseComponent implements OnInit {
  codeValidated = false;
  hash$ = this.route.params.pipe(map((params) => params['hash']));
  formGroup: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackService,
    private router: Router,
    private route: ActivatedRoute,
    private api: DefaultApi,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      code: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(formatRegexes.code),
        ],
      }),
    });
  }

  validateCode({ code }: { code: string }) {
    this.hash$
      .pipe(
        // concatMap((hash) =>
          // from(this.api.userInvitationControllerPutCode(hash, {code}).then(r => r.data))
          //   .pipe(map(({ phoneValid }: any) => ({ hash, phoneValid })))
          // hash
        // ),
        tap(({ phoneValid, hash }) => {
          if (phoneValid) {
            this.busy$$.next(false);
            this.codeValidated = true;
            this.router.navigate(['/', 'password', hash]);
          } else {
            this.handleError({ message: 'Invalid code' });
          }
        }),
        catchError((e) => {
          this.busy$$.next(false);
          this.handleError(e);
          return of(e);
        })
      )
      .subscribe();
  }

  handleError(e: any) {
    console.warn(e);
    this.busy$$.next(false);
    this.snackBar.oops();
    this.changeDetectorRef.detectChanges();
  }
}
