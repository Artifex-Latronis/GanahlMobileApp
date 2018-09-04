import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-pull',
  templateUrl: './unit-pull.component.html',
  styleUrls: ['./unit-pull.component.css']
})
export class UnitPullComponent implements OnInit {

  orderScanForm: FormGroup;

  constructor (
    private unitService: UnitService
  ) { }

  ngOnInit() {
    this.orderScanForm = new FormGroup({
      orderID: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.unitService.completePullingUnit(this.orderScanForm.value.orderID);
  }

  onCancel() {
    this.unitService.cancelPullingUnit();
  }
}
