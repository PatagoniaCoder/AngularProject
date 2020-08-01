import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ShareModule } from "./share/share.module";
import { MatSliderModule } from "@angular/material/slider";
import { CustomerService } from "./services/customer.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
