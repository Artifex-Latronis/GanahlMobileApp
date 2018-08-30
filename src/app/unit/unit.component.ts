import { Component, OnInit } from '@angular/core';
import { UnitService } from './unit.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { Unit } from './unit.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  unit: Unit = new Unit('BB999', 'A01', '112204.08', 500, 8, 'Length', '2 x 4', 'STD & BTR DF S4S');

  constructor (
    private unitService: UnitService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onPullUnit() {

  }

  onMoveUnit() {

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

  }
}
