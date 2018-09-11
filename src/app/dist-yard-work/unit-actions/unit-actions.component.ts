import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducers';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { LoggingService } from '../../shared/logging.service';

@Component({
  selector: 'app-unit-actions',
  templateUrl: './unit-actions.component.html',
  styleUrls: ['./unit-actions.component.css']
})

export class UnitActionsComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor (
    private unitService: UnitService,
    private dialog: MatDialog,
    private loggingService: LoggingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.store.subscribe(data => {
      return this.loggingService.showStateLoadingInConsole() ? console.log('unit-actions: ', data) : null;
    });
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onPullUnit() {
    this.unitService.startPullingUnit();
  }

  onMoveUnit() {
    this.unitService.startMovingUnit();
  }

  onTransferUnit(location) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Transfer Unit to: ' + location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unitService.transferUnit(location);
      }
    });

  }

  onCancel() {
    this.unitService.stopScanUnit();
  }

}
