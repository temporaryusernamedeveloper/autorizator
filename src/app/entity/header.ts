export class Header {
  requestHeader: string;
  urlValueProducer: string;
  repentance: number;
  urlPattern: string;
  enabled: boolean;

  constructor(requestHeader: string, urlValueProducer: string, repentance: number, urlPattern: string, enabled: boolean) {
    this.requestHeader = requestHeader;
    this.urlValueProducer = urlValueProducer;
    this.repentance = repentance;
    this.urlPattern = urlPattern;
    this.enabled = enabled;
  }
}
