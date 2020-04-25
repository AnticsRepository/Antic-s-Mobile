import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  constructor() { }

  public isDark(): boolean {
    return document.body.classList.contains('dark');
  }

  public toggleTheme(): void {
    document.body.classList.toggle('dark');
  }
}
