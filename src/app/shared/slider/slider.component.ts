import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() label:string;
  @Input() min:number;
  @Input() max:number;
  @Input() value:number;
  @Output() changed:EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit() {
    
  }
  onSliderChange( e ):void {
    this.changed.emit( this.value );
  }

}
