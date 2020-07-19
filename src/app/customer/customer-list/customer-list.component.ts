import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { CustomerDto } from "src/app/services/customer.dto";
import { MatTableDataSource } from "@angular/material/table";

const ELEMENT_DATA: CustomerDto[] = [
  { idCustomer: 1, firstName: "Hydrogen", lastName: "H", cellPhone: "123" },
  { idCustomer: 2, firstName: "Helium", lastName: "H", cellPhone: "456" },
  { idCustomer: 3, firstName: "Lithium", lastName: "L", cellPhone: "789" },
];

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = [
    "idCustomer",
    "firstName",
    "lastName",
    "cellPhone",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
}
