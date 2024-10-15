import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AvailabilityComponent } from '../availability/availability.component';
import { Availability, AvailabilityService } from '../../services/availability.service';

interface CalendarDay {
  date: number | null;
  fullDate: Date | null;
  availabilityCount: number | null;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weeks: CalendarDay[][] = [];
  selectedDate: Date = new Date();
  availabilities: Availability[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(public dialog: MatDialog, private availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this.fetchAvailabilities();
  }

  fetchAvailabilities() {
    this.availabilityService.getAvailabilities().subscribe(availabilities => {
      this.availabilities = availabilities;
      this.generateCalendar(this.selectedDate);
    });
  }

  generateCalendar(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let day = new Date(start);
    const weeks: CalendarDay[][] = [];
    let week: CalendarDay[] = [];

    // Fill in leading empty days for the first week
    for (let i = 0; i < start.getDay(); i++) {
      week.push({ date: null, fullDate: null, availabilityCount: null });
    }

    while (day <= end) {
      const dateString = day.toISOString().split('T')[0];
      const availabilityCount = this.availabilities.filter(a => new Date(a.date).toISOString().split('T')[0] === dateString).length;
      week.push({ date: day.getDate(), fullDate: new Date(day), availabilityCount });

      if (day.getDay() === 6) {
        weeks.push(week);
        week = [];
      }
      day.setDate(day.getDate() + 1);
    }

    // Fill in trailing empty days for the last week
    while (week.length < 7) {
      week.push({ date: null, fullDate: null, availabilityCount: null });
    }
    weeks.push(week);

    this.weeks = weeks;
  }

  openAvailability(day: CalendarDay): void {
    if (day.fullDate) {
      this.selectedDate = day.fullDate;
      const dialogRef = this.dialog.open(AvailabilityComponent, {
        width: '400px',
        data: { day }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fetchAvailabilities(); // Refresh availabilities after closing the dialog
        }
      });
    }
  }

  prevMonth() {
    this.selectedDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() - 1));
    this.generateCalendar(this.selectedDate);
  }

  nextMonth() {
    this.selectedDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() + 1));
    this.generateCalendar(this.selectedDate);
  }

  prevYear() {
    this.selectedDate = new Date(this.selectedDate.setFullYear(this.selectedDate.getFullYear() - 1));
    this.generateCalendar(this.selectedDate);
  }

  nextYear() {
    this.selectedDate = new Date(this.selectedDate.setFullYear(this.selectedDate.getFullYear() + 1));
    this.generateCalendar(this.selectedDate);
  }
}
