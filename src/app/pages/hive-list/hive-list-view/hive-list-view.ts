import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hive } from '../../../data/models';
import { BadgeComponent } from '../../../ui/badge/badge';
import { SwipeToDeleteRowDirective } from '../../../ui/swipe-to-delete-row/swipe-to-delete-row.directive';
import { EmptyStateComponent } from '../../../ui/empty-state/empty-state';
import { TranslatePipe } from '../../../ui/pipes/translate.pipe';
import { ListKeyboardNavDirective } from '../../../ui/list-keyboard-nav/list-keyboard-nav.directive';
import { RowActionsComponent } from '../../../ui/row-actions/row-actions';

@Component({
  selector: 'bee-hive-list-view',
  imports: [RouterLink, BadgeComponent, SwipeToDeleteRowDirective, EmptyStateComponent, TranslatePipe, ListKeyboardNavDirective, RowActionsComponent],
  templateUrl: './hive-list-view.html',
  styleUrl: './hive-list-view.css'
})
export class HiveListViewComponent {
  readonly apiaryId = input.required<string>();
  readonly hives = input.required<Hive[]>();
  readonly inspectionLabels = input.required<Partial<Record<string, string>>>();
  readonly healthScores = input.required<Partial<Record<string, number>>>();
  readonly trendLabels = input.required<Partial<Record<string, 'Improving' | 'Stable' | 'Declining'>>>();
  readonly dueLabels = input.required<Partial<Record<string, string>>>();
  readonly isDueByHive = input.required<Partial<Record<string, boolean>>>();
  readonly selectedIds = input<string[]>([]);
  readonly editHive = output<Hive>();
  readonly deleteHive = output<string>();
  readonly addRequested = output<void>();
  readonly toggleSelected = output<{ id: string; checked: boolean }>();

  healthVariant(score: number): 'danger' | 'warning' | 'success' {
    if (score < 50) return 'danger';
    if (score <= 70) return 'warning';
    return 'success';
  }
}
