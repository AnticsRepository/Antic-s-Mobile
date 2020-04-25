import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { HelpComponent } from '@shared/components/help/help.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserResponse } from '@shared/interfaces/interfaces';
import { Subject } from 'rxjs';
import { UserService } from '@core/services/user/user.service';
import { filter, takeUntil, finalize } from 'rxjs/operators';
import { LoginService } from '@core/services/login/login.service';
import { StorageService } from '@core/services/storage/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  remember = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private crafter: CrafterService,
              private userSrv: UserService,
              private loginSrv: LoginService,
              private ls: StorageService,
              private nav: NavController) {}

  ngOnInit() {
    this.createForm();
    this.checkToken();
    this.rememberMe();
  }

  private createForm(): void {
    this.form = new FormGroup({
       email: new FormControl('', [Validators.required,
                                   Validators.email,
                                   Validators.minLength(5),
                                   Validators.maxLength(35)]),
    password: new FormControl('', [Validators.required,
                                   Validators.minLength(5),
                                   Validators.maxLength(25)])});
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }
    const { email, password } = this.form.value;
    this.signIn(email, password);
  }

  private async signIn(e: string, p: string): Promise<void> {
    await this.crafter.loader();
    this.loginSrv.signIn(e, p)
      .pipe(
        filter(res => res && !!res.ok),
        takeUntil(this.unsubscribe$),
        finalize(() => this.crafter.loaderOff())
      )
      .subscribe((res: UserResponse) => {
        this.userSrv.UserLogIn(res);
        this.ls.setKey('remember', this.remember);
        this.nav.navigateRoot('tabs', { skipLocationChange: true });
      });
  }

  private checkToken(): void {
    this.userSrv.verifyToken()
    .pipe(
        filter(res => res && !!res.ok),
        takeUntil(this.unsubscribe$)
      )
    .subscribe((res: UserResponse) => {
      this.userSrv.UserLogIn(res);
      this.nav.navigateRoot('tabs', { skipLocationChange: true });
    });
  }

  private rememberMe(): void {
    const id = this.ls.get('user');
    const re = this.ls.get('remember');

    if ( re && id) {
      this.userSrv.getUserById(id)
       .pipe(
          filter(res => res && !!res.ok),
          takeUntil(this.unsubscribe$)
        )
       .subscribe((res: UserResponse) => {
          this.form.controls.email
          .setValue(res.user.email);
          this.remember = true;
      });
    }
  }

  public async openHelp(): Promise<void> {
    await this.crafter.pop(HelpComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
