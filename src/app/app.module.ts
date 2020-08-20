import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomerService } from "./services/customer.service";
import { SharedModule } from "./shared/shared.module";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
