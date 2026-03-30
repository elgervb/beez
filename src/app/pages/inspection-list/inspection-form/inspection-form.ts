import { Component, computed, effect, input, output, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Inspection } from '../../../data/models';

@Component({
  selector: 'bee-inspection-form',
  imports: [FormField],
  templateUrl: './inspection-form.html',
  styleUrl: './inspection-form.css'
})
export class InspectionFormComponent {
  readonly initial = input<Inspection | null>(null);
  readonly knownInspectors = input<string[]>([]);

  readonly save = output<Omit<Inspection, 'id' | 'createdAt' | 'hiveId'>>();
  readonly dismissed = output<void>();

  readonly formModel = signal({
    date: new Date().toISOString().slice(0, 10),
    broodPattern: 'good' as Inspection['broodPattern'],
    storesLevel: 'medium' as Inspection['storesLevel'],
    broodSeen: false,
    open: false,
    notes: '',
    inspector: localStorage.getItem('beez-inspector') ?? ''
  });
  readonly form = form(this.formModel, (path) => {
    required(path.inspector);
  });

  readonly tasks = signal<string[]>([]);
  readonly newTask = signal('');

  readonly showOpenBrood = computed(() => this.form.broodSeen().value());
  readonly submitted = signal(false);
  readonly showInspectorError = computed(() => this.submitted() && !this.form.inspector().valid());

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.formModel.set({
          date: init.date,
          broodPattern: init.broodPattern,
          storesLevel: init.storesLevel,
          broodSeen: init.broodSeen,
          open: init.open,
          notes: init.notes,
          inspector: init.inspector
        });
        this.tasks.set([...(init.tasks ?? [])]);
      } else {
        this.formModel.set({
          date: new Date().toISOString().slice(0, 10),
          broodPattern: 'good',
          storesLevel: 'medium',
          broodSeen: false,
          open: false,
          notes: '',
          inspector: localStorage.getItem('beez-inspector') ?? ''
        });
        this.tasks.set([]);
      }
      this.newTask.set('');
      this.submitted.set(false);
    });
  }

  addTask(): void {
    const text = this.newTask().trim();
    if (!text) return;
    if (this.tasks().includes(text)) {
      this.newTask.set('');
      return;
    }
    this.tasks.update((t) => [...t, text]);
    this.newTask.set('');
  }

  addTaskOnEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTask();
    }
  }

  removeTask(index: number): void {
    this.tasks.update((t) => t.filter((_, i) => i !== index));
  }

  applyPreset(preset: 'routine' | 'low-stores' | 'follow-up'): void {
    this.formModel.update((f) => {
      if (preset === 'routine') {
        return {
          ...f,
          broodPattern: 'good',
          storesLevel: 'medium',
          broodSeen: true,
          open: false,
          notes: 'Routine check completed.'
        };
      }
      if (preset === 'low-stores') {
        return {
          ...f,
          broodPattern: 'good',
          storesLevel: 'low',
          broodSeen: true,
          open: true,
          notes: 'Low stores, feeding recommended.'
        };
      }
      return {
        ...f,
        broodPattern: 'poor',
        storesLevel: 'low',
        broodSeen: true,
        open: false,
        notes: 'Needs follow-up inspection soon.'
      };
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
    void submit(this.form, async () => {
      const value = this.formModel();
      this.save.emit({
        ...value,
        inspector: value.inspector.trim(),
        open: this.showOpenBrood() ? value.open : false,
        tasks: this.tasks()
      });
      localStorage.setItem('beez-inspector', value.inspector.trim());
      this.formModel.set({
        date: new Date().toISOString().slice(0, 10),
        broodPattern: 'good',
        storesLevel: 'medium',
        broodSeen: false,
        open: false,
        notes: '',
        inspector: ''
      });
      this.tasks.set([]);
      this.newTask.set('');
      this.submitted.set(false);
    });
  }
}
