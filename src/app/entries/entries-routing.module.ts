import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EntriesFormComponent } from "./entries-form/entries-form.component";
import { EntriesListComponent } from "./entries-list/entries-list.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Entries",
    },
    children: [
      {
        path: "list",
        component: EntriesListComponent,
        data: {
          title: "Lists",
        },
      },
      {
        path: "create",
        component: EntriesFormComponent,
        data: {
          title: "Create",
        },
      },
      {
        path: ":id",
        component: EntriesFormComponent,
        data: {
          title: "Update",
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
export class EntriesRoutingModule {}
