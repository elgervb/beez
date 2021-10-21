import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'bee-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: [ './button-bar.component.css' ]
})
export class ButtonBarComponent {

  @Input() justify: 'left' | 'center' | 'right';
  @Input() align: 'top' | 'center' | 'bottom';

  @HostBinding('class')
  get flexClass(): string {
    const align = `align-${this.align || 'center'}`;
    const justify = `justify-${this.justify || 'left'}`;
    return `${align} ${justify}`;
  }

}
