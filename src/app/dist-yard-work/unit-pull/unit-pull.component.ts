import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-unit-pull',
  templateUrl: './unit-pull.component.html',
  styleUrls: ['./unit-pull.component.css']
})
export class UnitPullComponent implements OnInit {

  @Output() pullingUnitEnd = new EventEmitter<void>();

  constructor () { }

  ngOnInit() {
  }

  onCancel() {
    this.pullingUnitEnd.emit();
  }
}
