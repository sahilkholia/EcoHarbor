import {  HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ):  Observable<HttpEvent<any>> {
  const jwtToken = this.getJwtToken();
  if(jwtToken){
    request = request.clone({
      setHeaders:{
        Authorization: `Bearer ${jwtToken}`
      },
    });
  }
  console.log("Inside interceptor, here is the token: "+jwtToken);
  return next.handle(request);
};

private getJwtToken():string | null{
  return localStorage.getItem('JWT_TOKEN');
}
}
