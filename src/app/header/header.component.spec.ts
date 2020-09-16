import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
  flush,
} from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { SharedModule } from "../shared/shared.module";
import { DOMHelper } from "src/testing/dom-helper";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Location } from "@angular/common";
import { CustomerModule } from "../customer/customer.module";
import { CustomerRoutingModule } from "../customer/customer-routing.module";
import { CustomerListComponent } from "../customer/customer-list/customer-list.component";

fdescribe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dh: DOMHelper<HeaderComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
          {
            path: "",
            component: HeaderComponent,
          },
          {
            path: "customer",
            component: CustomerListComponent,
          },
          { path: "supplier", component: CustomerListComponent },
        ]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    dh = new DOMHelper(fixture);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should have 4 buttons", () => {
    const btns = dh.count("button");
    expect(btns).toBe(4);
  });
  fit("should navigate to Home", fakeAsync(() => {
    const btns = dh.findAll("button");
    fixture.ngZone.run(() => {
      btns[0].triggerEventHandler("click", {});
      flush();
      fixture.detectChanges();
      expect(location.path()).toBe("/");
    });
  }));
  fit("should navigate to Customer List", fakeAsync(() => {
    const btns = dh.findAll("button");
    fixture.ngZone.run(() => {
      btns[1].triggerEventHandler("click", {});
      flush();
      fixture.detectChanges();
      expect(location.path()).toBe("/customer");
    });
  }));
  fit("should navigate to Supplier List", fakeAsync(() => {
    const btns = dh.findAll("button");
    fixture.ngZone.run(() => {
      btns[2].triggerEventHandler("click", {});
      flush();
      fixture.detectChanges();
      expect(location.path()).toBe("/supplier");
    });
  }));
  it("should navigate to Login", () => {});
  it("should navigate to Register", () => {});
});
