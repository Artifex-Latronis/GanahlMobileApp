import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-unit-move',
  templateUrl: './unit-move.component.html',
  styleUrls: ['./unit-move.component.css']
})
export class UnitMoveComponent implements OnInit {
  movingUnit;

  constructor () { }

  ngOnInit() {
  }

}
