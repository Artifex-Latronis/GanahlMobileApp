import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UnitService } from '../unit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-unit-move',
  templateUrl: './unit-move.component.html',
  styleUrls: ['./unit-move.component.css']
})
export class UnitMoveComponent implements OnInit {

  moveUnitForm: FormGroup;

  @Output() movingUnitEnd = new EventEmitter<void>();
  @Output() scanningUnitEnd = new EventEmitter<void>();

  constructor (
    private unitService: UnitService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
