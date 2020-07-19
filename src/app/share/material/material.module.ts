import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatSliderModule } from "@angular/material/slider";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
