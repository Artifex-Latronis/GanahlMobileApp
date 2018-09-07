import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UnitService } from '../unit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { LoggingService } from '../../shared/logging.service';

@Component({
  selector: 'app-unit-move',
  templateUrl: './unit-move.component.html',
  styleUrls: ['./unit-move.component.css']
})
export class UnitMoveComponent implements OnInit {

  moveUnitForm: FormGroup;
  isLoading$: Observable<boolean>;

  @Output() movingUnitEnd = new EventEmitter<void>();
  @Output() scanningUnitEnd = new EventEmitter<void>();

  constructor (
    private unitService: UnitService,
    private dialog: MatDialog,
    private loggingService: LoggingService,
    private store: Store<{ ui: fromApp.State }>
  ) { }

  ngOnInit() {
    this.store.subscribe(data => {
      return this.loggingService.showStateLoadingInConsole() ? console.log('unit-move: ', data) : null;
    });
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
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

}
