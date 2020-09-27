import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { UserResponse, User } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { UserService } from '../user/user.service';
import { filter, tap, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class LoginService {

  readonly API_LOGIN = environment.api + 'login';
  readonly API_USER = environment.api + 'users';

  constructor(private http: HttpService,
              private userSrv: UserService) { }

  public signIn(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http
      .post<UserResponse>(this.API_LOGIN, body)
      .pipe(
        filter(res => res && !!res.ok),
        tap(res => this.userSrv.UserLogIn(res)),
        map(res => res.user)
      )
  }

}
