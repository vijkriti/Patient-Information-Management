import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  extensionNumber: string; 
  mobileNumber: string;
  email: string;
  dateOfBirth: Date;
  maritalStatus: string;
  gender: string;
  npiNumber: string;
  streetAddress: string;
  floor: string;
  department: string;
  room: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  profileImagePath?: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl = 'https://localhost:7037/api/User';

  constructor(private http: HttpClient) { }

  createUser(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
  
  
}
