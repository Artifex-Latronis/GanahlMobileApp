import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subject, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Unit } from './unit.model';
import { UiService } from '../shared/ui.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


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
    private uiService: UiService,
    private router: Router,
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  // routines for scanning
  startScanUnit(unitID) {
    // this.getUnitResponse(unitID);
    // resp is of type 'HttpResponse<Unit>'
    // .subscribe(
    //   response => {
    //     // the response
    //     console.log(response);

    //     // display its headers
    //     const keys = response.headers.keys();
    //     this.headers = keys.map(key =>
    //       `${key}: ${response.headers.get(key)}`
    //     );
    //     console.log(this.headers);

    //     // access the body directly, which is typed as `Unit`.
    //     this.unit = { ...response.body };
    //     console.log('this is the first: ', this.unit);
    //     this.selectedUnit = this.unit;
    //     this.unitSelected.next({ ...this.selectedUnit });
    //   },
    //   error => {
    //     this.uiService.showSnackbar(error, null, 5000);
    //   }
    // );

    this.getUnit(unitID)
      .subscribe(
        (data: Unit) => {
          this.unit = { ...data };
          console.log(this.unit);
        },
        error => {
          this.uiService.showSnackbar(error, null, 5000);
        }
      );
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

  getUnit(unitID) {

    const token = this.authService.getToken();
    const url = 'https://myaccount.ganahl.com/api/dev/request/unit/';
    const headers = {
      headers: new HttpHeaders({
        // 'x-mvconnect': '1884',
        // tslint:disable-next-line:max-line-length
        // 'Authorization': 'Bearer ' + token
      })
    };

    return this.httpClient.get<Unit>(url + unitID)
      .pipe(
        catchError(this.httpErrorHandler)
      );
  }

  // getUnitResponse(unitID): Observable<HttpResponse<Unit>> {
  //   return this.httpClient.get<Unit>(
  //     'https://myaccount.ganahl.com/api/dev/l/request/unit/' + unitID, {
  //       observe: 'response'
  //     }
  //   )
  //     .pipe(
  //       catchError(this.httpErrorHandler)
  //     );
  // }

  private httpErrorHandler(error: HttpErrorResponse) {

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

      switch (error.status) {
        case 401:
          return throwError(`Expired Token, please log in again`);
        case 403:
          return throwError(`Invalid Token, please log in again`);
        case 404:
          return throwError(`Not on File, please check your input and try again.`);
        default:
          return throwError(`Uncaught Error Code: ${error.status}`);
      }

    }

    return throwError(
      'Something bad happened; please try again later.'
    );
  }

}


