import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { Router } from '@angular/router';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { StorageService } from '@core/services/storage/storage.service';
import { LanguageService } from '@core/language/services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})

export class SettingsPage implements OnInit {

  theme: string;
  language: string;
  remember: boolean;

  lang = [
    { value: 'es', name: 'Español' },
    { value: 'en', name: 'English' }
  ]

  mail = [
    { value: true, name: 'Sí' },
    { value: false, name: 'No' }
  ];

  constructor(
    private userSrv: UserService,
    private crafter: CrafterService,
    private router: Router,
    private ls: StorageService,
    private languageSrv: LanguageService
  ) {}

  ngOnInit() {
    this.getLocalData();
  }

  private getLocalData(): void {
    this.theme = this.ls.get('theme');
    this.language = this.ls.get('lang');
    this.remember = this.ls.get('remember');
  }

  public themeChanged(value: string): void {
    document.body.classList.toggle('dark');
    this.ls.setKey('theme', value);
  }

  public languageChanged(value: string): void {
    this.ls.setKey('lang', value);
    this.languageSrv.change(value);
  }

  public rememberChanged(value: string): void {
    this.ls.setKey('remember', value);
  }

  public logout(): void {
    const confirm = this.crafter.confirm('¿Estás seguro que quieres salir?', 'Desconectarse');
    confirm.then(res => {
      if (!res.role) {
        this.userSrv.logout();
        this.router.navigateByUrl('login');
      }
    })
  }

}