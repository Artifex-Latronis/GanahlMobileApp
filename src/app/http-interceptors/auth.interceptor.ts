import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../shared/logging.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (
    private authService: AuthService,
    private loggingService: LoggingService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loggingService.showOriginalHttpRequestsInConsole()) {
      console.log(`Auth Intercepted Original: `, request);
    }

    const copiedRequest = request.clone({
      setHeaders: {
        // 'x-mvconnect': '1884',
        'Authorization': 'Bearer ' + this.authService.getToken()
      }
    });

    if (this.loggingService.showClonedHttpRequestsInConsole()) {
      console.log(`Auth Intercepted Clone: `, copiedRequest);
    }

    return next.handle(copiedRequest);
  }
}
