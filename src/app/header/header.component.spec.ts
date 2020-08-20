import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { SharedModule } from "../shared/shared.module";
import { DOMHelper } from "src/testing/dom-helper";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dh: DOMHelper<HeaderComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should have 4 buttons", () => {
    const btns = dh.count("button");
    expect(btns).toBe(4);
  });
  it("should navigate to Home", async () => {
    spyOn(router, "navigateByUrl");
    dh.clickMatButton("home", "mat-icon");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/"]),
        { skipLocationChange: false, replaceUrl: false, state: undefined }
      );
    });
  });
  it("should navigate to Customer List", async () => {
    spyOn(router, "navigateByUrl");
    dh.clickMatButton("groups", "mat-icon");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/customer"]),
        { skipLocationChange: false, replaceUrl: false, state: undefined }
      );
    });
  });
  it("should navigate to Supplier List", async () => {
    spyOn(router, "navigateByUrl");
    dh.clickMatButton("domain", "mat-icon");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/supplier"]),
        { skipLocationChange: false, replaceUrl: false, state: undefined }
      );
    });
  });
  it("should navigate to Login", () => {});
  it("should navigate to Register", () => {});
});
