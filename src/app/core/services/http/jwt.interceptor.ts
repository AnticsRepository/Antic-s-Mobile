import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';
import { UserResponse } from '@shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private ls: StorageService,
              private userSrv: UserService,
              private errorService: ErrorService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(((res: HttpResponse<any>) => {
    }), ((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.errorService.saveError(error);
        const id = this.ls.get('user');
        if (!id) { return throwError(error); }
        this.userSrv.refreshToken(id)
         .pipe(
           filter(res => res && !!res.ok),
           take(1)
          )
         .subscribe((res: UserResponse) => {
           this.userSrv.UserLogIn(res);
           this.router.navigateByUrl('tabs');
          });
      } else { return throwError(error); }
    })));
  }
}
