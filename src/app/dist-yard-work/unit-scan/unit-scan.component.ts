import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Unit } from '../unit.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-scan',
  templateUrl: './unit-scan.component.html',
  styleUrls: ['./unit-scan.component.css']
})
export class UnitScanComponent implements OnInit {
  unitScanForm: FormGroup;

  @Output() scanningUnitStart = new EventEmitter<void>();
  // onScanningUnit = false;

  constructor (
    private unitService: UnitService
  ) { }

  ngOnInit() {
    this.unitScanForm = new FormGroup({
      unitID: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.unitService.getUnit()
      .subscribe(
        (response) => {
          console.log(response);

        },
        (error) => console.log(error)
      );
    // this.onScanningUnit = true;
    this.scanningUnitStart.emit();
  }


}
