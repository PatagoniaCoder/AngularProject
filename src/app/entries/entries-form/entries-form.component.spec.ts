import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { EntriesService } from "src/app/services/entries.service";
import { SharedModule } from "src/app/shared/shared.module";
import { DOMHelper } from "src/testing/dom-helper";

import { EntriesFormComponent } from "./entries-form.component";

fdescribe("EntriesFormComponent", () => {
  let component: EntriesFormComponent;
  let fixture: ComponentFixture<EntriesFormComponent>;
  let dh: DOMHelper<EntriesFormComponent>;
  let router: Router;
  let entriesServiceMock: any;
  const mockCustomer = {
    idCustomer: 4,
    firstName: "New Customer FirstName",
    lastName: "New Customer LastName",
    cellPhone: "0123456789",
  };

  beforeEach(async(() => {
    entriesServiceMock = jasmine.createSpyObj(EntriesService, ["getAll"]);
    TestBed.configureTestingModule({
      declarations: [EntriesFormComponent],
      imports: [RouterTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [{ provide: EntriesService, useValue: entriesServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesFormComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should hava 5 inputs", () => {
    const inputs = dh.count("input");
    expect(inputs).toBe(5);
  });
  xit("should have at least 2 buttons", () => {
    const btns = dh.count("button");
    expect(btns).toBe(2);
  });
  xit('should have a "Save" button', () => {
    const btn = dh.countText("button", "save SAVE ");
    expect(btn).toBe(1);
  });
  xit('should have a "Cancel" button', () => {
    const btn = dh.countText("button", "cancel CANCEL ");
    expect(btn).toBe(1);
  });
  xit("should call method onSubmit", () => {
    spyOn(component, "onSubmit");

    component.form.firstName.setValue("a");
    component.form.lastName.setValue("b");
    component.form.cellPhone.setValue("c");
    fixture.detectChanges();
    dh.clickButton("save SAVE ");
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });
  xit('should return to "Customer-List" when push Cancel', async () => {
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
  xit("should add new Customer", () => {
    let firstname = component.form.firstName;
    firstname.setValue(mockCustomer.firstName);

    let lastName = component.form.lastName;
    lastName.setValue(mockCustomer.lastName);

    let cellPhone = component.form.cellPhone;
    cellPhone.setValue(mockCustomer.cellPhone);
    fixture.detectChanges();

    dh.clickButton("save SAVE ");
    fixture.detectChanges();
    component.entriesService.getAll().subscribe((result) => {
      expect(result.length).toBeGreaterThan(3);
    });
  });
  xit('should return to "Customer-List" when push Save', async () => {
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
