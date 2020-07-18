import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";

@NgModule({
  declarations: [CustomerFormComponent, CustomerListComponent],
  imports: [CommonModule],
})
export class CustomerModule {}
