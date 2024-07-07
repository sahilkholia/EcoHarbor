import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private apiUrl = "http://localhost:8080/api/auth"; // Replace with your actual backend API URL
  private testApiUrl = "http://localhost:8080/api/test";
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap(Authorization => this.doLoginUser(username,Authorization))
    );
  }

  isLoggedIn(){
    console.log("checking logged in: ");
    if(localStorage.getItem(this.JWT_TOKEN)==null){
      console.log("Not logged in");
      this.router.navigate(['/login']);
    }
  }

  private doLoginUser(username: string, tokens: any){
     // Log all headers
    //  const headers = tokens.headers.keys();
    //  headers.forEach((header: any) => {
    //    console.log(`${header}: ${tokens.headers.get(header)}`);
    //  });
    this.loggedUser = username;
    this.storeJwtToken(tokens.jwt);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string){
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout(){
    // localStorage.removeItem(this.JWT_TOKEN);
    // localStorage.removeItem("username");
    // localStorage.removeItem('id');
    // localStorage.removeItem('roles');
    localStorage.clear();

    // Redirect to login page
    this.isAuthenticatedSubject.next(false);

    
    this.router.navigate(['/login']);
  }

  signup(username: string, password: string): Observable<any> {
    const signupData = { username, password };
    return this.http.post(`${this.apiUrl}/signup`, signupData);
  }
  checkAuth():Observable<any>{
    return this.http.get(`${this.testApiUrl}/user`);
  }
}
