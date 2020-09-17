import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerFormComponent } from "./customer-form.component";
import { SharedModule } from "../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DOMHelper } from "../../../testing/dom-helper";
import { CustomerService } from "../../services/customer.service";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { CustomerDto } from "src/app/services/customer.dto";

describe("CustomerFormComponent", () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let dh: DOMHelper<CustomerFormComponent>;
  let router: Router;
  const mockCustomer: CustomerDto = {
    idCustomer: 4,
    firstName: "New Customer FirstName",
    lastName: "New Customer LastName",
    cellPhone: "0123456789",
  };

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [CustomerFormComponent],
      providers: [CustomerService],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    router = TestBed.inject(Router);
    router.initialNavigation();
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

    component.form.firstName.setValue("a");
    component.form.lastName.setValue("b");
    component.form.cellPhone.setValue("c");
    fixture.detectChanges();
    dh.clickButton("save SAVE ");
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });
  it('should return to "Customer-List" when push Cancel', async () => {
    const router: Router = TestBed.inject(Router);
    spyOn(router, "navigateByUrl");
    dh.clickButton("cancel CANCEL ");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/customer"]),
        { skipLocationChange: false, replaceUrl: false, state: undefined }
      );
    });
  });
  it("should add new Customer", () => {
    let firstname = component.form.firstName;
    firstname.setValue(mockCustomer.firstName);

    let lastName = component.form.lastName;
    lastName.setValue(mockCustomer.lastName);

    let cellPhone = component.form.cellPhone;
    cellPhone.setValue(mockCustomer.cellPhone);
    fixture.detectChanges();

    dh.clickButton("save SAVE ");
    fixture.detectChanges();
    component.custumerService.getAll().subscribe((result) => {
      expect(result.length).toBeGreaterThan(3);
    });
  });
  it('should return to "Customer-List" when push Save', async () => {
    spyOn(router, "navigateByUrl");
    component.form.firstName.setValue("a");
    component.form.lastName.setValue("b");
    component.form.cellPhone.setValue("c");
    fixture.detectChanges();
    dh.clickButton("save SAVE ");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/customer"]),
        { skipLocationChange: false }
      );
    });
  });
});
