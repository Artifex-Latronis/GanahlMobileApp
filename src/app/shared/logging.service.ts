import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor () { }

  showStateLoadingInConsole() {
    // return true;
  }

  showOriginalHttpRequestsInConsole() {
    // return true;
  }

  showClonedHttpRequestsInConsole() {
    return true;
  }

  showHttpRequestStatusInConsole() {
    return true;
  }

  showHttpResponsesInConsole() {
    return true;
  }

  showHttpResponseObjectsInConsole() {
    // return true;
  }
}
