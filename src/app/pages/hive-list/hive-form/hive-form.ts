import { Component, effect, input, output, signal } from '@angular/core';
import { Hive } from '../../../data/models';

@Component({
  selector: 'bee-hive-form',
  templateUrl: './hive-form.html',
  styleUrl: './hive-form.css'
})
export class HiveFormComponent {
  readonly initial = input<Hive | null>(null);

  readonly save = output<Pick<Hive, 'code' | 'queenYear' | 'temperament' | 'status' | 'notes'>>();
  readonly dismissed = output<void>();

  readonly form = signal({
    code: '',
    queenYear: new Date().getFullYear(),
    temperament: 'calm' as Hive['temperament'],
    status: 'active' as Hive['status'],
    notes: ''
  });
  readonly submitted = signal(false);
  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.form.set({ code: init.code, queenYear: init.queenYear ?? new Date().getFullYear(), temperament: init.temperament, status: init.status, notes: init.notes ?? '' });
      } else {
        this.form.update((prev) => ({ ...prev, code: '', notes: '' }));
      }
      this.submitted.set(false);
    });
  }

  submit(): void {
    const form = this.form();
    if (!form.code.trim()) {
      this.submitted.set(true);
      return;
    }

    this.save.emit(form);
    this.form.update((prev) => ({ ...prev, code: '' }));
    this.submitted.set(false);
  }
}
