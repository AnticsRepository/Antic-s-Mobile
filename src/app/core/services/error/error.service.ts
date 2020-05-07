import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { CustomError } from '@shared/interfaces/interfaces';
import { APP_CONSTANTS } from '@app/app.config';
import { StorageService } from '@core/services/storage/storage.service';
import { environment } from '@env/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class ErrorService {

  readonly API_ERRORS = environment.api + 'errors/';

  constructor(
    private http: HttpService,
    private ls: StorageService
  ) { }

  public saveError(err: Error | HttpErrorResponse): void {
    const error = this.handle(err);
    this.http.post(this.API_ERRORS, error).toPromise().then();
  }

  private handle(err: Error | HttpErrorResponse): CustomError {
    if (err instanceof HttpErrorResponse) {
      return new CustomError(
        err?.name || 'Error',
        err?.error?.message || 'Unkwon Error',
        err?.statusText,
        this.ls.get('user') || null,
        err?.status,
        err?.url,
        APP_CONSTANTS.PLATFORM
      );
    } else {
      return new CustomError(
        err?.name || 'Error',
        err?.message || 'Unknown Error',
        err?.stack,
        this.ls.get('user') || null,
        null,
        null,
        APP_CONSTANTS.PLATFORM
      );
    }
  }

}
