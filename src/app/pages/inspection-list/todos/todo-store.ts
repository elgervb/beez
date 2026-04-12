import { Injectable, signal } from '@angular/core';
import { InspectionTodo } from './todo.model';

const STORAGE_KEY = 'beez-todos-v1';
const PENDING_LOCAL_CHANGES_KEY = 'beez-pending-local';
const LAST_SYNC_AT_KEY = 'beez-last-sync-at';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  private readonly _todos = signal<InspectionTodo[]>(this.load());

  readonly todos = this._todos.asReadonly();

  exportData(): InspectionTodo[] {
    return structuredClone(this._todos());
  }

  add(hiveId: string, text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    const todo: InspectionTodo = {
      id: crypto.randomUUID(),
      hiveId,
      text: trimmed,
      done: false,
      createdAt: new Date().toISOString()
    };
    this._todos.update((ts) => [todo, ...ts]);
    this.persist();
  }

  close(id: string): void {
    this.closeMany([id]);
  }

  setDone(id: string, done: boolean): void {
    this._todos.update((ts) =>
      ts.map((t) =>
        t.id === id
          ? {
              ...t,
              done,
              closedAt: done ? t.closedAt ?? new Date().toISOString() : undefined
            }
          : t
      )
    );
    this.persist();
  }

  updateText(id: string, text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    this._todos.update((ts) => ts.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
    this.persist();
  }

  closeMany(ids: string[]): void {
    if (ids.length === 0) return;
    const idsSet = new Set(ids);
    this._todos.update((ts) =>
      ts.map((t) =>
        idsSet.has(t.id) && !t.done ? { ...t, done: true, closedAt: new Date().toISOString() } : t
      )
    );
    this.persist();
  }

  private load(): InspectionTodo[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      return this.normalizeTodos(parsed);
    } catch {
      return [];
    }
  }

  cacheFromRemote(candidate: unknown): void {
    const todos = this.normalizeTodos(candidate);
    this._todos.set(todos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    localStorage.setItem(PENDING_LOCAL_CHANGES_KEY, '0');
    localStorage.setItem(LAST_SYNC_AT_KEY, new Date().toISOString());
    globalThis.dispatchEvent(new CustomEvent('beez-data-changed'));
  }

  private normalizeTodos(candidate: unknown): InspectionTodo[] {
    if (!Array.isArray(candidate)) return [];
    return candidate.filter((todo): todo is InspectionTodo => this.isTodo(todo));
  }

  private isTodo(candidate: unknown): candidate is InspectionTodo {
    const todo = candidate as InspectionTodo;
    return (
      !!todo &&
      typeof todo.id === 'string' &&
      typeof todo.hiveId === 'string' &&
      typeof todo.text === 'string' &&
      typeof todo.done === 'boolean' &&
      typeof todo.createdAt === 'string' &&
      (todo.closedAt === undefined || typeof todo.closedAt === 'string')
    );
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._todos()));
    const current = Number(localStorage.getItem(PENDING_LOCAL_CHANGES_KEY) ?? '0');
    localStorage.setItem(PENDING_LOCAL_CHANGES_KEY, String((Number.isFinite(current) ? current : 0) + 1));
    globalThis.dispatchEvent(new CustomEvent('beez-data-changed'));
  }
}
