import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CLIENT_ID,CLIENT_SECRET} from '../credentials/githubCred';
import { Observable, throwError } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient: HttpClient) { }
   
  public getProfile(searchQuery):Observable<any>
  {
    let dataURL = `https://api.github.com/users/${searchQuery}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    
    return this.httpClient.get<any>(dataURL).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
   
  }
  public getRepos(searchQuery):Observable<any[]>
  {
    let dataURL = `https://api.github.com/users/${searchQuery}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    
    return this.httpClient.get<any[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
   
  }
  public handleErrors(error:HttpErrorResponse)
  {
      let errorMessaage: string;
      if(error.error instanceof ErrorEvent)
      {   
              errorMessaage = `MESSAGE : ${error.error.message}`;
      }
      else{
        errorMessaage = `STATUS : ${error.status} MESSAGE: ${error.message}`;
      }

      return throwError(errorMessaage);
  }
}
