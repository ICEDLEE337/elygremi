import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Config, OninetCookieService, SnackService } from '@oninet/ui/common';
import { DefaultApi } from '@oninet/generated/account';
import { formatRegexes } from '@oninet/ui/angular-serializable-forms';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  busy$$ = new BehaviorSubject(false);
  busy$ = this.busy$$.asObservable();
  redirect: string | null;
  redirectUrl: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: OninetCookieService,
    private changeDetectorRef: ChangeDetectorRef,
    private api: DefaultApi
  ) { }

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.paramMap.get('redirect');

    if (this.cookieService.getAuthToken()) {
      this.router.navigate(['/']);
    }

    this.formGroup = this.formBuilder.group({
      name: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(formatRegexes.email),
        ],
      }),
      password: [null, Validators.required],
    });

    this.redirect = this.route.snapshot.paramMap.get('redirect');
  }

  async login(creds: { name: string; password: string }) {
    this.busy$$.next(true);

    try {
      const {idToken, token} = (await this.api.authControllerLogin(creds)).data;

      if (token) {
        this.cookieService.setSessionTokens(token, idToken);
        this.cookieService.deleteEmail();
        if (this.redirectUrl) {
          window.location.href = this.redirectUrl;
        } else {
          this.router.navigate(['/']);
        }
      }

      this.cookieService.setEmail(creds.name);

      this.busy$$.next(false);
      this.changeDetectorRef.detectChanges();
      // this.router.navigate(['/', 'mfa', this.redirect ?? '']);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.handleError(error);
    }
  }

  handleError(e: Error) {
    console.warn(e);
    this.busy$$.next(false);
    this.snackBar.oops();
    this.changeDetectorRef.detectChanges();
  }
}
