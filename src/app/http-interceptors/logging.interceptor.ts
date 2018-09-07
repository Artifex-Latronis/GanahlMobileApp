import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor (private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let status: string;

    // extend server response observable with logging
    return next.handle(request)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => {
            status = event instanceof HttpResponse ? 'succeeded' : '';
            console.log('tap event: ', event);
          },
          // Operation failed; error is an HttpErrorResponse
          error => {
            status = 'failed';
            console.log('tap error', error);
            if (!(error.error instanceof ErrorEvent)) {
              switch (error.status) {
                // fatal error, require user to re-authenticate
                case 401:
                  this.authService.logout();
                  break;
                // fatal error, require user to re-authenticate
                case 403:
                  this.authService.logout();
                  break;
                // Record not found, user is notified, program waits for new input
                case 404:
                  break;
                default:
                  // unexpected error codes, log user out to be safe.
                  console.error(
                    `Backend returned code ${error.status}, ` +
                    `body was: ${JSON.stringify(error.error)}`
                  );
                  this.authService.logout();
                  break;
              }
            }
          }
        ),
        // pass user-friendly error message to snackbar
        catchError(this.httpErrorHandler),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const message = `${request.method} ${request.urlWithParams} ${status} in ${elapsed} ms.`;
          console.log(message);
        })
      );
  }

  private httpErrorHandler(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // a client-side or network error occured. Handle accordingly.
      console.error('An error occured:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.


      switch (error.status) {
        case 401:
          return throwError(`Expired Token, please log in again`);
        case 403:
          return throwError(`Invalid Token, please log in again`);
        case 404:

          return throwError(`Not on File, please check your input and try again.`);
        default:
          return throwError(`Uncaught Error Code: ${error.status} please notify IT`);
      }
    }

    return throwError(`Something bad happened; please try again later.`);
  }

}
