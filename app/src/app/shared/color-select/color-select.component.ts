import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const COLOR_SELECT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ColorSelectComponent),
  multi: true
};

@Component({
  selector: 'app-color-select',
  templateUrl: './color-select.component.html',
  styleUrls: ['./color-select.component.css'],
  providers: [COLOR_SELECT_ACCESSOR]
})
export class ColorSelectComponent implements OnInit, ControlValueAccessor {

  /**
   * Colors in hex format
   */
  @Input() colors: string[];
  @Input() color: string;

  changed: (color: string) => void;
  touched: () => void;
  disabled: boolean;

  constructor() { }

  ngOnInit(): void { }

  writeValue(color: string) {
    if (color !== this.color) {
      this.color = color;
      if (this.changed) {
        this.changed(color);
      }
    }
  }

  registerOnChange(fn: (color: string) => void) {
    this.changed = fn;
  }

  registerOnTouched(fn: () => void) {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

}
