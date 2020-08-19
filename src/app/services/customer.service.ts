import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { CustomerDto } from "./customer.dto";
import { of } from "rxjs/internal/observable/of";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable()
export class CustomerService {
  constructor() {}
  form: FormGroup = new FormGroup({
    idCustomer: new FormControl(""),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    cellPhone: new FormControl("", Validators.required),
  });
  customersListMock: CustomerDto[] = [
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
  initializeFormGroup() {
    this.form.setValue({
      idCustomer: null,
      firstName: "",
      lastName: "",
      cellPhone: "",
    });
  }

  getAll(): Observable<CustomerDto[]> {
    return of(this.customersListMock);
  }
  getOne(id: number): Observable<CustomerDto> {
    const result = this.customersListMock.find((x) => x.idCustomer == id);
    return of(result);
  }
  update(id: number, body: CustomerDto): Observable<CustomerDto> {
    this.customersListMock
      .filter((c) => c.idCustomer == id)
      .map((x) => {
        x.firstName = body.firstName;
        x.lastName = body.lastName;
        x.cellPhone = body.cellPhone;
      });
    return of(this.customersListMock.find((x) => x.idCustomer == id));
  }
  create(body: CustomerDto): CustomerDto {
    body.idCustomer = this.customersListMock.length + 1;
    this.customersListMock.push(body);
    return this.customersListMock.find((x) => x.idCustomer === body.idCustomer);
  }
  delete(id: number): Observable<CustomerDto[]> {
    console.log("para eliminar", id);
    this.customersListMock = this.customersListMock.filter(
      (x) => x.idCustomer !== id
    );
    return of(this.customersListMock);
  }
}
