import {Injectable} from "@angular/core";
import {Header} from "../entity/header";

@Injectable()
export class StorageManagerService {

  constructor() {
  }

  getHeader(): Header {
    let storedHeader: string = localStorage.getItem("header");
    return storedHeader == null ? null : JSON.parse(storedHeader);
  }

  saveHeader(header: Header) {
    localStorage.setItem("header", JSON.stringify(header));
  }
}
