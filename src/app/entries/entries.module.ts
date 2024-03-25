import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EntriesFormComponent } from "./entries-form/entries-form.component";
import { EntriesListComponent } from "./entries-list/entries-list.component";
import { EntriesRoutingModule } from "./entries-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [EntriesFormComponent, EntriesListComponent],
  imports: [CommonModule, EntriesRoutingModule, SharedModule],
})
export class EntriesModule {}
