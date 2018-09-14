import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NotifyDialogComponent } from '../../shared/notify-dialog/notify-dialog.component';
import { Observable, interval } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import { map } from 'rxjs/operators';
import { LoggingService } from '../../shared/logging.service';

@Component({
  selector: 'app-unit-pull',
  templateUrl: './unit-pull.component.html',
  styleUrls: ['./unit-pull.component.css']
})
export class UnitPullComponent implements OnInit {

  orderScanForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor (
    private unitService: UnitService,
    private dialog: MatDialog,
    private loggingService: LoggingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.store.subscribe(data => {
      return this.loggingService.showStateLoadingInConsole() ? console.log('unit-pull: ', data) : null;
    });
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.orderScanForm = new FormGroup({
      orderID: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    const orderID = this.orderScanForm.value.orderID.toUpperCase();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Pull Unit for Order#: ' + orderID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unitService.completePullingUnit(orderID);
      }
    });

  }

  onCancel() {
    this.unitService.cancelPullingUnit();
  }
}
