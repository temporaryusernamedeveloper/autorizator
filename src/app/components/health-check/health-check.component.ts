import {Component, OnDestroy, OnInit, Input} from "@angular/core";
import {Observable} from "rxjs/Observable";
// import {Http} from "@angular/http";
import {Subscription} from "rxjs/Subscription";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})
export class HealthCheckComponent implements OnInit, OnDestroy {
  @Input() pingUrl: string;
  @Input() pingIntervalMilli: number;
  @Input() title: string;

  private httpSubscription: Subscription;
  private svgSubscription: Subscription;

  private currentStatus: number | string;
  private success: number;
  private failure: number;

  private startAngle: number;
  private endAngle: number;
  private radius: number;
  private cx: number;
  private cy: number;
  private width: number;
  private color: string;
  private frameTime: number;
  private font: number;

  private RED: string = "#AA0000";
  private GREEN: string = "#00AA00";
  private BLUE: string = "#446688";


  constructor(private http: HttpClient) {
    // this.pingIntervalMilli = 3000;
    this.success = 0;
    this.failure = 0;

    this.startAngle = 1;
    this.endAngle = 360;
    this.cx = this.cy = 37;
    this.radius = 25;
    this.width = 10;
    this.color = this.RED;
    this.frameTime = 32;
    this.font = 11;
  }

  ngOnInit(): void {
    this.httpSubscription = this.http.get<Response>(this.pingUrl)
      .repeatWhen(() => Observable.timer(0, this.pingIntervalMilli))
      .retryWhen(err => {
        return err.do(res => {
          this.currentStatus = res.status === 0? "ERR": res.status;
          this.color = this.RED;
          this.failure++;
        }).delay(this.pingIntervalMilli)
      })
      .subscribe(res => {
        this.currentStatus = res.status;
        this.color = this.GREEN;
        this.success++;
      });

    this.svgSubscription = Observable.timer(0, this.frameTime)
      .takeWhile(val => val <= this.pingIntervalMilli/16)
      .repeatWhen(() => Observable.timer(0, this.pingIntervalMilli))
      .subscribe(() => {
        this.startAngle = this.startAngle +  Math.round((this.frameTime * 360)/this.pingIntervalMilli);
        if (this.startAngle > 360) {
          this.startAngle = this.startAngle - 360;
        }
      });
  }

  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
    this.svgSubscription.unsubscribe();
  }

  //http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
  private describeArc(): string {
    var start = this.polarToCartesian(this.cx, this.cy, this.radius, this.endAngle);
    var end = this.polarToCartesian(this.cx, this.cy, this.radius, this.startAngle);

    var largeArcFlag = this.endAngle - this.startAngle <= 180 ? "0" : "1";

    var d = [
      "M", start.x, start.y,
      "A", this.radius, this.radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
  }

  private polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

}
