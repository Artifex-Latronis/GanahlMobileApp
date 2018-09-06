import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Auth Intercepted Original`, request);

    const copiedRequest = request.clone({
      headers: request.headers
        .append('x-mvconnect', '1884')
        .append('Authorization', 'Bearer ' + this.authService.getToken())
    });

    console.log(`Auth Intercepted Clone`, copiedRequest);

    return next.handle(copiedRequest);
  }
}
