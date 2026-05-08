import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Inspection } from '../../../data/models';
import { TranslatePipe } from '../../../ui/pipes/translate.pipe';
import { TodoChecklistComponent } from '../todos/todo-checklist/todo-checklist';
import { TodoStore } from '../todos/todo-store';

function defaultHoneyLevel(storesLevel: Inspection['storesLevel']): number {
  if (storesLevel === 'high') return 80;
  if (storesLevel === 'low') return 20;
  return 50;
}

function clampHoneyLevel(level: number): number {
  return Math.max(0, Math.min(100, Math.round(level)));
}

@Component({
  selector: 'bee-inspection-form',
  imports: [FormField, TranslatePipe, TodoChecklistComponent],
  templateUrl: './inspection-form.html',
  styleUrl: './inspection-form.css'
})
export class InspectionFormComponent {
  private readonly todoStore = inject(TodoStore);

  readonly initial = input<Inspection | null>(null);
  readonly hiveId = input.required<string>();
  readonly draft = input<Omit<Inspection, 'id' | 'createdAt' | 'hiveId'> | null>(null);
  readonly knownInspectors = input<string[]>([]);

  readonly save = output<Omit<Inspection, 'id' | 'createdAt' | 'hiveId'>>();
  readonly dismissed = output<void>();

  readonly formModel = signal({
    date: new Date().toISOString().slice(0, 10),
    broodPattern: 'good' as Inspection['broodPattern'],
    storesLevel: 'medium' as Inspection['storesLevel'],
    honeyLevel: 50,
    broodSeen: false,
    open: false,
    notes: '',
    inspector: localStorage.getItem('beez-inspector') ?? ''
  });
  readonly form = form(this.formModel, (path) => {
    required(path.inspector);
  });

  readonly showOpenBrood = computed(() => this.form.broodSeen().value());
  readonly submitted = signal(false);
  readonly pendingCompletedTodoIds = signal<string[]>([]);
  readonly showInspectorError = computed(() => this.submitted() && !this.form.inspector().valid());

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.formModel.set({
          date: init.date,
          broodPattern: init.broodPattern,
          storesLevel: init.storesLevel,
          honeyLevel: clampHoneyLevel(init.honeyLevel ?? defaultHoneyLevel(init.storesLevel)),
          broodSeen: init.broodSeen,
          open: init.open,
          notes: init.notes,
          inspector: init.inspector
        });
      } else {
        const draft = this.draft();
        if (draft) {
          this.formModel.set({
            date: draft.date,
            broodPattern: draft.broodPattern,
            storesLevel: draft.storesLevel,
            honeyLevel: clampHoneyLevel(draft.honeyLevel ?? defaultHoneyLevel(draft.storesLevel)),
            broodSeen: draft.broodSeen,
            open: draft.open,
            notes: draft.notes,
            inspector: draft.inspector
          });
        } else {
          this.formModel.set({
            date: new Date().toISOString().slice(0, 10),
            broodPattern: 'good',
            storesLevel: 'medium',
            honeyLevel: 50,
            broodSeen: false,
            open: false,
            notes: '',
            inspector: localStorage.getItem('beez-inspector') ?? ''
          });
        }
      }
      this.pendingCompletedTodoIds.set([]);
      this.submitted.set(false);
    });
  }

  applyPreset(preset: 'routine' | 'low-stores' | 'follow-up'): void {
    this.formModel.update((f) => {
      if (preset === 'routine') {
        return {
          ...f,
          broodPattern: 'good',
          storesLevel: 'medium',
          honeyLevel: 60,
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
          honeyLevel: 20,
          broodSeen: true,
          open: true,
          notes: 'Low stores, feeding recommended.'
        };
      }
      return {
        ...f,
        broodPattern: 'poor',
        storesLevel: 'low',
        honeyLevel: 15,
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
        honeyLevel: clampHoneyLevel(value.honeyLevel),
        inspector: value.inspector.trim(),
        open: this.showOpenBrood() ? value.open : false
      });
      this.todoStore.closeMany(this.pendingCompletedTodoIds());
      localStorage.setItem('beez-inspector', value.inspector.trim());
      this.formModel.set({
        date: new Date().toISOString().slice(0, 10),
        broodPattern: 'good',
        storesLevel: 'medium',
        honeyLevel: 50,
        broodSeen: false,
        open: false,
        notes: '',
        inspector: ''
      });
      this.pendingCompletedTodoIds.set([]);
      this.submitted.set(false);
    });
  }
}
