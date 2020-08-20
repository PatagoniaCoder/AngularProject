import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { CustomerDto } from "src/app/services/customer.dto";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "../../services/customer.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private route: Router
  ) {}
  displayedColumns: string[] = [
    "idCustomer",
    "firstName",
    "lastName",
    "cellPhone",
    "actions",
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
  deleteCustomer(element: CustomerDto) {
    this.customerService.delete(element.idCustomer).subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  updateCustomer(element: CustomerDto) {
    this.route.navigate([`/customer/${element.idCustomer}`]);
  }
}
