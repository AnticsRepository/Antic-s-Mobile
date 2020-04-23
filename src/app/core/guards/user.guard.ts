import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/shared/interfaces/interfaces';

@Injectable({providedIn: 'root'})

export class UserGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> {
    return null
  }

}
