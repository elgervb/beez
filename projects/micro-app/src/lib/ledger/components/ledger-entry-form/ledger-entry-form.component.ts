import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LedgerEntry, LedgerEntryType } from '../../models';

@Component({
  selector: 'bee-ledger-entry-form',
  templateUrl: './ledger-entry-form.component.html',
  styleUrls: [ './ledger-entry-form.component.css' ]
})
export class LedgerEntryFormComponent {

  @Output() cancelEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<LedgerEntry>();

  form = this.formBuilder.group({
    type: [ LedgerEntryType.income, Validators.required ],
    date: [ new Date() ],
    description: [ '', Validators.required ],
    amountEur: [ '', Validators.required ],
    amountCents: [ '' ],
    comment: [ '' ]
  });

  constructor(private formBuilder: FormBuilder) { }

  cancel() {
    this.cancelEvent.emit();
  }

  submit() {
    if (this.form.valid) {
      const formValue ={ ...this.form.value };
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      delete formValue.amountEur;
      delete formValue.amountCents;
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */

      const result: LedgerEntry = formValue;
      result.amount = parseFloat(`${this.form.get('amountEur')?.value}.${this.form.get('amountCents')?.value}`);

      this.submitEvent.emit(result);
    }
  }

}
