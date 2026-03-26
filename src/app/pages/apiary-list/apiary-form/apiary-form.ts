import { Component, effect, input, output, signal } from '@angular/core';
import { Apiary } from '../../../data/models';

@Component({
  selector: 'bee-apiary-form',
  templateUrl: './apiary-form.html',
  styleUrl: './apiary-form.css'
})
export class ApiaryFormComponent {
  readonly initial = input<Apiary | null>(null);

  readonly save = output<{ name: string; location: string; notes: string }>();
  readonly dismissed = output<void>();

  readonly form = signal({ name: '', location: '', notes: '' });
  readonly submitted = signal(false);
  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.form.set({ name: init.name, location: init.location ?? '', notes: init.notes ?? '' });
      } else {
        this.form.set({ name: '', location: '', notes: '' });
      }
      this.submitted.set(false);
    });
  }

  submit(): void {
    const form = this.form();
    if (!form.name.trim() || !form.location.trim()) {
      this.submitted.set(true);
      return;
    }

    this.save.emit(form);
    this.form.set({ name: '', location: '', notes: '' });
    this.submitted.set(false);
  }
}
