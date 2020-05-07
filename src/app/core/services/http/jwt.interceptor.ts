import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';
import { ErrorService } from '../error/error.service';
import { NavController } from '@ionic/angular';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private ls: StorageService,
    private userSrv: UserService,
    private errorSrv: ErrorService,
    private nav: NavController
  ) {}

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(tap((() => {
    }), ((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.errorSrv.saveError(error);
        const id = this.ls.get('user');
        if (!id) { return throwError(error); }
        this.userSrv.refreshToken(id)
         .pipe(take(1))
         .subscribe(_ => this.nav.navigateRoot('tabs'));
      } else { return throwError(error); }
    })));
  }
}
