import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { CustomerDto } from "src/app/services/customer.dto";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"],
})
export class CustomerFormComponent implements OnInit {
  mode: string;
  constructor(
    public custumerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  get form() {
    return this.custumerService.form.controls;
  }

  ngOnInit(): void {
    this.begining();
  }

  begining() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.custumerService.getOne(params.id).subscribe((customer) => {
          this.setCustomer(customer);
        });
      } else {
        this.custumerService.form.reset();
        this.custumerService.initializeFormGroup();
      }
    });
  }
  setCustomer(customer: CustomerDto) {
    this.mode = "update";
    this.form.firstName.setValue(customer.firstName);
    this.form.lastName.setValue(customer.lastName);
    this.form.cellPhone.setValue(customer.cellPhone);
    this.form.idCustomer.setValue(customer.idCustomer);
  }

  onSubmit(values) {
    if (this.custumerService.form.valid) {
      const newCustomer: CustomerDto = {
        idCustomer: values.idCustomer,
        firstName: values.firstName,
        lastName: values.lastName,
        cellPhone: values.cellPhone,
      };
      if (this.mode === "update") {
        this.custumerService
          .update(newCustomer.idCustomer, newCustomer)
          .subscribe((result) => {
            if (result) {
              this.router.navigate([`/customer/${result.idCustomer}`]);
            }
          });
      } else {
        this.custumerService.create(newCustomer);
        this.router.navigate(["/customer"]);
      }
    } else {
      console.log(this.custumerService.form.valid);
    }
  }
}
