import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, interval } from 'rxjs';
import { UnitService } from './unit.service';

@Component({
  selector: 'app-dist-yard-work',
  templateUrl: './dist-yard-work.component.html',
  styleUrls: ['./dist-yard-work.component.css']
})
export class DistYardWorkComponent implements OnInit, OnDestroy {

  onUnitScan = false;
  onPullingUnit = false;
  onMovingUnit = false;

  unitScanSubscription: Subscription;
  unitPullSubscription: Subscription;
  unitMoveSubscription: Subscription;
  testSubscription: Subscription;

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

  ngOnDestroy() {
    this.unitScanSubscription.unsubscribe();
    this.unitPullSubscription.unsubscribe();
    this.unitMoveSubscription.unsubscribe();
  }
}
