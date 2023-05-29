import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent, SnackService } from '@oninet/ui/common';
import { DefaultApi } from '@oninet/generated/account';
import { formatRegexes } from '@oninet/ui/angular-serializable-forms';

@Component({
  templateUrl: './forgot.component.html',
})
export class ForgotComponent extends BaseComponent implements OnInit {
  formGroup!: FormGroup;
  resetSubmitted = false;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackService,
    private api: DefaultApi,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(formatRegexes.email),
        ],
      }),
    });
  }

  async reset(creds: { email: string }) {
    this.busy$$.next(true);
    this.email = creds.email;

    try {
      await this.api.userPasswordResetControllerPost(creds);
      this.resetSubmitted = true;
      this.busy$$.next(false);
    } catch (error: any) {
      this.handleError(error);
    }
  }

  handleError(e: Error) {
    this.busy$$.next(false);
    this.snackBar.oops();
    this.changeDetectorRef.detectChanges();
  }
}
