import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerListComponent } from "./customer-list.component";
import { DOMHelper } from "./../../../testing/dom-helper";
import { ShareModule } from "../../share/share.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomerDto } from "src/app/services/customer.dto";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";

fdescribe("CustomerListComponent", () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let dh: DOMHelper<CustomerListComponent>;
  let customerServiceMock;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      imports: [ShareModule, BrowserAnimationsModule],
      providers: [CustomerService], //{ provide: CustomerService, useValue: customerServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
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
  it("should have a table with four colum", () => {
    const table = dh.findAll("table");
    const column = table[0].nativeElement.tHead.rows[0];
    const cells = column.cells.length;
    expect(cells).toBe(4);
  });
  it("should call customerService getAll method", () => {
    //expect(customerServiceMock.getAll).toHaveBeenCalled();
  });
  it("should list 3 customers", () => {
    /*     component.getAllCustomers();
    fixture.detectChanges(); */

    const list = dh.findAll("table");
    const rows = list[0].nativeElement.tBodies[0].rows.length;
    expect(rows).toBe(customersListMock.length);
  });
});
