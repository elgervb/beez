import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'bee-color-dot',
  templateUrl: './color-dot.component.html',
  styleUrls: [ './color-dot.component.css' ]
})
export class ColorDotComponent {

  @Input() color?: string;

  @HostBinding('style.background')
  get backgroundColor(): string | undefined {
    return this.color;
  }

}
