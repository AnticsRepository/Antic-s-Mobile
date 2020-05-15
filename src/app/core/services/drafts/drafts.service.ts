import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { DraftResponse, Draft } from '@shared/interfaces/interfaces';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class DraftsService {

  public drafts: Draft[];

  readonly API_DRAFTS = environment.api + 'drafts/';

  constructor(private http: HttpService) { }

  public get(): Draft[] {
   return this.drafts || null;
  }

  public getDraftsByUser(): Observable<Draft[]> {
    return this.http
    .get<DraftResponse>(this.API_DRAFTS + 'user')
    .pipe(
      filter(res => res && !!res.ok),
      tap(res => this.drafts = res.drafts),
      map(res => res.drafts)
    );
  }

  public getDraftBySlug(slug: string): Observable<Draft> {
    return this.http
      .get<DraftResponse>(this.API_DRAFTS + slug)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.draft)
      );
  }

  public createDraft(draft: Draft): Observable<Draft> {
    return this.http
      .post<DraftResponse>(this.API_DRAFTS, draft)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.draft)
      );
  }

  public updateDraft(draft: Draft): Observable<Draft> {
    return this.http
      .put<DraftResponse>(this.API_DRAFTS, draft)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.draft)
      );
  }

  public updateDraftMessage(
    message: string, id: string
  ): Observable<DraftResponse> {
    return this.http
      .put<DraftResponse>(this.API_DRAFTS + 'message/' + id, {message})
      .pipe(
        filter(res => res && !!res.ok)
      );
  }

}