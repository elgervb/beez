import { Component, input, output } from '@angular/core';
import { BadgeComponent } from '../badge/badge';
import { SearchFilterBarComponent } from '../search-filter-bar/search-filter-bar';
import { TranslatePipe } from '../pipes/translate.pipe';

export interface FilterOption {
  value: string;
  labelKey: string;
}

export interface BulkAction {
  value: string;
  labelKey: string;
  variant?: 'default' | 'danger';
}

@Component({
  selector: 'bee-filter-panel',
  imports: [SearchFilterBarComponent, BadgeComponent, TranslatePipe],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.css',
  host: { 'role': 'group', '[attr.aria-label]': 'ariaLabel()' }
})
export class FilterPanelComponent {
  readonly searchValue = input.required<string>();
  readonly searchExpanded = input.required<boolean>();
  readonly searchPlaceholder = input.required<string>();
  readonly filterOptions = input<FilterOption[]>([]);
  readonly filterValue = input<string>('');
  readonly selectedCount = input<number>(0);
  readonly bulkActions = input<BulkAction[]>([]);
  readonly ariaLabel = input<string>('');

  readonly searchValueChange = output<string>();
  readonly searchExpandedChange = output<boolean>();
  readonly filterValueChange = output<string>();
  readonly bulkActionSelected = output<string>();
}
