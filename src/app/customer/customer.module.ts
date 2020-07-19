import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { ShareModule } from "../share/share.module";

@NgModule({
  declarations: [CustomerFormComponent, CustomerListComponent],
  imports: [CommonModule, ShareModule, CustomerRoutingModule],
})
export class CustomerModule {}
