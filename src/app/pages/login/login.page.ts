import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { HelpComponent } from '@shared/components/help/help.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '@shared/interfaces/interfaces';
import { Subject, concat, from } from 'rxjs';
import { UserService } from '@core/services/user/user.service';
import { takeUntil, finalize } from 'rxjs/operators';
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
    this.checkToken();
    this.createForm();
  }

  private async checkToken(): Promise<void> {
    this.userSrv.verifyToken()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(_ => {
      _ ? this.nav.navigateRoot('tabs') :
      this.rememberMe();
    });
  }

  private createForm(): void {
    this.form = new FormGroup({
       email: new FormControl('', [
         Validators.required,
         Validators.email,
         Validators.minLength(5),
         Validators.maxLength(35)
       ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25)
    ])});
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }
    const { email, password } = this.form.value;
    this.signIn(email, password);
  }

  private signIn(e: string, p: string): void {
    concat(
      from(this.crafter.loader()),
      this.loginSrv.signIn(e, p)
    ).pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.crafter.loaderOff())
      )
      .subscribe(_ => {
        this.ls.setKey('remember', this.remember);
        this.nav.navigateRoot('tabs');
      });
  }

  private rememberMe(): void {
    const id = this.ls.get('user');
    const re = this.ls.get('remember');

    if ( re && id) {
      this.userSrv.getUserById(id)
       .pipe(takeUntil(this.unsubscribe$))
       .subscribe((res: User) => {
          this.form.controls.email
          .setValue(res.email);
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
