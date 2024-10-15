import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Availability, AvailabilityService } from '../../services/availability.service';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {
  formData: Availability = {
    availabilityType: '',
    startTime: new Date(),
    endTime: new Date(),
    recurrencePattern: '',
    date: this.data.day.fullDate
  };

  availabilityTypes = ['Routine', 'Urgent', 'Follow Up'];
  recurrencePatterns = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  constructor(
    public dialogRef: MatDialogRef<AvailabilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private availabilityService: AvailabilityService
  ) {}
  

  
  onSubmit(): void {
    this.availabilityService.createAvailability(this.formData).subscribe({
      next: response => {
        this.dialogRef.close(response);
      },
      error: error => {
        console.error('Error creating availability', error);
      }
  });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}