import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { EntriesService } from "src/app/services/entries.service";
import { EntriesDto } from "src/app/services/entriesDTO";
import { empty } from "rxjs";

@Component({
  selector: "app-entries-form",
  templateUrl: "./entries-form.component.html",
  styleUrls: ["./entries-form.component.scss"],
})
export class EntriesFormComponent implements OnInit {
  constructor(
    public entriesService: EntriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  incomingValid = false;
  datos = [
    {
      type: "Notebook",
      issue:
        "Non proident irure adipisicing veniam tempor ea tempor sunt. Officia quis laboris deserunt sit incididunt fugiat" +
        "dolore qui occaecat cillum. Ad ullamco esse dolor veniam dolore elit. Minim nisi quis Lorem sint sit culpa. Cupidatat" +
        "sint amet elit eiusmod magna et. Reprehenderit culpa laborum labore consequat.",
      priority: "baja",
    },
    { type: "Desktop", issue: "No funca", priority: "alta" },
  ];
  dataSource: MatTableDataSource<{
    type: string;
    issue: string;
    priority: string;
  }> = new MatTableDataSource(this.datos);
  displayedColumns: string[] = [
    "idEntry",
    "type",
    "issue",
    "priority",
    "action",
  ];
  get form() {
    return this.entriesService.form.controls;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.datos);
  }

  atBegining() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.entriesService.getOne(params.id).subscribe((entries) => {
          this.setEntries(entries);
        });
      } else {
        this.entriesService.form.reset();
        this.entriesService.initializeFormGroup();
      }
    });
  }
  setEntries(entries: EntriesDto) {
    throw new Error("Method not implemented.");
  }
  onSubmit(values) {
    this.router.navigate(["/entries"]);
  }
  addIncoming(values) {
    for (let [key, value] of Object.entries(values)) {
      if (value) {
        this.incomingValid = true;
      } else {
        this.incomingValid = false;
      }
    }
    if (this.incomingValid) {
      this.ngOnInit();
      this.entriesService.form.controls.incoming.reset();
      this.datos.push(values);
    }
  }
}
