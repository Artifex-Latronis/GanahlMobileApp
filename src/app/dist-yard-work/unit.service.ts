import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Unit } from './unit.model';
import * as fromApp from '../app.reducer';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';

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

  unit: Unit;

  constructor (
    private uiService: UiService,
    private httpClient: HttpClient,
    private store: Store<{ ui: fromApp.State }>
  ) { }

  // routines for scanning
  startScanUnit(unitID) {
    this.store.dispatch({ type: 'START_LOADING' });
    this.getUnit(unitID)
      .subscribe(
        (data: Unit) => {
          this.unit = { ...data };
          console.log(this.unit);
          this.selectedUnit = this.unit;
          this.unitSelected.next({ ... this.selectedUnit });
          this.store.dispatch({ type: 'STOP_LOADING' });
        },
        error => {
          this.uiService.showSnackbar(error, null, 3000);
          this.store.dispatch({ type: 'STOP_LOADING' });
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
    return this.httpClient.get<Unit>('https://myaccount.ganahl.com/api/dev/request/unit/' + unitID);
  }

}


