import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService, User } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, AfterViewInit {
  userForm!: FormGroup;
  selectedFile: File | null = null;

  @ViewChild('streetAddress') streetAddressElementRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      extensionNumber: [''],
      mobileNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [''],
      maritalStatus: [''],
      gender: [''],
      npiNumber: [''],
      streetAddress: [''],
      floor: [''],
      department: [''],
      room: [''],
      zipCode: [''],
      city: [''],
      state: [''],
      country: [''],
      profileImagePath: ['']
    });

    this.loadGoogleMapsScript().then(() => {
      this.initAutocomplete();
    });
  }

  ngAfterViewInit(): void {
    this.initAutocomplete();
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error: any) => reject(error);
        document.head.appendChild(script);
      }
    });
  }

  initAutocomplete() {
    if (this.streetAddressElementRef && this.streetAddressElementRef.nativeElement) {
      const autocomplete = new google.maps.places.Autocomplete(
        this.streetAddressElementRef.nativeElement,
        { types: ['address'] }
      );

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry) {
            this.userForm.patchValue({
              streetAddress: place.formatted_address,
              city: this.getAddressComponent(place, 'locality'),
              state: this.getAddressComponent(place, 'administrative_area_level_1'),
              country: this.getAddressComponent(place, 'country'),
              zipCode: this.getAddressComponent(place, 'postal_code')
            });
          }
        });
      });
    }
  }

  getAddressComponent(place: google.maps.places.PlaceResult, type: string): string {
    const component = place.address_components?.find((component: any) =>
      component.types.includes(type)
    );
    return component ? component.long_name : '';
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.userForm.valid && this.selectedFile) {
      const userData: User = this.userForm.value;
      const formData: FormData = new FormData();

      formData.append('user', JSON.stringify(userData));
      formData.append('image', this.selectedFile);

      this.userService.createUser(formData).subscribe({
        next: response => {
          console.log('Data posted successfully', response);
          this.userForm.reset();
          this.router.navigate(['/calendar']);
        },
        error: error => {
          console.error('Error posting data', error);
        }
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
