import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UnitService } from '../unit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-move',
  templateUrl: './unit-move.component.html',
  styleUrls: ['./unit-move.component.css']
})
export class UnitMoveComponent implements OnInit {

  moveUnitForm: FormGroup;

  @Output() movingUnitEnd = new EventEmitter<void>();
  @Output() scanningUnitEnd = new EventEmitter<void>();

  constructor (
    private unitService: UnitService
  ) { }

  ngOnInit() {
    this.moveUnitForm = new FormGroup({
      binID: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.unitService.moveUnit(this.moveUnitForm.value.binID);
    this.movingUnitEnd.emit();
    this.scanningUnitEnd.emit();
  }

  onCancel() {
    this.movingUnitEnd.emit();
  }
}
