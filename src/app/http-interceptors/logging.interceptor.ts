import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, concat, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../shared/logging.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor (
    private authService: AuthService,
    private loggingService: LoggingService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let status: string;

    // extend server response observable with logging
    return next.handle(request)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          response => {
            status = response instanceof HttpResponse ? 'succeeded' : '';
            if (this.loggingService.showHttpResponsesInConsole()) {
              return status ? (
                console.log(`Logging Intercepted Original Response: `, response)
              ) : '';
            }
          },
          // Operation failed; error is an HttpErrorResponse
          error => {
            status = 'failed';
            console.log(`Logging Intercepted Orginal Error: `, error);
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
                // record not found, user is notified, program waits for new input
                case 404:
                  break;
                // conflict error, user is givin the option to override or bail
                case 409:
                  break;
                /*
                * resource state has changed beyond what a user can fix,
                * user is notified and redirected
                */
                case 412:
                  break;
                // internal server error (not defined), user is notified and redirected
                case 500:
                  this.authService.logout();
                  break;
                // internal server error(can't open files), user is notified and redirected
                case 503:
                  this.authService.logout();
                  break;
                // unexpected error codes, log user out to be safe.
                default:
                  console.error(
                    `Backend returned code ${error.status}, ` +
                    `body was: ${JSON.stringify(error.error)}`
                  );
                  this.authService.logout();
                  break;
              }
            } else {

            }
          }
        ),

        // pass user-friendly error message to snackbar
        // catchError(this.httpErrorHandler),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const message = `${request.method} ${request.urlWithParams} ${status} in ${elapsed} ms.`;
          if (this.loggingService.showHttpRequestStatusInConsole()) {
            console.log(message);
          }
        })
      );

  }

  // deprecated for now, unless i can figure out how to use both?
  // private httpErrorHandler(error: HttpErrorResponse) {

  //   console.log('in the logging.interceptor httpErrorHandler branch:');
  //   console.log(error);

  //   if (error.error instanceof ErrorEvent) {
  //     // a client-side or network error occured. Handle accordingly.
  //     console.error('An error occured:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     switch (error.status) {
  //       case 401:
  //         return throwError(`Expired Token, please log in again`);
  //       case 403:
  //         return throwError(`Invalid Token, please log in again`);
  //       case 404:
  //         return throwError(`Not on File, please check your input and try again.`);
  //       case 500:
  //         return throwError(`Critical Error, please log in again`);
  //       default:
  //         return throwError(`Uncaught Error Code: ${error.status} please notify IT`);
  //     }
  //   }

  //   return throwError(`Something bad happened; please try again later.`);
  // }

}
