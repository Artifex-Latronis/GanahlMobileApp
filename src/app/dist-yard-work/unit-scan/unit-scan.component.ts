import { Component, OnInit } from '@angular/core';
import { Unit } from '../unit.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-unit-scan',
  templateUrl: './unit-scan.component.html',
  styleUrls: ['./unit-scan.component.css']
})
export class UnitScanComponent implements OnInit {
  unitScanForm: FormGroup;
  unit: Unit;
  isLoading$: Observable<boolean>;

  constructor (
    private unitService: UnitService,
    private store: Store<{ ui: fromApp.State }>
  ) { }

  ngOnInit() {
    this.store.subscribe(data => console.log(data));
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    this.unitScanForm = new FormGroup({
      unitID: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.unitService.startScanUnit(this.unitScanForm.value.unitID);
  }

}
