import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultApi } from '@oninet/generated/account';
import { formatRegexes } from '@onivoro/angular-forms';
import { BaseComponent, SnackService } from '@oninet/ui/common';
import { catchError, concatMap, map, of, tap } from 'rxjs';

@Component({
  templateUrl: './phone.component.html',
})
export class PhoneComponent extends BaseComponent implements OnInit {
  hash$ = this.route.params.pipe(map((params) => params['hash']));
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private api: DefaultApi,
    private snackBar: SnackService
  ) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      phone: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(formatRegexes.phone),
        ],
      }),
    });
  }

  validatePhone({ phone }: { phone: string }) {
    this.hash$
      .pipe(
        concatMap((hash) =>
          // this.api.userInvitationControllerPutPhone(hash, { phone }).then(() => hash)
          hash
        ),
        tap((hash) => {
          this.busy$$.next(false);
          this.router.navigate(['/', 'code', hash]);
        }),
        catchError((e) => {
          this.busy$$.next(false);
          this.handleError(e);
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
