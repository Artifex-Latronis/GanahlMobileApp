import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor (
    private httpClient: HttpClient
  ) { }

  getUnit() {
    console.log('here we gooo');

    return this.httpClient.get(
      'https://myaccount.ganahl.com/api/dev/l/request/unit/92872', {
        headers: new HttpHeaders()
        // .append('x-mvconnect', '1884')
        // .append(
        //   'Authorization',
        // tslint:disable-next-line:max-line-length
        //   'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNjaGFyZmYiLCJwYXNzd29yZCI6InRlc3QiLCJpYXQiOjE1MzU2NDIxNTQsImV4cCI6MTUzNzIwMjk5MzgzOCwiaXNzIjoiTXR1ZnM2WmV1eEVCY2M5cGZNd0xhSGpIZ0VxZGdhSVIifQ.9hktRxTVfx7+XRJDiVDYQIbs3WZb3PcKwmAd9rTnIvA'
        // )
        // .append('x-consumer-username', 'rr')
      });


  }

  pullUnit(orderID) {
    console.log('pulling unit for order: ' + orderID);
  }

  updateUnit(location) {
    console.log('updating unit to:' + location);
  }
}


