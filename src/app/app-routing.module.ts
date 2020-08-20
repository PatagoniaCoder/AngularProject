import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {} from "./customer/customer.module";
import { HeaderComponent } from "./header/header.component";
export const routes: Routes = [
  {
    path: "header",
    component: HeaderComponent,
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
