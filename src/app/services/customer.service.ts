import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { CustomerDto } from "./customer.dto";
import { of } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";

const customersListMock: CustomerDto[] = [
  {
    idCustomer: 1,
    firstName: "One Name",
    lastName: "last Name",
    cellPhone: "00019796313",
  },
  {
    idCustomer: 2,
    firstName: "Two Name",
    lastName: "last Name",
    cellPhone: "25632225",
  },
  {
    idCustomer: 3,
    firstName: "Tree Name",
    lastName: "last Name",
    cellPhone: "9873354",
  },
];
@Injectable()
export class CustomerService {
  constructor() {}
  form: FormGroup = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    cellPhone: new FormControl("", Validators.required),
  });
  getAll(): Observable<CustomerDto[]> {
    return of(customersListMock);
  }
}
