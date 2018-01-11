import {Component, OnInit} from '@angular/core';
import {EnvironmentDataService} from "../../service/environment-data.service";
import {ServiceDescription} from "../../entity/service-description";

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

}
