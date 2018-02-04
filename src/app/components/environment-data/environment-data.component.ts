import {Component, OnInit} from '@angular/core';
import {EnvironmentDataService} from "../../service/environment-data.service";
import {ServiceDescription} from "../../entity/service-description";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-environment-data',
  templateUrl: './environment-data.component.html',
  styleUrls: ['./environment-data.component.css']
})
export class EnvironmentDataComponent implements OnInit {

  environmentsArray: ServiceDescription[] = [];

  constructor(private environmentDataService: EnvironmentDataService) {
    this.environmentDataService.getEnvData().subscribe(data => {
      this.environmentsArray = data;
      console.log(this.environmentsArray)},
        error => console.log(error));
  }

  ngOnInit() {
  }

  getDevelopReindexServices():string [] {
    let allServices = [];
    for (let item of this.environmentsArray) {
      for (let reindex of item.reindex) {
        allServices.push(item.develop + '/' + reindex);
      }
    }
    return allServices;
  }

  getDevelopHealthServices():string [] {
    let allServices = [];
    for (let item of this.environmentsArray) {
        allServices.push(item.develop);
    }
    return allServices;
  }

  getSitReindexServices():string [] {
    let allServices = [];
    for (let item of this.environmentsArray) {
      for (let reindex of item.reindex) {
        allServices.push(item.sit + '/' + reindex);
      }
    }
    return allServices;
  }

  getSitHealthServices():string [] {
    let allServices = [];
    for (let item of this.environmentsArray) {
      allServices.push(item.sit);
    }
    return allServices;
  }

  getLocalReindexServices():string [] {
    let allServices = [];
    for (let item of this.environmentsArray) {
      for (let reindex of item.reindex) {
        allServices.push(item.local + '/' + reindex);
      }
    }
    return allServices;
  }

}
