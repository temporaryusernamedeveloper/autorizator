import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthToken} from "../entity/AuthToken";
import {Observable} from "rxjs/Observable";
import {ServiceDescription} from "../entity/service-description";

@Injectable()
export class EnvironmentDataService {

  url: string = "assets/mock/environments.json";

  constructor(private http: HttpClient) {
  }

  /** GET token from the server */
  getEnvData(): Observable<ServiceDescription[]> {
    return this.http.get<ServiceDescription[]>(this.url);
  }

}
