import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatButton } from "@angular/material/button";
import { MatSliderModule } from "@angular/material/slider";
import { MatCardModule, MatCardTitle } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
    MatIconModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MaterialModule {}
