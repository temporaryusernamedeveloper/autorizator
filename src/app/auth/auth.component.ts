/// <reference path="../../../node_modules/@types/selenium-webdriver/chrome.d.ts"/>

import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthServiceService} from "../service/auth-service.service";
import {AuthToken} from "../entity/AuthToken";
import {Header} from "../entity/header";
import {Observable, Subject} from 'rxjs/Rx';
import {Filter} from "../entity/filter";
import {HttpErrorResponse} from "@angular/common/http";
import {StorageManagerService} from "../service/storage-manager.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isEditable: boolean = false;
  header: Header;
  @ViewChild('f') form: any;
  authToken: AuthToken;
  allHost = ["<all_urls>"];
  filter: Filter = new Filter([]);
  interval = null;

  constructor(private authService: AuthServiceService, private headerStorageService: StorageManagerService) {
    this.header = headerStorageService.getHeader();

    if (this.header == null) {
      this.header = new Header("Authorization",
        "curl https://sts-test.adidas-group.com/adfs/oauth2/token" +
        " -d grant_type=password -d client_id=3140e43b-ed0e-42c6-909c-9e64cce48834" +
        " -d client_secret=Ftwsktm-j3PEK5Mhy5lFqJtZbdBWD16-PhwMEUs5" +
        " -d resource=https://atp-dev.adidas.com" +
        " -d username=emea\\\\TST_ACEROROB1 -d password=Test.8888", 29, "<all_urls>",
        true);
    }
    this.authToken = new AuthToken();
    this.filter.urls.push(this.allHost[0]);
    this.updateHeader();
    if (typeof chrome.browserAction !== 'undefined') {
      let authToken = this.authToken;
      let header = this.header;
      chrome.webRequest.onBeforeSendHeaders.addListener( (details) => {
          let targetHeaders = [];
          var headers = details.requestHeaders;
          var blockingResponse = <any>{};

          if (this.header.enabled == true && authToken.access_token != null) {
            for (let i = 0, l = headers.length; i < l; ++i) {
              targetHeaders.push({name: headers[i].name, value: headers[i].value});
            }
            let tokenValue = authToken.token_type + " " + authToken.access_token;
            targetHeaders.push({name: header.requestHeader, value: tokenValue});
          } else {
            targetHeaders = headers;
          }
          blockingResponse.requestHeaders = targetHeaders;
          return blockingResponse;
        }
        ,
        this.filter
        ,
        ['requestHeaders', 'blocking'],
      );
    } else {
      console.log('EventPage initialized');
    }
  }

  isEmptyUrlPattern() {
    return this.header.urlPattern == null || this.header.urlPattern == undefined || this.header.urlPattern == '';
  }

  updateHeader() {
    function updateToken() {
      return Observable.interval(this.header.repentance * 60000).startWith(1).subscribe(value => {
        this.authService.getAuthToken(this.header.urlValueProducer).subscribe(token => {
          this.authToken.access_token = token.access_token;
          this.authToken.token_type = token.token_type;
        },(err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
          console.log(err);
        })
      });
    }

    if (this.interval == null) {
      this.interval = updateToken.call(this)
    } else {
      this.interval.unsubscribe();
      this.interval = updateToken.call(this)
    }
  }

  updateFilter(pattern: string) {
    this.filter.urls.pop();
    if (this.isEmptyUrlPattern()) {
      this.filter.urls.push(this.allHost[0]);
    } else {
      this.filter.urls.push(pattern);
    }
  }

  changeEditStatus() {
    this.isEditable = !this.isEditable;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log("Form Submitted!");
      this.updateHeader();
      this.updateFilter(this.header.urlPattern);
      this.changeEditStatus();
      console.log(this.filter);
      this.headerStorageService.saveHeader(this.header);
    }
  }

  switchAddingHeader() {
    this.header.enabled = !this.header.enabled;
    this.headerStorageService.saveHeader(this.header);

  }

  ngOnInit() {
  }
}
