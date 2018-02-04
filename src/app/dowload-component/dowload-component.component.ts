import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dowload-component',
  templateUrl: './dowload-component.component.html',
  styleUrls: ['./dowload-component.component.css']
})
export class DowloadComponentComponent implements OnInit {

  @Input() name: string;
  @Input() url: string;
  @Input() buttonName: string;
  @Output() success:  EventEmitter<boolean> = new EventEmitter();
  statusSuccess: boolean = null;
  code;

  progress: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  callUrl() {
    this.progress = true;
    this.http.get(this.url,{ responseType: 'text', observe: 'response' }).subscribe(value => {
        this.progress = false;
        this.statusSuccess = true;
        this.code = value.status;
        this.success.emit(true);
      },
      error => {
        this.code = error.status;
        this.progress = false;
        this.statusSuccess = false;
        console.log(error);
        this.success.emit(false);
      });
  }

  isFailedStatus() {
    return !this.statusSuccess && this.statusSuccess!=null;
  }

}
