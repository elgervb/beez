import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { TodoStore } from '../todo-store';
import { TranslatePipe } from '../../../../ui/pipes/translate.pipe';

@Component({
  selector: 'bee-todo-checklist',
  imports: [TranslatePipe],
  templateUrl: './todo-checklist.html',
  styleUrl: './todo-checklist.css'
})
export class TodoChecklistComponent {
  private readonly todoStore = inject(TodoStore);

  readonly hiveId = input.required<string>();
  readonly completedTodoIds = output<string[]>();

  readonly openTodos = computed(() =>
    this.todoStore.todos().filter((t) => t.hiveId === this.hiveId() && !t.done)
  );

  readonly newTodoText = signal('');
  readonly pendingCompletedIds = signal<string[]>([]);

  constructor() {
    effect(() => {
      const openTodoIds = new Set(this.openTodos().map((todo) => todo.id));
      const nextPendingIds = this.pendingCompletedIds().filter((id) => openTodoIds.has(id));
      if (nextPendingIds.length !== this.pendingCompletedIds().length) {
        this.pendingCompletedIds.set(nextPendingIds);
      }
      this.completedTodoIds.emit(nextPendingIds);
    });
  }

  toggleTodo(id: string, checked: boolean): void {
    this.pendingCompletedIds.update((ids) => {
      if (checked) {
        return ids.includes(id) ? ids : [...ids, id];
      }
      return ids.filter((pendingId) => pendingId !== id);
    });
  }

  addTodo(): void {
    const text = this.newTodoText();
    if (!text.trim()) return;
    this.todoStore.add(this.hiveId(), text);
    this.newTodoText.set('');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTodo();
    }
  }

  isPendingComplete(id: string): boolean {
    return this.pendingCompletedIds().includes(id);
  }
}
