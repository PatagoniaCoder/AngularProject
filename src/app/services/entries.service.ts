import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { EntriesDto } from "./entriesDTO";

const entriesListMock: EntriesDto[] = [
  {
    idEntry: 1,
    idCustomer: 1,
    idType: 1,
    dateInco: new Date(),
    dateEE: new Date(),
    priority: "Normal",
  },
  {
    idEntry: 2,
    idCustomer: 3,
    idType: 1,
    dateInco: new Date(),
    dateEE: new Date(),
    priority: "Alta",
  },
  {
    idEntry: 3,
    idCustomer: 2,
    idType: 1,
    dateInco: new Date(),
    dateEE: new Date(),
    priority: "Normal",
  },
];

@Injectable()
export class EntriesService {
  constructor() {}
  delete(element: number) {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<EntriesDto[]> {
    return of(entriesListMock);
  }
}
