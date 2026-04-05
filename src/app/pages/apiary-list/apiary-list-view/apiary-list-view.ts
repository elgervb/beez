import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Apiary } from '../../../data/models';
import { BadgeComponent } from '../../../ui/badge/badge';
import { SwipeToDeleteRowDirective } from '../../../ui/swipe-to-delete-row/swipe-to-delete-row.directive';
import { EmptyStateComponent } from '../../../ui/empty-state/empty-state';
import { TranslatePipe } from '../../../ui/pipes/translate.pipe';
import { ListKeyboardNavDirective } from '../../../ui/list-keyboard-nav/list-keyboard-nav.directive';
import { RowActionsComponent } from '../../../ui/row-actions/row-actions';

@Component({
  selector: 'bee-apiary-list-view',
  imports: [RouterLink, BadgeComponent, SwipeToDeleteRowDirective, EmptyStateComponent, TranslatePipe, ListKeyboardNavDirective, RowActionsComponent],
  templateUrl: './apiary-list-view.html',
  styleUrl: './apiary-list-view.css'
})
export class ApiaryListViewComponent {
  readonly apiaries = input.required<Apiary[]>();
  readonly hiveCounts = input.required<Partial<Record<string, number>>>();
  readonly editApiary = output<Apiary>();
  readonly deleteApiary = output<string>();
  readonly addRequested = output<void>();
}
