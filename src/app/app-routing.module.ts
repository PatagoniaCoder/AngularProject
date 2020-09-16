import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {} from "./customer/customer.module";
export const routes: Routes = [
  {
    path: "",
    redirectTo: "header",
    pathMatch: "full",
  },
  {
    path: "customer",
    loadChildren: "./customer/customer.module#CustomerModule",
  },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
