import {Component, Input, OnInit} from "@angular/core";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "app-reindex-all-modal",
  templateUrl: "./reindex-all-modal.component.html",
  styleUrls: ["./reindex-all-modal.component.css"]
})
export class ReindexAllModalComponent implements OnInit {

  @Input() serviceList: string[];
  closeResult: string;
  isFinished:boolean = false;
  successProcessedList: string[] = [];
  failedProcessedList: string[] = [];
  processed: number = 0;
  processedPercentage: number = 0;
  allElements:number = 0;
  domen:string = "http://";

  ngOnInit() {
  }

  constructor(private modalService: NgbModal, private http: HttpClient) {
  }

  open(content) {
    this.reindexServices();
    this.modalService.open(content).result.then((result) => {
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
    this.failedProcessedList = [];
    console.log("We are here");
    console.log( this.serviceList);
    for (let entry of this.serviceList) {
      console.log("Reindex" + entry);
      this.http.get<Response>(this.domen + entry).subscribe(value => {
          this.successProcessedList.push(entry);
          this.updateProgressBar();
        },
        error => {
          this.failedProcessedList.push(entry);
          this.updateProgressBar();
        });
    }
  }

  private updateProgressBar() {
    this.processed++;
    this.processedPercentage = (this.processed/this.allElements) * 100;
    if (this.processed == this.allElements) {
      this.isFinished = true;
    }
  }

  private reindexServices() {
    this.isFinished = false;
    this.processed = 0;
    this.allElements = this.serviceList.length;
    this.fetchAllServices();
  }
}
