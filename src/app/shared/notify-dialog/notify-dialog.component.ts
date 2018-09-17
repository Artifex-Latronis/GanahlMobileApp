import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.css']
})
export class NotifyDialogComponent implements OnInit {

  constructor (@Inject(MAT_DIALOG_DATA) public passedData: any, private dialogRef: MatDialogRef<NotifyDialogComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

}
