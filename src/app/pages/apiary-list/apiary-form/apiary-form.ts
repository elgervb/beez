import { Component, computed, effect, input, output, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Apiary } from '../../../data/models';
import { TranslatePipe } from '../../../ui/pipes/translate.pipe';

@Component({
  selector: 'bee-apiary-form',
  imports: [FormField, TranslatePipe],
  templateUrl: './apiary-form.html',
  styleUrl: './apiary-form.css'
})
export class ApiaryFormComponent {
  readonly initial = input<Apiary | null>(null);

  readonly save = output<{ name: string; location: string; notes: string }>();
  readonly dismissed = output<void>();

  readonly formModel = signal({ name: '', location: '', notes: '' });
  readonly form = form(this.formModel, (path) => {
    required(path.name);
    required(path.location);
  });
  readonly submitted = signal(false);
  readonly showNameError = computed(() => this.submitted() && !this.form.name().valid());
  readonly showLocationError = computed(() => this.submitted() && !this.form.location().valid());

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.formModel.set({ name: init.name, location: init.location ?? '', notes: init.notes ?? '' });
      } else {
        this.formModel.set({ name: '', location: '', notes: '' });
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
        name: value.name.trim(),
        location: value.location.trim(),
        notes: value.notes
      });
      this.formModel.set({ name: '', location: '', notes: '' });
      this.submitted.set(false);
    });
  }
}
