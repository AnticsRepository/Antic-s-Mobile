import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { takeUntil, finalize } from 'rxjs/operators';
import { GoogleService } from '@core/services/login/google.service';
import { Subject, concat } from 'rxjs';
import { ThemeService } from '@services/theme/theme.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { NavController } from '@ionic/angular';

declare const gapi: any;

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})

export class SocialLoginComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private google: GoogleService,
    private nav: NavController,
    private zone: NgZone,
    public theme: ThemeService,
    private crafter: CrafterService
  ) { }

  ngOnInit() {
    this.initGoogle();
  }

  public initGoogle(): void {
    const element = document.getElementById('google');
    gapi.load('auth2', ()=> {
      this.google.auth2 = gapi.auth2.init({
        client_id: environment.keys.google,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.googlePrompt(element);
    });
  }

  private googlePrompt(element: HTMLElement): void {
    this.google.auth2.attachClickHandler(element, null,
      (profile: any) => {
        const token = profile.getAuthResponse().id_token;
        concat(
          this.crafter.loader(),
          this.google.googleSignIn(token)
        )
        .pipe(
          takeUntil(this.unsubscribe$),
          finalize(() => this.crafter.loaderOff())
        )
        .subscribe(() =>
          this.zone.run(_ => this.nav.navigateRoot('tabs'))
        );
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
