import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    // You can perform any actions or initialization here when the component is initialized
    console.log('LoginComponent initialized');
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful');
        console.log(response);
        localStorage.setItem('username', response.username);
        localStorage.setItem('id', response.id);
        localStorage.setItem('roles', response.roles);
        console.log("localstorage name: "+ localStorage.getItem('username'));
        // localStorage.setItem("access-token", )
        this.router.navigate(['/dashboard']); // Navigate to the dashboard or another page
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        // Display an error message or perform other actions as needed
      }
    );
  }

}
