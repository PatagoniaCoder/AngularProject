import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { EntriesService } from "src/app/services/entries.service";
import { EntriesDto } from "src/app/services/entriesDTO";
import { SharedModule } from "src/app/shared/shared.module";
import { DOMHelper } from "../../../testing/dom-helper";

import { EntriesListComponent } from "./entries-list.component";

describe("EntriesListComponent", () => {
  let component: EntriesListComponent;
  let fixture: ComponentFixture<EntriesListComponent>;
  let dh: DOMHelper<EntriesListComponent>;
  let router: Router;
  let entriesServiceMock: any;
  const entriesListMock: EntriesDto[] = [
    {
      idEntry: 1,
      idCustomer: 1,
      idType: 1,
      dateInco: new Date("2020-09-17"),
      dateEE: new Date("2020-09-20"),
      priority: "Normal",
    },
    {
      idEntry: 2,
      idCustomer: 3,
      idType: 1,
      dateInco: new Date("2020-09-17"),
      dateEE: new Date("2020-09-20"),
      priority: "Alta",
    },
    {
      idEntry: 3,
      idCustomer: 2,
      idType: 1,
      dateInco: new Date("2020-09-17"),
      dateEE: new Date("2020-09-20"),
      priority: "Normal",
    },
  ];

  beforeEach(async(() => {
    entriesServiceMock = jasmine.createSpyObj(EntriesService, [
      "getAll",
      "delete",
    ]);
    entriesServiceMock.getAll.and.returnValue(of(entriesListMock));
    TestBed.configureTestingModule({
      declarations: [EntriesListComponent],
      imports: [RouterTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [{ provide: EntriesService, useValue: entriesServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should have a mat-card-title", () => {
    const title = dh.singleText("mat-card-title");
    expect(title).toContain("Entries");
  });
  it("should have a mat-spinner", () => {
    const spinner = dh.count("mat-spinner");
    expect(spinner).toBe(1);
  });
  it("should at least have a button", () => {
    const btnCreate = dh.count("button");
    expect(btnCreate).toBeGreaterThan(1);
  });
  it("should have a button with the text 'Add Entry'", () => {
    const btnCreate = dh.singleText("button");
    expect(btnCreate).toBe(" Add Entry ");
  });
  it("should have a filter input", () => {
    const input = dh.count("input");
    expect(input).toBe(1);
  });
  it("should hava a table", () => {
    const table = dh.singleText("table");
    expect(table).toBeDefined();
  });
  it("should have a table with seven colum", () => {
    const table = dh.findAll("table");
    const column = table[0].nativeElement.tHead.rows[0];
    const cells = column.cells.length;
    expect(cells).toBe(7);
  });
  it("should call entriesService getAll method", () => {
    expect(entriesServiceMock.getAll).toHaveBeenCalledTimes(1);
  });
  it("should list at least 3 entries", () => {
    const list = dh.findAll("table");
    const rows = list[0].nativeElement.tBodies[0].rows.length;
    expect(rows).toBe(entriesListMock.length);
  });
  it("should navigate to EntriesForm", async () => {
    spyOn(router, "navigateByUrl");
    dh.clickButton(" Add Entry ");
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/entries/create"]),
        { skipLocationChange: false, replaceUrl: false, state: undefined }
      );
    });
  });
  it("should have a update button for each item", () => {
    const list = dh.findAll("table");
    const rows = list[0].nativeElement.tBodies[0].rows.length;
    const btns = dh.countText("mat-icon", "edit");
    expect(btns).toBe(rows);
  });
  it("should navigate to EntriesForms in update mode", async () => {
    spyOn(router, "navigateByUrl");
    const listItem = await fixture.nativeElement.querySelector("table");
    await listItem.rows[1].cells[6].children[0].click();
    await fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(["/entries/1"]),
        { skipLocationChange: false }
      );
    });
  });
  it("should have a delete button for each item", () => {
    const list = dh.findAll("table");
    const rows = list[0].nativeElement.tBodies[0].rows.length;
    const btns = dh.countText("mat-icon", "delete");
    expect(btns).toBe(rows);
  });
  it("should delete one item on the list", () => {
    const btns = dh.findAllWithText("mat-icon", "delete");
    const btn: HTMLButtonElement = btns[0].nativeNode;
    btn.click();
    expect(entriesServiceMock.delete).toHaveBeenCalledWith(1);
  });
});
