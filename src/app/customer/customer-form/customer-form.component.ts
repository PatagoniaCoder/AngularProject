import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../services/customer.service";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"],
})
export class CustomerFormComponent implements OnInit {
  //TODO aviriguar porque tiene que ser publico
  constructor(public custumerService: CustomerService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log("Hizo click");
  }
}
