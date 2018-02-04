export class ServiceDescription {
  name: string;
  develop: string;
  sit: string;
  local: string;
  reindex;

  constructor(name: string, develop: string, sit: string, reindex, local:string) {
    this.name = name;
    this.develop = develop;
    this.sit = sit;
    this.reindex = reindex;
    this.local = local;
  }
}
