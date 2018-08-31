import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dist-yard-work',
  templateUrl: './dist-yard-work.component.html',
  styleUrls: ['./dist-yard-work.component.css']
})
export class DistYardWorkComponent implements OnInit {

  // onScanningUnit = false;
  onPullingUnit = false;
  onMovingUnit = false;

  constructor () { }

  ngOnInit() {
  }

}
