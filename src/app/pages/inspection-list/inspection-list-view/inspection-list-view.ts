import { Component, input, output } from '@angular/core';
import { Inspection } from '../../../data/models';
import { RelativeDatePipe } from '../../../ui/pipes/relative-date.pipe';
import { BadgeComponent } from '../../../ui/badge/badge';
import { SwipeToDeleteRowDirective } from '../../../ui/swipe-to-delete-row/swipe-to-delete-row.directive';
import { EmptyStateComponent } from '../../../ui/empty-state/empty-state';
import { TranslatePipe } from '../../../ui/pipes/translate.pipe';
import { ListKeyboardNavDirective } from '../../../ui/list-keyboard-nav/list-keyboard-nav.directive';
import { RowActionsComponent } from '../../../ui/row-actions/row-actions';

@Component({
  selector: 'bee-inspection-list-view',
  imports: [RelativeDatePipe, BadgeComponent, SwipeToDeleteRowDirective, EmptyStateComponent, TranslatePipe, ListKeyboardNavDirective, RowActionsComponent],
  templateUrl: './inspection-list-view.html',
  styleUrl: './inspection-list-view.css'
})
export class InspectionListViewComponent {
  readonly inspections = input.required<Inspection[]>();
  readonly selectedIds = input<string[]>([]);
  readonly editInspection = output<Inspection>();
  readonly deleteInspection = output<string>();
  readonly toggleSelected = output<{ id: string; checked: boolean }>();
  readonly addRequested = output<void>();
}
