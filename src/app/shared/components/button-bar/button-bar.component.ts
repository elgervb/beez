import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent implements OnInit {

  @Input() justify: 'left' | 'center' | 'right';
  @Input() align: 'top' | 'center' | 'bottom';

  @HostBinding('class')
  get flexClass(): string {
    const align = `align-${this.align || 'center'}`;
    const justify = `justify-${this.justify || 'left'}`;
    return `${align} ${justify}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
