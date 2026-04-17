import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BeeStore } from '../../data/bee-store';
import { Inspection } from '../../data/models';
import { TranslationService } from '../../data/translation.service';
import { TodoStore } from '../inspection-list/todos/todo-store';
import { AppShellComponent } from '../../ui/app-shell/app-shell';
import { EmptyStateComponent } from '../../ui/empty-state/empty-state';
import { TranslatePipe } from '../../ui/pipes/translate.pipe';

@Component({
  selector: 'bee-dashboard',
  imports: [AppShellComponent, DatePipe, TranslatePipe, RouterLink, EmptyStateComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardPage {
  private readonly store = inject(BeeStore);
  private readonly todoStore = inject(TodoStore);
  private readonly router = inject(Router);
  readonly i18n = inject(TranslationService);

  readonly data = computed(() => this.store.getData());
  readonly reminderDays = signal<number>(this.loadReminderDays());

  readonly analytics = computed(() => {
    const data = this.data();
    const today = Date.now();
    const month = new Date().toISOString().slice(0, 7);
    const currentYear = new Date().getFullYear();
    const apiaryNameById = new Map(data.apiaries.map((apiary) => [apiary.id, apiary.name]));
    const hiveById = new Map(data.hives.map((hive) => [hive.id, hive]));
    const openTodoCountByHiveId = new Map<string, number>();
    for (const todo of this.todoStore.todos()) {
      if (todo.done) continue;
      if (!hiveById.has(todo.hiveId)) continue;
      openTodoCountByHiveId.set(todo.hiveId, (openTodoCountByHiveId.get(todo.hiveId) ?? 0) + 1);
    }
    const latestInspectionByHive = new Map<string, Inspection>();
    for (const inspection of data.inspections.slice().sort((a, b) => b.date.localeCompare(a.date))) {
      if (!latestInspectionByHive.has(inspection.hiveId)) {
        latestInspectionByHive.set(inspection.hiveId, inspection);
      }
    }
    const inspectionsThisMonth = data.inspections.filter((i) => i.date.startsWith(month)).length;
    const lowStoresRecent = data.inspections.filter((i) => i.storesLevel === 'low' && today - new Date(i.date).getTime() <= 14 * 86400000).length;
    const reminder = this.reminderDays();
    const overdue = data.hives.filter((h) => {
      const latest = latestInspectionByHive.get(h.id);
      if (!latest) return true;
      const days = Math.floor((today - new Date(latest.date).getTime()) / 86400000);
      return days >= reminder;
    }).length;
    const dueThisWeek = data.hives
      .map((hive) => {
        const latest = latestInspectionByHive.get(hive.id);
        const daysSince = latest ? Math.floor((today - new Date(latest.date).getTime()) / 86400000) : reminder;
        const dueInDays = latest ? reminder - daysSince : 0;

        return {
          hiveId: hive.id,
          apiaryId: hive.apiaryId,
          code: hive.code,
          apiary: apiaryNameById.get(hive.apiaryId) ?? '',
          latestDate: latest?.date ?? null,
          dueInDays
        };
      })
      .filter((report) => report.dueInDays <= 7)
      .sort((a, b) => a.dueInDays - b.dueInDays || a.code.localeCompare(b.code));
    const lowStoresWatch = data.hives
      .map((hive) => {
        const latest = latestInspectionByHive.get(hive.id);
        if (latest?.storesLevel !== 'low') return null;
        const daysSince = Math.floor((today - new Date(latest.date).getTime()) / 86400000);
        if (daysSince > 14) return null;

        return {
          hiveId: hive.id,
          apiaryId: hive.apiaryId,
          code: hive.code,
          apiary: apiaryNameById.get(hive.apiaryId) ?? '',
          inspectedOn: latest.date
        };
      })
      .filter((report): report is NonNullable<typeof report> => report !== null)
      .sort((a, b) => b.inspectedOn.localeCompare(a.inspectedOn));
    const weakColonies = data.hives
      .map((hive) => {
        const latest = latestInspectionByHive.get(hive.id);
        const isWeakStatus = hive.status === 'weak';
        const hasPoorBrood = latest?.broodPattern === 'poor';
        if (!isWeakStatus && !hasPoorBrood) return null;

        let reasonKey = 'settings.poorBrood';
        if (isWeakStatus && hasPoorBrood) {
          reasonKey = 'settings.weakStatusPoorBrood';
        } else if (isWeakStatus) {
          reasonKey = 'settings.weakStatus';
        }

        return {
          hiveId: hive.id,
          apiaryId: hive.apiaryId,
          code: hive.code,
          apiary: apiaryNameById.get(hive.apiaryId) ?? '',
          latestDate: latest?.date ?? null,
          reasonKey
        };
      })
      .filter((report): report is NonNullable<typeof report> => report !== null)
      .sort((a, b) => a.code.localeCompare(b.code));
    const queenAgeOverview = data.hives
      .map((hive) => ({
        hiveId: hive.id,
        apiaryId: hive.apiaryId,
        code: hive.code,
        apiary: apiaryNameById.get(hive.apiaryId) ?? '',
        queenYear: hive.queenYear,
        age: Math.max(0, currentYear - hive.queenYear)
      }))
      .sort((a, b) => b.age - a.age || a.code.localeCompare(b.code));
    const queenAgeAttention = queenAgeOverview.filter((item) => item.age >= 3);
    const queenAgeTwoPlus = queenAgeOverview.filter((item) => item.age >= 2).length;
    const queenAgeThreePlus = queenAgeAttention.length;
    const openTodosByHive = [...openTodoCountByHiveId.entries()]
      .map(([hiveId, count]) => {
        const hive = hiveById.get(hiveId);
        if (!hive) return null;
        return {
          hiveId,
          apiaryId: hive.apiaryId,
          code: hive.code,
          apiary: apiaryNameById.get(hive.apiaryId) ?? '',
          count
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
    const openTodoCount = openTodosByHive.reduce((total, item) => total + item.count, 0);

    return {
      apiaries: data.apiaries.length,
      hives: data.hives.length,
      inspectionsThisMonth,
      overdue,
      lowStoresRecent,
      dueThisWeek,
      lowStoresWatch,
      weakColonies,
      openTodosByHive,
      openTodoCount,
      queenAgeOverview: queenAgeAttention.slice(0, 4),
      queenAgeTwoPlus,
      queenAgeThreePlus
    };
  });

  readonly showDueThisWeekReport = computed(() => this.analytics().dueThisWeek.length > 0);
  readonly showLowStoresWatchReport = computed(() => this.analytics().lowStoresWatch.length > 0);
  readonly showWeakColoniesReport = computed(() => this.analytics().weakColonies.length > 0);
  readonly showOpenTodosReport = computed(() => this.analytics().openTodosByHive.length > 0);
  readonly showQueenAgeOverviewReport = computed(() => this.analytics().queenAgeOverview.length > 0);
  readonly showAnyFieldReport = computed(
    () =>
      this.showDueThisWeekReport() ||
      this.showLowStoresWatchReport() ||
      this.showWeakColoniesReport() ||
      this.showOpenTodosReport() ||
      this.showQueenAgeOverviewReport()
  );

  private loadReminderDays(): number {
    const raw = Number(localStorage.getItem('beez-reminder-days') ?? '14');
    return Number.isFinite(raw) && raw > 0 ? raw : 14;
  }

  openApiaries(): void {
    void this.router.navigate(['/'], { queryParams: { addApiary: 'true' } });
  }
}
