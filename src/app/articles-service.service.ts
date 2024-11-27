import { Injectable } from '@angular/core';
import { API_BASE_URL } from './constant';
import { map, Observable, tap } from 'rxjs';
import { Article } from './entity/Article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesServiceService {


  constructor(private http: HttpClient) { }

  public all(): Observable<Array<Article>> {
    return this.http.get<Article>(API_BASE_URL+"/articles",
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log))
  }

  public getArticleFromId(id: string): Observable<Article> {
    return this.http.get<Article>(`${API_BASE_URL}/article/${id}`).pipe(
      map((response) => response) // Extraction du champ `data` de la réponse
    );
  }

  
  public modifyArticle(article:Article): Observable<boolean> {
    return this.http.put(API_BASE_URL+"/article"+article.id.toString(),
    article,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }
  

  public deleteArticleFromId(id: string): Observable<boolean> {
    return this.http.delete(API_BASE_URL+"/article/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public createArticle(article: Article) : Observable<boolean> {
    return this.http.post(API_BASE_URL,
      article,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===201))
  }
}
