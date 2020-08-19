import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerListComponent } from "./customer-list.component";
import { DOMHelper } from "./../../../testing/dom-helper";
import { SharedModule } from "../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomerDto } from "src/app/services/customer.dto";
import { CustomerService } from "src/app/services/customer.service";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs/internal/observable/of";
import { Location } from "@angular/common";

describe("CustomerListComponent", () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let dh: DOMHelper<CustomerListComponent>;
  let customerServiceMock: any;
  let router: Router;
  const customersListMock: CustomerDto[] = [
    {
      idCustomer: 1,
      firstName: "One Name",
      lastName: "last Name",
      cellPhone: "00019796313",
    },
    {
      idCustomer: 2,
      firstName: "Two Name",
      lastName: "last Name",
      cellPhone: "25632225",
    },
    {
      idCustomer: 3,
      firstName: "Tree Name",
      lastName: "last Name",
      cellPhone: "9873354",
    },
  ];

  beforeEach(() => {
    customerServiceMock = jasmine.createSpyObj("CustomerService", [
      "getAll",
      "subscribe",
      "delete",
    ]);
    customerServiceMock.getAll.and.returnValue(of(customersListMock));
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [CustomerListComponent],
      providers: [{ provide: CustomerService, useValue: customerServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should have a mat-card-title", () => {
    const title = dh.singleText("mat-card-title");
    expect(title).toContain("Customers");
  });
  it("should have a mat-spinner", () => {
    const spinner = dh.count("mat-spinner");
    expect(spinner).toBe(1);
  });
  it("should at least have a button", () => {
    const btnCreate = dh.count("button");
    expect(btnCreate).toBeGreaterThan(1);
  });
  it("should have a button with the text 'Add Customer'", () => {
    const btnCreate = dh.singleText("button");
    expect(btnCreate).toBe(" Add Customer ");
  });
  it("should have a filter input", () => {
    const input = dh.count("input");
    expect(input).toBe(1);
  });
  it("should hava a table", () => {
    const table = dh.singleText("table");
    expect(table).toBeDefined();
  });
  it("should have a table with five colum", () => {
    const table = dh.findAll("table");
    const column = table[0].nativeElement.tHead.rows[0];
    const cells = column.cells.length;
    expect(cells).toBe(5);
  });
  it("should call customerService getAll method", () => {
    expect(customerServiceMock.getAll).toHaveBeenCalledTimes(1);
  });
  it("should list at least 3 customers", () => {
    const list = dh.findAll("table");
    const rows = list[0].nativeElement.tBodies[0].rows.length;
    expect(rows).toBe(customersListMock.length);
  });
  it("should navigate to CustumerForm", async () => {
    spyOn(router, "navigateByUrl");
    dh.clickButton(" Add Customer ");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/customer/create"]),
        { skipLocationChange: false, replaceUrl: false, state: undefined }
      );
    });
  });
  it("should have an update button for each item", () => {
    const list = dh.findAll("table");
    const rows = list[0].nativeElement.tBodies[0].rows.length;
    const btns = dh.countText("mat-icon", "edit");
    expect(btns).toBe(rows);
  });
  it("should navigate to CustomForms in update mode", async () => {
    spyOn(router, "navigateByUrl");
    const listItem = await fixture.nativeElement.querySelector("table");
    await listItem.rows[1].cells[4].children[0].click();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/customer/1"]),
        { skipLocationChange: false }
      );
    });
  });
  it("should have an delete button for each item", () => {
    const list = dh.findAll("table");
    const rows = list[0].nativeElement.tBodies[0].rows.length;
    const btns = dh.countText("mat-icon", "delete");
    expect(btns).toBe(rows);
  });
  it("should delete one item on the list", () => {
    const btns = dh.findAllWithText("mat-icon", "delete");
    const btn: HTMLButtonElement = btns[0].nativeNode;
    btn.click();
    expect(customerServiceMock.delete).toHaveBeenCalledWith(1);
  });
});
