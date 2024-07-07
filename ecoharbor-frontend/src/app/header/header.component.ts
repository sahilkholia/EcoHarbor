import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService){
    console.log("in header constructor");
    this.authService.isLoggedIn();
  }
logout(){
  console.log("logout attempted");
  this.authService.logout();
}
}
