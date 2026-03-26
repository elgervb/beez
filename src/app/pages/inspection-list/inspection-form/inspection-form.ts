import { Component, computed, effect, input, output, signal } from '@angular/core';
import { Inspection } from '../../../data/models';

@Component({
  selector: 'bee-inspection-form',
  templateUrl: './inspection-form.html',
  styleUrl: './inspection-form.css'
})
export class InspectionFormComponent {
  readonly initial = input<Inspection | null>(null);
  readonly knownInspectors = input<string[]>([]);

  readonly save = output<Omit<Inspection, 'id' | 'createdAt' | 'hiveId'>>();
  readonly dismissed = output<void>();

  readonly form = signal({
    date: new Date().toISOString().slice(0, 10),
    broodPattern: 'good' as Inspection['broodPattern'],
    storesLevel: 'medium' as Inspection['storesLevel'],
    broodSeen: false,
    open: false,
    notes: '',
    inspector: localStorage.getItem('beez-inspector') ?? ''
  });

  readonly showOpenBrood = computed(() => this.form().broodSeen);
  readonly submitted = signal(false);

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.form.set({
          date: init.date,
          broodPattern: init.broodPattern,
          storesLevel: init.storesLevel,
          broodSeen: init.broodSeen,
          open: init.open,
          notes: init.notes,
          inspector: init.inspector
        });
      } else {
        this.form.set({
          date: new Date().toISOString().slice(0, 10),
          broodPattern: 'good',
          storesLevel: 'medium',
          broodSeen: false,
          open: false,
          notes: '',
          inspector: localStorage.getItem('beez-inspector') ?? ''
        });
      }
      this.submitted.set(false);
    });
  }

  applyPreset(preset: 'routine' | 'low-stores' | 'follow-up'): void {
    this.form.update((f) => {
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

  submit(): void {
    const form = this.form();
    if (!form.inspector.trim()) {
      this.submitted.set(true);
      return;
    }

    this.save.emit({
      ...form,
      open: this.showOpenBrood() ? form.open : false
    });
    localStorage.setItem('beez-inspector', form.inspector.trim());

    this.form.set({
      date: new Date().toISOString().slice(0, 10),
      broodPattern: 'good',
      storesLevel: 'medium',
      broodSeen: false,
      open: false,
      notes: '',
      inspector: ''
    });
    this.submitted.set(false);
  }
}
