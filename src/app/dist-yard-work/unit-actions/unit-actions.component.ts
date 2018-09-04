import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-unit-actions',
  templateUrl: './unit-actions.component.html',
  styleUrls: ['./unit-actions.component.css']
})

export class UnitActionsComponent implements OnInit {

  constructor (
    private unitService: UnitService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
