import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient
  ) { }

  getArticle(id: number|string): Observable<object> {
    return this.http.get(`/api/articleLists/${id}`).pipe(
      tap(_ => console.log(`fetched article id=${id}`))
    )
  }

  getMdContent(url: string): Observable<any> {
    return this.http.post('/api/mdContent', { "contentUrl": url, "id": 1 }).pipe(
      tap(_ => console.log(`fetched article content url=${url}`))
    )
  }
}