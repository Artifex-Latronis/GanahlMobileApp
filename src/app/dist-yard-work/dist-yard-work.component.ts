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

  unitScanSubscription: Subscription;
  unitPullSubscription: Subscription;
  unitMoveSubscription: Subscription;

  constructor (
    private unitService: UnitService
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
      started => {
        if (started) {
          this.onPullingUnit = true;
        } else {
          this.onPullingUnit = false;
        }
      }
    );

    this.unitMoveSubscription = this.unitService.unitMoving.subscribe(
      started => {
        if (started) {
          this.onMovingUnit = true;
        } else {
          this.onMovingUnit = false;
        }
      }
    );

  }

}
