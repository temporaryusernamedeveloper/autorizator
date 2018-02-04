import {Component, Input, OnInit} from "@angular/core";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {ServiceHealth} from "../../entity/service-health";

@Component({
  selector: "app-health-all",
  templateUrl: "./health-all.component.html",
  styleUrls: ["./health-all.component.css"]
})
export class HealthAllComponent implements OnInit {

  closeResult: string;
  isFinished: boolean = false;
  successProcessedList: ServiceHealth[] = [];
  // failedProcessedList: ServiceHealth[] = [];
  processed: number = 0;
  processedPercentage: number = 0;
  allElements: number = 0;
  domen: string = "http://";

  @Input() serviceList: string[];

  ngOnInit() {
  }

  constructor(private modalService: NgbModal, private http: HttpClient) {
  }

  open(content) {
    this.checkServices();
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
    this.successProcessedList = [];

    for (let service of this.serviceList) {
      console.log("service:" + service);
      this.http.get(this.domen + service, { responseType: 'text', observe: 'response' }).subscribe(resp => {
          console.log(resp);
          this.successProcessedList.push(new ServiceHealth(service, resp.status.toString(), true));
          this.updateProgressBar();
        },
        error => {
          this.successProcessedList.push(new ServiceHealth(service, error.status, false));
          this.updateProgressBar();
        });
    }
    console.log(this.successProcessedList);
  }

  private updateProgressBar() {
    this.processed++;
    this.processedPercentage = (this.processed / this.allElements) * 100;
    if (this.processed == this.allElements) {
      this.isFinished = true;
    }
  }

  private checkServices() {
    this.isFinished = false;
    this.processed = 0;
    this.allElements = this.serviceList.length;
    this.fetchAllServices();
  }
}
