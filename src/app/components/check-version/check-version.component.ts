import {Component, Input, OnInit} from "@angular/core";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {ServiceDescription} from "../../entity/service-description";
import {EnvironmentDataService} from "../../service/environment-data.service";
import {ServiceInfo} from "../../entity/service-info";

@Component({
  selector: "app-check-version",
  templateUrl: "./check-version.component.html",
  styleUrls: ["./check-version.component.css"]
})
export class CheckVersionComponent implements OnInit {

  @Input() serviceList: ServiceDescription[];
  closeResult: string;
  isFinished: boolean = false;
  processedList: ServiceInfo[] = [];
  processed: number = 0;
  processedPercentage: number = 0;
  allElements: number = 0;
  domen: string = "http://";
  versionUrl: string = "/info";
  NO_RESULT: string = "No result";

  ngOnInit() {
  }

  constructor(private modalService: NgbModal, private envService: EnvironmentDataService) {
  }

  open(content) {
    this.compareServices();
    this.modalService.open(content, {size: "lg"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  fetchAllServices() {
    this.processedList = [];
    for (let entry of this.serviceList) {
      let service = new ServiceInfo();
      service.name = entry.name;
      this.envService.getServiceInfo(this.domen + entry.develop + this.versionUrl).subscribe(timeStamp => {
          this.updateProgressBar();
          service.firstSourceTime = timeStamp;
        },
        error => {
          this.updateProgressBar();
          service.firstSourceTime = this.NO_RESULT;
        });
      this.envService.getServiceInfo(this.domen + entry.sit + this.versionUrl).subscribe(timeStamp => {
          service.secondSourceTime = timeStamp;
          this.updateProgressBar();
        },
        error => {
          this.updateProgressBar();
          service.secondSourceTime = this.NO_RESULT;
        });
      this.processedList.push(service);
    }
  }

  private updateProgressBar() {
    this.processed++;
    this.processedPercentage = (this.processed / this.allElements) * 100;
    if (this.processed == this.allElements) {
      this.isFinished = true;
    }
  }

  private compareServices() {
    this.isFinished = false;
    this.processed = 0;
    this.allElements = this.serviceList.length * 2;
    this.fetchAllServices();
  }

  getCompareClass(env1: string, env2: string) {
    if (env1 == this.NO_RESULT || env2 == this.NO_RESULT) {
      return "alert-dark";
    } else if (env1 == env2) {
      return "alert-success";
    } else {
      return "alert-danger";
    }
  }

}
