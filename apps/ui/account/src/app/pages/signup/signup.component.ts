import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Config } from '@oninet/ui/common';
import { DefaultApi } from '@oninet/generated/account';
import { formatRegexes } from '@oninet/ui/angular-serializable-forms';

@Component({
  selector: 'oninet-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;
  busy$$ = new BehaviorSubject(false);
  busy$ = this.busy$$.asObservable();
  emailSent = false;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private config: Config,
    private api: DefaultApi
  ) { }

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

  async signup(creds: { email: string }) {
    this.busy$$.next(true);

    try {
      await this.api.userInvitationControllerPost(creds)
      this.emailSent = true;
      this.email = creds.email;
    } catch (error: any) {
      if (error.response?.status === 409) {
        this.snackBar.open(
          `Looks like you already have an account. Try logging in with ${creds.email}.`
        );
      } else if (error.response?.status === 409) {
        this.snackBar.open(`That didn't work. Please try again.`);
      }
    }

    this.busy$$.next(false);
  }
}
