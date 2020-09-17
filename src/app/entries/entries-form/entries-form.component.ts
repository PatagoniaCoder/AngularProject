import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { EntriesService } from "src/app/services/entries.service";

@Component({
  selector: "app-entries-form",
  templateUrl: "./entries-form.component.html",
  styleUrls: ["./entries-form.component.scss"],
})
export class EntriesFormComponent implements OnInit {
  constructor(public entriesService: EntriesService) {}
  datos = [
    {
      idEntry: 4,
      type: "Notebook",
      issue:
        "Non proident irure adipisicing veniam tempor ea tempor sunt. Officia quis laboris deserunt sit incididunt fugiat dolore qui occaecat cillum. Ad ullamco esse dolor veniam dolore elit. Minim nisi quis Lorem sint sit culpa. Cupidatat sint amet elit eiusmod magna et. Reprehenderit culpa laborum labore consequat.",
    },
    { idEntry: 6, type: "Desktop", issue: "No funca" },
  ];
  dataSource: MatTableDataSource<{
    type: string;
    issue: String;
  }> = new MatTableDataSource(this.datos);
  displayedColumns: string[] = ["idEntry", "type", "issue", "action"];
  get form() {
    return this.entriesService.from.controls;
  }

  ngOnInit(): void {}

  onSubmit() {}
}
