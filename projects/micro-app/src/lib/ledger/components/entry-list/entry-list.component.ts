import { Component, Input } from '@angular/core';
import { LedgerEntry } from '../../models';

@Component({
  selector: 'bee-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: [ './entry-list.component.css' ]
})
export class EntryListComponent {

  @Input() entries: LedgerEntry[] | null;

}
