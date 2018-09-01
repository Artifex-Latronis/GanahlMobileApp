import { Component, OnInit } from '@angular/core';
import { Unit } from '../unit.model';

@Component({
  selector: 'app-unit-display',
  templateUrl: './unit-display.component.html',
  styleUrls: ['./unit-display.component.css']
})
export class UnitDisplayComponent implements OnInit {
  unit: Unit = new Unit('BB999', 'A01', '112204.08', 500, 8, 'Length', '2 x 4', 'STD & BTR DF S4S');

  constructor () { }

  ngOnInit() {
  }

}
