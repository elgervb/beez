import { Component, computed, inject, input, output } from '@angular/core';
import { TodoStore } from '../todo-store';
import { TranslatePipe } from '../../../../ui/pipes/translate.pipe';

@Component({
  selector: 'bee-todo-list',
  imports: [TranslatePipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoListComponent {
  private readonly todoStore = inject(TodoStore);

  readonly hiveId = input.required<string>();
  readonly openRequested = output<void>();

  readonly hiveTodos = computed(() => this.todoStore.todos().filter((t) => t.hiveId === this.hiveId()));

  readonly openTodos = computed(() =>
    this.hiveTodos().filter((t) => !t.done)
  );

  readonly closedCount = computed(() => this.hiveTodos().filter((t) => t.done).length);
}
