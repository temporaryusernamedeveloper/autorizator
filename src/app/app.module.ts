import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {AuthServiceService} from "./service/auth-service.service";
import {FormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentDataComponent } from './components/environment-data/environment-data.component';
import {EnvironmentDataService} from "./service/environment-data.service";
import { DowloadComponentComponent } from './dowload-component/dowload-component.component';
import { SpinnerModule } from 'angular2-spinner';
import { ReindexAllModalComponent } from './components/reindex-all-modal/reindex-all-modal.component';
import { HealthCheckComponent } from './components/health-check/health-check.component';
import { HealthAllComponent } from './components/health-all/health-all.component';
import { CheckVersionComponent } from './components/check-version/check-version.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    EnvironmentDataComponent,
    DowloadComponentComponent,
    ReindexAllModalComponent,
    HealthCheckComponent,
    HealthAllComponent,
    CheckVersionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SpinnerModule
  ],
  providers: [AuthServiceService, EnvironmentDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
