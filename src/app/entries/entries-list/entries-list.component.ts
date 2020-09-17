import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { EntriesDto } from "src/app/services/entriesDTO";
import { EntriesService } from "../../services/entries.service";

@Component({
  selector: "app-entries-list",
  templateUrl: "./entries-list.component.html",
  styleUrls: ["./entries-list.component.scss"],
})
export class EntriesListComponent implements OnInit {
  constructor(private entriesService: EntriesService, private router: Router) {}

  displayedColumns: string[] = [
    "idEntry",
    "idCustomer",
    "idType",
    "dateInco",
    "dateEE",
    "priority",
    "actions",
  ];
  dataSource: MatTableDataSource<EntriesDto>;

  ngOnInit(): void {
    this.entriesService.getAll().subscribe((entries) => {
      this.dataSource = new MatTableDataSource(entries);
    });
  }

  updateEntry(element: EntriesDto) {
    this.router.navigate([`/entries/${element.idEntry}`]);
  }
  deleteEntry(element: EntriesDto) {
    this.entriesService.delete(element.idEntry);
  }
}
