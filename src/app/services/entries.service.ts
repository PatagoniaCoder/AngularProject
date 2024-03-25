import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  form: FormGroup = new FormGroup({
    idCustomer: new FormControl(""),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    cellPhone: new FormControl("", Validators.required),
    incoming: new FormGroup({
      type: new FormControl(""),
      issue: new FormControl(""),
      priority: new FormControl(""),
    }),
  });

  initializeFormGroup() {
    this.form.setValue({
      idCustomer: null,
      firstName: "",
      lastName: "",
      cellPhone: "",
      incoming: { type: "", issue: "", priority: "" },
    });
  }
  getOne(id: any): Observable<EntriesDto> {
    throw new Error("Method not implemented.");
  }
  delete(element: number) {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<EntriesDto[]> {
    return of(entriesListMock);
  }
}
