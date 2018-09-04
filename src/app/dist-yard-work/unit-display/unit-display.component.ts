import { Component, OnInit } from '@angular/core';
import { Unit } from '../unit.model';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-display',
  templateUrl: './unit-display.component.html',
  styleUrls: ['./unit-display.component.css']
})
export class UnitDisplayComponent implements OnInit {

  unit: Unit;

  constructor (
    private unitService: UnitService
  ) { }

  ngOnInit() {
    this.unit = this.unitService.unit;


  }

}
