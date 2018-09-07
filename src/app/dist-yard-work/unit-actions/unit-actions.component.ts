import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

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
    private store: Store<{ ui: fromApp.State }>
  ) { }

  ngOnInit() {
    this.store.subscribe(data => console.log('unit-actions', data));
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
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
