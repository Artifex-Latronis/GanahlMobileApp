import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Unit } from './unit.model';
import * as fromRoot from '../app.reducers';
import * as UI from '../shared/ui.actions';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { UnitActivityService } from './unit-activity.service';
import { UnitActivity } from './unit-activity.model';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../shared/logging.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { NotifyDialogComponent } from '../shared/notify-dialog/notify-dialog.component';
import { MatDialog } from '@angular/material';
import { environment } from '../../environments/environment';

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

  private unit: Unit;
  // private unitActivity: UnitActivity;
  // private newUnitActivity;

  constructor (
    private uiService: UiService,
    private httpClient: HttpClient,
    private unitActivityService: UnitActivityService,
    private store: Store<fromRoot.State>,
    private authService: AuthService,
    private loggingService: LoggingService,
    private dialog: MatDialog
  ) { }

  // routines for scanning
  startScanUnit(unitID) {
    this.store.dispatch(new UI.StartLoading());
    this.getUnit(unitID)
      .subscribe(
        (data: Unit) => {
          this.unit = { ...data };
          if (this.loggingService.showHttpResponseObjectsInConsole()) {
            console.log(this.unit);
          }
          this.selectedUnit = this.unit;
          this.unitSelected.next({ ... this.selectedUnit });
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new UI.StartDisplayingUnit());
        },
        error => {
          this.uiService.showSnackbar(error.error.statusmsg, null, 3000);
          this.store.dispatch(new UI.StopLoading());
        }
      );
  }

  stopScanUnit() {
    this.selectedUnit = null;
    this.unitSelected.next(null);
    this.store.dispatch(new UI.StopDisplayingUnit());
  }

  // routines for pulling
  startPullingUnit() {
    this.pullingUnit = true;
    this.unitPulling.next(this.pullingUnit);
  }

  completePullingUnit(orderID) {
    this.store.dispatch(new UI.StartLoading());
    const newActivity: UnitActivity = {
      unitID: this.getSelectedUnit().ID,
      type: 'pull',
      userID: this.authService.getCurrentUser().userID,
      docID: orderID,
      override: 'n'
    };

    this.unitActivityService.putUnitActivity(newActivity)
      .subscribe(
        (success) => {
          console.log('in the unit.service completePullingUnit success branch');
          console.log(success);
          this.store.dispatch(new UI.StopLoading());
          this.stopAllUnitActions();
        },
        error => {
          console.log('in the unit.service completePullingUnit error branch');
          console.log(error);
          switch (error.status) {
            // docID is not found, have user check his input and resubmit
            case 404:
              this.store.dispatch(new UI.StopLoading());
              this.uiService.showSnackbar(error.error.statusmsg, null, 3000);
              break;
            /*
            * the unitID has a status that conflicts with the action taken,
            * allow user to override this status and submit a new modified
            * activity model
            */
            case 409:
              const dialogRef409 = this.dialog.open(ConfirmDialogComponent, {
                data: {
                  message: error.error.message
                }
              });
              dialogRef409.afterClosed().subscribe(result => {
                if (result) {
                  const overrideNewActivity: UnitActivity = {
                    ...newActivity,
                    override: 'y'
                  };
                  this.store.dispatch(new UI.StopLoading());
                  this.completePullingUnitWithOverride(overrideNewActivity);
                }
                this.store.dispatch(new UI.StopLoading());
              });
              break;
            /*
            * the unitID has been deleted/never created on the server,
            * the user is notified and redirected to scan a new unit
            */
            case 412:
              const dialogRef412 = this.dialog.open(NotifyDialogComponent, {
                data: {
                  message: error.error.statusmsg
                }
              });
              dialogRef412.afterClosed().subscribe(result => {
                if (result) {
                  this.stopAllUnitActions();
                }
              }
              );
              this.store.dispatch(new UI.StopLoading());
              break;
            // other status was sent, user is either globally redirected, or can stay here
            default:
              this.store.dispatch(new UI.StopLoading());
              this.uiService.showSnackbar(error.error.statusmsg, null, 3000);
              break;
          }

        }
      );

  }

  completePullingUnitWithOverride(overrideNewActivity) {
    this.store.dispatch(new UI.StartLoading());
    this.unitActivityService.putUnitActivity(overrideNewActivity)
      .subscribe(
        (success) => {
          console.log('in the unit.service completePullingUnitWithOverride success branch');
          console.log(success);
          this.store.dispatch(new UI.StopLoading());
          this.stopAllUnitActions();
        },
        error => {
          console.log('in the unit.service completePullingUnitWithOverride error branch');
          console.log(error);
          switch (error.status) {
            /*
            * docID is not found, have user check his input and resubmit,
            * this new submit request will lose the 'override = y'
            */
            case 404:
              this.store.dispatch(new UI.StopLoading());
              this.uiService.showSnackbar(error.error.statusmsg, null, 3000);
              break;
            /*
            * the unitID has been deleted/never created on the server,
            * the user is notified and redirected to scan a new unit
            */
            case 412:
              const dialogRef412 = this.dialog.open(NotifyDialogComponent, {
                data: {
                  message: error.error.message
                }
              });
              dialogRef412.afterClosed().subscribe(result => {
                if (result) {
                  this.stopAllUnitActions();
                }
              }
              );
              this.store.dispatch(new UI.StopLoading());
              break;
            // other status was sent, user is either globally redirected, or can stay here
            default:
              this.store.dispatch(new UI.StopLoading());
              this.uiService.showSnackbar(error.error.statusmsg, null, 3000);
              break;
          }
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
    this.store.dispatch(new UI.StartLoading());
    console.log('starting move to bin: ' + binID);

    const newActivity: UnitActivity = {
      unitID: this.getSelectedUnit().ID,
      type: 'move',
      userID: this.authService.getCurrentUser().userID,
      binID: binID,
      override: 'n'
    };

    this.unitActivityService.putUnitActivity(newActivity)
      .subscribe(
        data => {
          console.log('completed move unit: ', data);
          this.store.dispatch(new UI.StopLoading());
          this.stopAllUnitActions();
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
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
    this.store.dispatch(new UI.StartLoading());
    console.log('transferring Unit to: ' + location);

    const newActivity: UnitActivity = {
      unitID: this.getSelectedUnit().ID,
      type: 'xfr',
      userID: this.authService.getCurrentUser().userID,
      docID: location,
      override: 'n'
    };

    this.unitActivityService.putUnitActivity(newActivity)
      .subscribe(
        data => {
          console.log('completed xfr unit: ', data);
          this.store.dispatch(new UI.StopLoading());
          this.stopAllUnitActions();
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
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
    return this.httpClient.get<Unit>(environment.baseURL + 'unit/' + unitID + '/');
  }

}


