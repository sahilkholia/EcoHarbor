import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import moment from 'moment';
import { HeaderComponent } from '../header/header.component';
import { PendingComponent } from './pending/pending.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    PendingComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  ngOnInit() {
    // You can perform any actions or initialization here when the component is initialized
    console.log('AuthCheck initialized');
    console.log(moment().format());
  }
  constructor(private authService: AuthService, private router: Router) {}
  checkAuth(){
    console.log("entered auth check");
    this.authService.checkAuth().subscribe(
      (response) => {
        // Handle successful auth check
        console.log('auth check successful');
      },
      (error) => {
        // Handle auth check error
        console.error('auth check failed', error);
        // Display an error message or perform other actions as needed
      }
    );
  }
}
