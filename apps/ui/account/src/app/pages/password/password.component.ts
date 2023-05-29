import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { DefaultApi, Invitation, PasswordDto } from '@oninet/generated/account';
import { BaseComponent, SnackService } from '@oninet/ui/common';
import { formatRegexes } from '@oninet/ui/angular-serializable-forms';

@Component({
  templateUrl: './password.component.html',
})
export class PasswordComponent extends BaseComponent implements OnInit {
  hash$ = this.route.params.pipe(map((params) => params['hash']));
  formGroup!: FormGroup;
  invitation: any; //Invitation;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackService,
    private route: ActivatedRoute,
    private api: DefaultApi,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    const validators = {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(formatRegexes.passwordLower),
        Validators.pattern(formatRegexes.passwordUpper),
        Validators.pattern(formatRegexes.passwordNumber),
        Validators.pattern(formatRegexes.passwordSpecial),
      ],
    };

    this.formGroup = this.formBuilder.group({
      password: new FormControl(null, validators),
      confirm: new FormControl(null, validators),
      accept: new FormControl(false, {validators: Validators.requiredTrue})
    });
  }

  async savePassword({
    confirm,
    password,
  }: {
    confirm: string;
    password: string;
  }) {
    if (password !== confirm) {
      this.snackBar.open(`Password confirmation doesn't match password`);
    }
    this.hash$
      .pipe(
        concatMap(async (hash) =>
          {
            this.api.userInvitationControllerPutPassword(hash, { confirm, password } as PasswordDto).then((r: any) => r.data)
            return hash;
          }),
        tap((invitation: Invitation) => {
          this.invitation = invitation;

          this.busy$$.next(false);
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
