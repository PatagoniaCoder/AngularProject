import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [CustomerFormComponent, CustomerListComponent],
  imports: [CommonModule, SharedModule, CustomerRoutingModule],
})
export class CustomerModule {}
