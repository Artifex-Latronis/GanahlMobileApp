import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Unit } from './unit.model';
import * as fromApp from '../app.reducer';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { UnitActivityService } from './unit-activity.service';
import { UnitActivity } from './unit-activity.model';
import { AuthService } from '../auth/auth.service';

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
  // unitActivity: UnitActivity;

  constructor (
    private uiService: UiService,
    private httpClient: HttpClient,
    private unitActivityService: UnitActivityService,
    private store: Store<{ ui: fromApp.State }>,
    private authService: AuthService
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
    this.store.dispatch({ type: 'START_LOADING' });
    console.log('starting pull for order: ' + orderID);

    const newActivity: UnitActivity = {
      unitID: this.getSelectedUnit().ID,
      type: 'pull',
      empID: this.authService.getCurrentUser().userName,
      docID: orderID
    };

    this.unitActivityService.putUnitActivity(newActivity)
      .subscribe(
        data => {
          console.log('complete Pull Unit', data);
          this.store.dispatch({ type: 'STOP_LOADING' });
          this.stopAllUnitActions();
        },
        error => {
          this.store.dispatch({ type: 'STOP_LOADING' });
          this.uiService.showSnackbar(error, null, 3000);
        }
      );

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
    this.store.dispatch({ type: 'START_LOADING' });
    console.log('starting move to bin: ' + binID);

    const newActivity: UnitActivity = {
      unitID: this.getSelectedUnit().ID,
      type: 'move',
      empID: this.authService.getCurrentUser().userName,
      binID: binID
    };

    this.unitActivityService.putUnitActivity(newActivity)
      .subscribe(
        data => {
          console.log('Completed Move Unit ', data);
          this.store.dispatch({ type: 'STOP_LOADING' });
          this.stopAllUnitActions();
        },
        error => {
          this.store.dispatch({ type: 'STOP_LOADING' });
          this.uiService.showSnackbar(error, null, 3000);
        }
      );

  }

  cancelMovingUnit() {
    this.stopMovingUnit();
  }

  stopMovingUnit() {
    this.movingUnit = false;
    this.unitMoving.next(this.movingUnit);
  }

  // routines for transferring
  transferUnit(location) {
    this.store.dispatch({ type: 'START_LOADING' });
    console.log('transferring Unit to ' + location);

    const newActivity: UnitActivity = {
      unitID: this.getSelectedUnit().ID,
      type: 'xfr',
      empID: this.authService.getCurrentUser().userName,
      docID: location
    };

    this.unitActivityService.putUnitActivity(newActivity)
      .subscribe(
        data => {
          console.log('complete Xfr Unit ', data);
          this.store.dispatch({ type: 'STOP_LOADING' });
          this.stopAllUnitActions();
        },
        error => {
          this.store.dispatch({ type: 'STOP_LOADING' });
          this.uiService.showSnackbar(error, null, 3000);
        }
      );

  }

  // routine for bailing out via navigation menu
  stopAllUnitActions() {
    this.stopScanUnit();
    this.cancelMovingUnit();
    this.cancelPullingUnit();
  }

  // routines for getting unit information
  getSelectedUnit() {
    return { ...this.selectedUnit };
  }

  getUnit(unitID) {
    return this.httpClient.get<Unit>('https://myaccount.ganahl.com/api/dev/request/unit/' + unitID);
  }

}


