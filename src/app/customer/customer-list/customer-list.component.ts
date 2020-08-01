import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { CustomerDto } from "src/app/services/customer.dto";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "../../services/customer.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  constructor(private customerService: CustomerService) {}
  displayedColumns: string[] = [
    "idCustomer",
    "firstName",
    "lastName",
    "cellPhone",
  ];
  dataSource = new MatTableDataSource<CustomerDto>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAll().subscribe((c) => {
      this.dataSource = new MatTableDataSource(c);
      this.dataSource.sort = this.sort;
    });
  }
}
