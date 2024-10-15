import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Availability {
  availabilityType: string;
  startTime: Date;
  endTime: Date;
  recurrencePattern: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private apiUrl = 'https://localhost:7037/api/Availability'; 

  constructor(private http: HttpClient) { }

  
  getAvailabilities(): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.apiUrl);
  }

  createAvailability(availability: Availability): Observable<any> {
    return this.http.post<any>(this.apiUrl, availability);
  }
}
