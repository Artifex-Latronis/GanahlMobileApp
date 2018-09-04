import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Unit } from './unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  unitSelected = new Subject<Unit>();
  unitPulling = new Subject<boolean>();
  unitMoving = new Subject<boolean>();

  private selectedUnit: Unit;
  private pullingUnit = false;
  private movingUnit = false;

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

  // routines for scanning
  startScanUnit(unitID: string) {
    this.selectedUnit = this.getUnitTest();
    this.unitSelected.next({ ...this.selectedUnit });
  }

  stopScanUnit() {
    this.selectedUnit = null;
    this.unitSelected.next(null);
  }

  // routines for pulling
  startPullingUnit() {
    this.pullingUnit = true;
    this.unitPulling.next(this.pullingUnit);
  }

  completePullingUnit(orderID) {
    console.log('completed pull for order: ' + orderID);
    this.stopPullingUnit();
    this.stopScanUnit();
  }

  cancelPullingUnit() {
    this.stopPullingUnit();
  }

  stopPullingUnit() {
    this.pullingUnit = false;
    this.unitPulling.next(this.pullingUnit);
  }

  // routines for moving
  startMovingUnit() {
    this.movingUnit = true;
    this.unitMoving.next(this.movingUnit);
  }

  completeMovingUnit(binID) {
    console.log('completed move to bin: ' + binID);
    this.stopMovingUnit();
    this.stopScanUnit();
  }

  cancelMovingUnit() {
    this.stopMovingUnit();
  }

  stopMovingUnit() {
    this.movingUnit = false;
    this.unitMoving.next(this.movingUnit);
  }

  // routine for bailing out via navigation menu
  stopAllUnitActions() {
    this.stopScanUnit();
    this.cancelMovingUnit();
    this.cancelPullingUnit();
  }

  // routines for transferring
  transferUnit(location) {
    console.log('transferring Unit to ' + location);
    this.stopScanUnit();
  }

  // routines for getting unit information
  getSelectedUnit() {
    return { ...this.selectedUnit };
  }

  getUnitTest() {
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

}


