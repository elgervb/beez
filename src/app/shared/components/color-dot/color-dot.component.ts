import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bee-color-dot',
  templateUrl: './color-dot.component.html',
  styleUrls: ['./color-dot.component.css']
})
export class ColorDotComponent implements OnInit {

  @Input() color?: string;

  @HostBinding('style.background')
  get backgroundColor(): string | undefined {
    return this.color;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
