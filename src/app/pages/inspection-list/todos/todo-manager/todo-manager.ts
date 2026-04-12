import { Component, computed, inject, input, signal } from '@angular/core';
import { TodoStore } from '../todo-store';
import { TranslatePipe } from '../../../../ui/pipes/translate.pipe';

@Component({
  selector: 'bee-todo-manager',
  imports: [TranslatePipe],
  templateUrl: './todo-manager.html',
  styleUrl: './todo-manager.css'
})
export class TodoManagerComponent {
  private readonly todoStore = inject(TodoStore);

  readonly hiveId = input.required<string>();

  readonly newTodoText = signal('');

  readonly todos = computed(() =>
    [...this.todoStore.todos().filter((todo) => todo.hiveId === this.hiveId())].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return b.createdAt.localeCompare(a.createdAt);
    })
  );

  readonly openCount = computed(() => this.todos().filter((todo) => !todo.done).length);
  readonly closedCount = computed(() => this.todos().filter((todo) => todo.done).length);

  toggleDone(id: string, checked: boolean): void {
    this.todoStore.setDone(id, checked);
  }

  updateText(id: string, value: string): void {
    this.todoStore.updateText(id, value);
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
}
