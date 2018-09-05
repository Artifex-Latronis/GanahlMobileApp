import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subject, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  // unit: Unit = {
  //   ID: 'A7995',
  //   binID: 'A01',
  //   productID: '112204.08',
  //   quantity: 180,
  //   length: 8,
  //   lengthType: 'Length',
  //   size: '2 x 4',
  //   description: 'STD & BTR DF S4S'
  // };

  unit: Unit;
  error;
  headers;

  constructor (
    private httpClient: HttpClient
  ) { }

  // routines for scanning
  startScanUnit(unitID) {
    // this.selectedUnit = this.getUnit(unitID);
    // this.unitSelected.next({ ...this.selectedUnit });

    // just logging the response
    // this.getUnit(unitID).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );

    // attempting full object
    this.getUnitResponse(unitID)
      // resp is of type 'HttpResponse<Config>'
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`
        );
        console.log(this.headers);

        // access the body directly, which is typed as `Unit`.
        this.unit = { ...resp.body };
        console.log(this.unit);
        this.selectedUnit = this.unit;
        this.unitSelected.next({ ...this.selectedUnit });
      });

    // attempting to extract the data
    // this.getUnit(unitID)
    //   .subscribe(
    //     (data: Unit) => {
    //       this.unit = { ...data };
    //       this.selectedUnit = this.unit;
    //       this.unitSelected.next({ ...this.selectedUnit });
    //     }
    //   );

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

  // getUnit(unitID) {
  //   console.log('here we go: ' + unitID);

  //   return this.httpClient.get<Unit>('https://myaccount.ganahl.com/api/dev/l/request/unit/' + unitID)
  //     .pipe(
  //       catchError(this.httpErrorHandler)
  //     );
  // }

  getUnitResponse(unitID): Observable<HttpResponse<Unit>> {
    return this.httpClient.get<Unit>(
      'https://myaccount.ganahl.com/api/dev/l/request/unit/' + unitID, {
        observe: 'response'
      }
    )
      .pipe(
        catchError(this.httpErrorHandler)
      );
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    console.log('reached error handler');
    if (error.error instanceof ErrorEvent) {
      // a client-side or network error occured. Handle accordingly.
      console.error('An error occured:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

}


