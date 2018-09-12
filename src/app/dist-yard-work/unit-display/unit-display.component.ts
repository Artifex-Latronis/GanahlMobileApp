import { Component, OnInit } from '@angular/core';
import { Unit } from '../unit.model';
import { UnitService } from '../unit.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unit-display',
  templateUrl: './unit-display.component.html',
  styleUrls: ['./unit-display.component.css']
})
export class UnitDisplayComponent implements OnInit {

  unit: Unit;
  isDisplayingUnit$: Observable<boolean>;

  constructor (
    private unitService: UnitService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isDisplayingUnit$ = this.store.select(fromRoot.getIsDisplayingUnit);
    this.unit = this.unitService.getSelectedUnit();
  }

}
