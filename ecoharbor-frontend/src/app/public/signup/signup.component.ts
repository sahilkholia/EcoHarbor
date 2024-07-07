import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    // You can perform any actions or initialization here when the component is initialized
    console.log('Signup Component initialized');
  }

  onSubmit() {
    this.authService.signup(this.username, this.password).subscribe(
      (response) => {
        // Handle successful signup
        console.log('Signup successful');
      },
      (error) => {
        // Handle signup error
        console.error('Signup failed', error);
        // Display an error message or perform other actions as needed
      }
    );
  }
}
