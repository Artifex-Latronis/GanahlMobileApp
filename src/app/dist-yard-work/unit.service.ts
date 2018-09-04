import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Unit } from './unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  unitSelected = new Subject<Unit>();

  private selectedUnit: Unit;

  unit: Unit = {
    ID: 'A7995',
    binID: 'A01',
    productID: '112204.08',
    quantity: 180,
    length: 8,
    lengthType: 'Length',
    size: '2 x 4',
    description: 'STD & BTR DF S4S'
  };

  constructor (
    private httpClient: HttpClient
  ) { }

  startScanUnit(unitID: string) {
    this.selectedUnit = this.getUnitTest(unitID);
    this.unitSelected.next({ ...this.selectedUnit });
  }

  getUnitTest(unitID) {
    return this.unit;
  }

  getUnit(unitID) {
    console.log('here we gooo');

    return this.httpClient.get(
      // 'https://myaccount.ganahl.com/api/dev/l/request/unit/92872'
      'https://myaccount.ganahl.com/api/dev/l/request/unit/' + unitID, {
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

  moveUnit(binID) {
    console.log('moving unit to: ' + binID);
  }

  updateUnit(location) {
    console.log('updating unit to:' + location);
  }
}


