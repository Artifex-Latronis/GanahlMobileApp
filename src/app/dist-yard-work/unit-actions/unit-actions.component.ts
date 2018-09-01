import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UnitService } from '../unit.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-unit-actions',
  templateUrl: './unit-actions.component.html',
  styleUrls: ['./unit-actions.component.css']
})
export class UnitActionsComponent implements OnInit {

  @Output() pullingUnitStart = new EventEmitter<void>();
  @Output() movingUnitStart = new EventEmitter<void>();
  @Output() scanningUnitEnd = new EventEmitter<void>();

  constructor (
    private unitService: UnitService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onPullUnit() {
    this.pullingUnitStart.emit();
  }

  onMoveUnit() {
    this.movingUnitStart.emit();
  }

  onTransferUnit(location) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Transfer Unit to: ' + location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unitService.updateUnit(location);
      }
    });

  }

  onCancel() {
    this.scanningUnitEnd.emit();
  }
}
