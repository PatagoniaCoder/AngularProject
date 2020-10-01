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
  const mockEntries = {
    idCustomer: 4,
    firstName: "New Entries FirstName",
    lastName: "New Entries LastName",
    cellPhone: "0123456789",
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntriesFormComponent],
      imports: [RouterTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [EntriesService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesFormComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    router = TestBed.inject(Router);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should have 5 inputs", () => {
    const inputs = dh.count("input");
    expect(inputs).toBe(5);
  });
  it("should have at least one TextArea", () => {
    const textarea = dh.count("textarea");
    expect(textarea).toBeGreaterThan(1);
  });
  it("should have at least 4 buttons", () => {
    const btns = dh.count("button");
    expect(btns).toBeGreaterThan(4);
  });
  it("should have a 'Save' button", () => {
    const btn = dh.countText("button", "saveSAVE ");
    expect(btn).toBe(1);
  });
  it("should have a 'Cancel' button", () => {
    const btn = dh.countText("button", "cancelCANCEL ");
    expect(btn).toBe(1);
  });
  it("should call method onSubmit", () => {
    spyOn(component, "onSubmit");
    component.form.firstName.setValue("a");
    component.form.lastName.setValue("b");
    component.form.cellPhone.setValue("c");
    fixture.detectChanges();
    dh.clickButton("saveSAVE ");
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });
  it("should return to 'Entries-List' when push Cancel", async () => {
    const router: Router = TestBed.inject(Router);
    spyOn(router, "navigateByUrl");
    dh.clickButton("cancelCANCEL ");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/entries"]),
        { skipLocationChange: false, replaceUrl: false, state: undefined }
      );
    });
  });
  it("should add new Entries", () => {
    let firstname = component.form.firstName;
    firstname.setValue(mockEntries.firstName);

    let lastName = component.form.lastName;
    lastName.setValue(mockEntries.lastName);

    let cellPhone = component.form.cellPhone;
    cellPhone.setValue(mockEntries.cellPhone);
    fixture.detectChanges();

    dh.clickButton("saveSAVE ");
    fixture.detectChanges();
    component.entriesService.getAll().subscribe((result) => {
      expect(result.length).toBeGreaterThanOrEqual(3);
    });
  });
  it("should return to 'Entries-List' when push Save", async () => {
    spyOn(router, "navigateByUrl");
    component.form.firstName.setValue("a");
    component.form.lastName.setValue("b");
    component.form.cellPhone.setValue("c");
    fixture.detectChanges();
    dh.clickButton("saveSAVE ");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/entries"]),
        { skipLocationChange: false }
      );
    });
  });
  it("should call the Incoming method", () => {
    spyOn(component, "addIncoming");
    dh.clickMatButton("ADD", "button");
    fixture.detectChanges();
    expect(component.addIncoming).toHaveBeenCalledTimes(1);
  });
  it("should add a Incoming", () => {
    let incoming = component.form.incoming;
    incoming.setValue({
      type: "algo aca",
      issue: "otra cosa",
      priority: "baja",
    });
    fixture.detectChanges();
    dh.clickMatButton("ADD", "button");
    fixture.detectChanges();
    const table = dh.findAll("table");
    const rows = table[0].nativeElement.tBodies[0].rows.length;
    expect(rows).toBe(3);
  });
});
