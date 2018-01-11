import {Injectable} from '@angular/core';
import {AuthToken} from "../entity/AuthToken";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import * as CurlParser from 'curl-parser';

@Injectable()
export class AuthServiceService {

  url: string = "assets/mock/auth_token.json";

  constructor(private http: HttpClient) {
  }

  /** GET token from the server */
  getAuthToken(curlUrl: string): Observable<AuthToken> {
    let curlObject = this.parseCurl(curlUrl);
    return this.http.post<AuthToken>(curlObject.url,
      curlObject.data.ascii, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      });
  }

  parseCurl(curlUrl: string) {
    return CurlParser.parse_curl(curlUrl);
  }

}
