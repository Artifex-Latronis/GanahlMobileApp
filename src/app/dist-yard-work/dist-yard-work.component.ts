import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnitService } from './unit.service';

@Component({
  selector: 'app-dist-yard-work',
  templateUrl: './dist-yard-work.component.html',
  styleUrls: ['./dist-yard-work.component.css']
})
export class DistYardWorkComponent implements OnInit {

  onUnitScan = false;
  onPullingUnit = false;
  onMovingUnit = false;

  unitSubscription: Subscription;

  constructor (
    private unitService: UnitService
  ) { }

  ngOnInit() {
    this.unitSubscription = this.unitService.unitSelected.subscribe(
      unit => {
        if (unit) {
          this.onUnitScan = true;
        } else {
          this.onUnitScan = false;
        }
      }
    );
  }
}
