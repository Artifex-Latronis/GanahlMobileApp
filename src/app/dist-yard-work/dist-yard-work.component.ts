import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnitService } from './unit.service';
import { UnitActivityService } from './unit-activity.service';

@Component({
  selector: 'app-dist-yard-work',
  templateUrl: './dist-yard-work.component.html',
  styleUrls: ['./dist-yard-work.component.css']
})
export class DistYardWorkComponent implements OnInit {

  onUnitScan = false;
  onPullingUnit = false;
  onMovingUnit = false;

  unitScanSubscription: Subscription;
  unitPullSubscription: Subscription;
  unitMoveSubscription: Subscription;

  constructor (
    private unitService: UnitService,
    private unitActivityService: UnitActivityService
  ) { }

  ngOnInit() {

    this.unitScanSubscription = this.unitService.unitSelected.subscribe(
      unit => {
        if (unit) {
          this.onUnitScan = true;
        } else {
          this.onUnitScan = false;
        }
      }
    );

    this.unitPullSubscription = this.unitService.unitPulling.subscribe(
      ex => {
        if (ex) {
          this.onPullingUnit = true;
        } else {
          this.onPullingUnit = false;
        }
      }
    );

    this.unitMoveSubscription = this.unitService.unitMoving.subscribe(
      ex => {
        if (ex) {
          this.onMovingUnit = true;
        } else {
          this.onMovingUnit = false;
        }
      }
    );

  }

}
