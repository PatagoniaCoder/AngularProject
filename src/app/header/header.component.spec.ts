import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { SharedModule } from "../shared/shared.module";
import { DOMHelper } from "src/testing/dom-helper";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Location } from "@angular/common";
import { CustomerListComponent } from "../customer/customer-list/customer-list.component";

describe("HeaderComponent", () => {
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
  it("should have 3 buttons", () => {
    const btns = dh.count("button");
    expect(btns).toBe(3);
  });
  it("should navigate to Home", fakeAsync(() => {
    const btns = dh.findAll("button");
    fixture.ngZone.run(() => {
      btns[0].triggerEventHandler("click", {});
      flush();
      fixture.detectChanges();
      expect(location.path()).toBe("/");
    });
  }));
  it("should navigate to Customer List", fakeAsync(() => {
    const btns = dh.findAll("button");
    fixture.ngZone.run(() => {
      btns[1].triggerEventHandler("click", {});
      flush();
      fixture.detectChanges();
      expect(location.path()).toBe("/customer");
    });
  }));
  it("should navigate to Login", () => {});
  it("should navigate to Register", () => {});
});
