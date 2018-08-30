import { Component, OnInit } from '@angular/core';
import { UnitService } from './unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  constructor (private unitService: UnitService) { }

  ngOnInit() {
  }

  onPullUnit() {

  }

  onMoveUnit() {

  }

  onTransferUnit(location) {

  }

  onCancel() {

  }
}
