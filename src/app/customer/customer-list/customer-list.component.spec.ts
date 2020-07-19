import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerListComponent } from "./customer-list.component";
import { DOMHelper } from "./../../../testing/dom-helper";
import { ShareModule } from "../../share/share.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

fdescribe("CustomerListComponent", () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let dh: DOMHelper<CustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      imports: [ShareModule, BrowserAnimationsModule],
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
  it("should have a title", () => {
    const title = dh.singleText("mat-card-title");
    expect(title).toContain("Customers");
  });
  it("should at least have a button", () => {
    const btnCreate = dh.count("button");
    expect(btnCreate).toBe(1);
  });
  it("should have a button with the text 'Add Customer'", () => {
    const btnCreate = dh.singleText("button");
    expect(btnCreate).toBe(" Add Customer ");
  });
  it("should hava a table", () => {
    const table = dh.singleText("table");
    expect(table).toBeDefined();
  });
});
