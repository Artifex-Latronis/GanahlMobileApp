import { Component, OnInit } from '@angular/core';
import { Unit } from '../unit.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import { LoggingService } from '../../shared/logging.service';

@Component({
  selector: 'app-unit-scan',
  templateUrl: './unit-scan.component.html',
  styleUrls: ['./unit-scan.component.css']
})
export class UnitScanComponent implements OnInit {
  unitScanForm: FormGroup;
  unit: Unit;
  isLoading$: Observable<boolean>;
  isDisplayingUnit$: Observable<boolean>;

  constructor (
    private unitService: UnitService,
    private loggingService: LoggingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.store.subscribe(data => {
      return this.loggingService.showStateLoadingInConsole() ? console.log('unit-scan: ', data) : null;
    });
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.isDisplayingUnit$ = this.store.select(fromRoot.getIsDisplayingUnit);
    // console.log(this.isDisplayingUnit$);
    this.unitScanForm = new FormGroup({
      unitID: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.unitService.startScanUnit(this.unitScanForm.value.unitID);
  }

}
