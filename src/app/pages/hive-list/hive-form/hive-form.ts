import { Component, computed, effect, input, output, signal } from '@angular/core';
import { form, FormField, max, min, required, submit } from '@angular/forms/signals';
import { Hive } from '../../../data/models';
import { TranslatePipe } from '../../../ui/pipes/translate.pipe';

@Component({
  selector: 'bee-hive-form',
  imports: [FormField, TranslatePipe],
  templateUrl: './hive-form.html',
  styleUrl: './hive-form.css'
})
export class HiveFormComponent {
  readonly initial = input<Hive | null>(null);

  readonly save = output<Pick<Hive, 'code' | 'queenYear' | 'temperament' | 'status' | 'notes'>>();
  readonly dismissed = output<void>();

  readonly formModel = signal({
    code: '',
    queenYear: new Date().getFullYear(),
    temperament: 'calm' as Hive['temperament'],
    status: 'active' as Hive['status'],
    notes: ''
  });
  readonly form = form(this.formModel, (path) => {
    required(path.code);
    min(path.queenYear, 2019);
    max(path.queenYear, 2100);
  });
  readonly submitted = signal(false);
  readonly showCodeError = computed(() => this.submitted() && !this.form.code().valid());
  readonly showQueenYearError = computed(() => this.submitted() && !this.form.queenYear().valid());

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.formModel.set({
          code: init.code,
          queenYear: init.queenYear ?? new Date().getFullYear(),
          temperament: init.temperament,
          status: init.status,
          notes: init.notes ?? ''
        });
      } else {
        this.formModel.set({
          code: '',
          queenYear: new Date().getFullYear(),
          temperament: 'calm',
          status: 'active',
          notes: ''
        });
      }
      this.submitted.set(false);
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
    void submit(this.form, async () => {
      const value = this.formModel();
      this.save.emit({
        code: value.code.trim(),
        queenYear: value.queenYear,
        temperament: value.temperament,
        status: value.status,
        notes: value.notes
      });
      this.formModel.update((prev) => ({ ...prev, code: '' }));
      this.submitted.set(false);
    });
  }
}
