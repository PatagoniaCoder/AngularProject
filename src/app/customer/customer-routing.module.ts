import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerFormComponent } from "./customer-form/customer-form.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Customer",
    },
    children: [
      {
        path: "list",
        component: CustomerListComponent,
        data: {
          title: "Listado",
        },
      },
      {
        path: "create",
        component: CustomerFormComponent,
        data: {
          title: "Crear",
        },
      },
      {
        path: ":id",
        component: CustomerFormComponent,
        data: {
          title: "Actualizar",
        },
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "list",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
