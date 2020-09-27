import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { UserResponse, User } from '@shared/interfaces/interfaces';
import { filter, tap, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})

export class GoogleService {

  readonly API_GOOGLE = environment.api + 'google';
  public auth2: any;

  constructor(
    private http: HttpService,
    private userSrv: UserService
  ) { }

  public googleSignIn(token: string): Observable<User> {
    return this.http
      .post<UserResponse>(this.API_GOOGLE, {token})
      .pipe(
        filter(res => res && !!res.ok),
        tap(res => this.userSrv.UserLogIn(res)),
        map(res => res.user)
      )
  }

}
