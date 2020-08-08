import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerFormComponent } from "./customer-form.component";
import { SharedModule } from "../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DOMHelper } from "../../../testing/dom-helper";
import { CustomerService } from "../../services/customer.service";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

describe("CustomerFormComponent", () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let dh: DOMHelper<CustomerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [CustomerFormComponent],
      providers: [CustomerService],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should hava 3 inputs", () => {
    const inputs = dh.count("input");
    expect(inputs).toBe(3);
  });
  it("should have at least 2 buttons", () => {
    const btns = dh.count("button");
    expect(btns).toBe(2);
  });
  it('should have a "Save" button', () => {
    const btn = dh.countText("button", "save SAVE ");
    expect(btn).toBe(1);
  });
  it('should have a "Cancel" button', () => {
    const btn = dh.countText("button", "cancel CANCEL ");
    expect(btn).toBe(1);
  });
  it("should call method onSubmit", () => {
    spyOn(component, "onSubmit");
    dh.clickButton("save SAVE ");
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });
  it('should return to "Customer-List"', () => {
    const router: Router = TestBed.get(Router);
    spyOn(router, "navigateByUrl");
    dh.clickButton("cancel CANCEL ");
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(["/customer"]),
      { skipLocationChange: false, replaceUrl: false, state: undefined }
    );
  });
});
