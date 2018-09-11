import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { UnitService } from '../unit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Observable, Subscription, interval } from 'rxjs';
import * as fromRoot from '../../app.reducers';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { LoggingService } from '../../shared/logging.service';

@Component({
  selector: 'app-unit-move',
  templateUrl: './unit-move.component.html',
  styleUrls: ['./unit-move.component.css']
})
export class UnitMoveComponent implements OnInit, OnDestroy {

  moveUnitForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loggingSubscription: Subscription;
  private secondLoggingSubscription: Subscription;

  @Output() movingUnitEnd = new EventEmitter<void>();
  @Output() scanningUnitEnd = new EventEmitter<void>();

  constructor (
    private unitService: UnitService,
    private dialog: MatDialog,
    private loggingService: LoggingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    // some testing for subscriptions below...
    // this.loggingSubscription = this.store.subscribe(data => {
    //   const myNumbers = interval(1000);
    //   this.secondLoggingSubscription = myNumbers.subscribe(
    //     (number: number) => {
    //       console.log(number);
    //     }
    //   );
    //   return this.loggingService.showStateLoadingInConsole() ? console.log('unit-move: ', data) : null;
    // });

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.moveUnitForm = new FormGroup({
      binID: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    const binID = this.moveUnitForm.value.binID.toUpperCase();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Move Unit to Area: ' + binID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unitService.completeMovingUnit(binID);
      }
    });

  }

  onCancel() {
    this.unitService.cancelMovingUnit();
  }

  ngOnDestroy() {
    // this.loggingSubscription.unsubscribe();
    // this.secondLoggingSubscription.unsubscribe();
  }
}
