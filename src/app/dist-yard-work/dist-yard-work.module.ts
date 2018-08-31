import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { UnitScanComponent } from './unit-scan/unit-scan.component';
import { UnitPullComponent } from './unit-pull/unit-pull.component';
import { UnitMoveComponent } from './unit-move/unit-move.component';
import { DistYardWorkComponent } from './dist-yard-work.component';
import { UnitActionsComponent } from './unit-actions/unit-actions.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DistYardWorkComponent,
    UnitScanComponent,
    UnitPullComponent,
    UnitMoveComponent,
    UnitActionsComponent
  ]

})
export class DistYardWorkModule { }
