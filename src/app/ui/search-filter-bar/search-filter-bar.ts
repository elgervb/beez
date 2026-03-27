import { Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'bee-search-filter-bar',
  standalone: true,
  templateUrl: './search-filter-bar.html',
  styleUrl: './search-filter-bar.css'
})
export class SearchFilterBarComponent {
  readonly value = input<string>('');
  readonly expanded = input<boolean>(false);
  readonly placeholder = input<string>('Search');
  readonly ariaLabel = input<string>('Toggle search');

  readonly valueChange = output<string>();
  readonly expandedChange = output<boolean>();

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  toggleSearch(): void {
    const next = !this.expanded();
    this.expandedChange.emit(next);
    if (!next) return;
    setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  onBlur(): void {
    if (this.value().trim()) return;
    this.expandedChange.emit(false);
  }
}
