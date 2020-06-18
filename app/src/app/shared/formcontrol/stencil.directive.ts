import { Directive, forwardRef, ElementRef, Provider, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const STENCIL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StencilDirective),
  multi: true
};

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[evbStencil]',
  providers: [STENCIL_VALUE_ACCESSOR]
})
export class StencilDirective implements ControlValueAccessor, OnDestroy {

  value: any;

  private changeListener = (event: CustomEvent) => this.propagateChange(event.detail);
  private blurListener = () => this.propagateTouch();

  constructor(private stencilElement: ElementRef<HTMLEvbRangeElement>) {
    const { nativeElement } = this.stencilElement;
    if (!nativeElement.tagName.toLowerCase().startsWith('evb')) {
      console.log('ControlValueAccessor falsely used on', nativeElement);
      throw new Error('StencilDirective only applicable on @elgervb/stencil-components');
    }

    nativeElement.addEventListener('evbChange', this.changeListener);
    nativeElement.addEventListener('evbInput', this.changeListener);
    nativeElement.addEventListener('evbBlur', this.blurListener);
  }

  ngOnDestroy() {
    const { nativeElement } = this.stencilElement;

    nativeElement.removeEventListener('evbChange', this.changeListener);
    nativeElement.removeEventListener('evbInput', this.changeListener);
    nativeElement.removeEventListener('evbBlur', this.blurListener);
  }

  propagateChange: (value: any) => void = () => { };

  propagateTouch: () => void = () => { };

  writeValue(obj: any): void {
    this.stencilElement.nativeElement.value = obj;
    this.value = obj;
  }
  registerOnChange(fn: (value: any) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

    this.stencilElement.nativeElement.disabled = isDisabled;
  }

}
