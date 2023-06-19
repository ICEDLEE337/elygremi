import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultApi } from '@oninet/generated/account';
import { BaseComponent, SnackService } from '@oninet/ui/common';
// import { Invitation } from '@oninet/generated/account';
import { formatRegexes } from '@onivoro/angular-forms';

@Component({
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  formGroup!: FormGroup;
  // invitation: Invitation;
  hash: string;
  complete = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackService,
    private route: ActivatedRoute,
    private router: Router,
    private api: DefaultApi,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  async ngOnInit() {
    this.hash = this.route.snapshot.paramMap.get('hash') as string;

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
    });

    if (this.hash) {
      const existingReset = {} as any; //await this.api.userPasswordResetControllerGet(this.hash);

      if (!existingReset) {
        this.router.navigate(['/', 'forgot']);
      }
    }
  }

  async resetPassword({
    confirm,
    password,
  }: {
    confirm: string;
    password: string;
  }) {
    if (password !== confirm) {
      return this.snackBar.open(`Password confirmation doesn't match password`);
    }
    // await this.api.userPasswordResetControllerPut(this.hash, { password, confirm });
    this.complete = true;
  }

  handleError(e: any) {
    console.warn(e);
    this.busy$$.next(false);
    this.snackBar.oops();
    this.changeDetectorRef.detectChanges();
  }
}
