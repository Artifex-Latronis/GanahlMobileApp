import { Component, OnInit } from '@angular/core';
import { UnitService } from './unit.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

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

  onTransferUnit() {
    const location = 'WYARD';
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        location: location
      }
    });
  }

  onCancel() {

  }
}
