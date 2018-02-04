export class ServiceHealth {
  name: string;
  status: string;
  success: boolean;

  constructor( name: string, status: string, success:boolean) {
    this.name = name;
    this.status = status;
    this.success = success;
  }
}
