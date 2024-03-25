import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomerService } from "./services/customer.service";
import { SharedModule } from "./shared/shared.module";
import { HeaderComponent } from "./header/header.component";
import { EntriesService } from "./services/entries.service";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [CustomerService, EntriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
