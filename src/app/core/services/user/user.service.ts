import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { User, UserResponse } from '@app/shared/interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { StorageService } from '@app/core/services/storage/storage.service';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly API_USERS = environment.api + 'users';
  readonly API_TOKEN = environment.api + 'token';
  private user: User;

  constructor(private http: HttpService,
              private ls: StorageService) {
      if (!environment.production) { console.log('UserService'); }
  }

  public getUserById(id: string): Observable<UserResponse> {
    return this.http.get(environment.api + `user/${id}`);
  }

  public refreshToken(id: string): Observable<UserResponse> {
    return this.http.post(this.API_TOKEN + `/${id}`, null);
  }

  public verifyToken(): Observable<UserResponse> {
    if (!this.ls.get('token')) { return of(null); }
    return this.http.get(this.API_TOKEN)
      .pipe(map((res: UserResponse) => {
        if (res.ok) {
          this.user = res.user;
          return res;
        } else { this.logout(); }
    }));
  }

  public getUser(): User {
    return this.user || null;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public logout(): void {
    this.ls.setKey('token', null);
    this.ls.setKey('welcome', false);
    this.user = null;
  }

  public UserLogIn(data: UserResponse): void {
    this.setUser(data.user);
    this.ls.setKey('token', data.token);
    this.ls.setKey('user', data.user._id);
  }

}


