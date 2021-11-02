import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { LedgerEntry } from '../../models';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'bee-legder',
  templateUrl: './legder.component.html',
  styleUrls: [ './legder.component.css' ]
})
export class LegderComponent implements OnInit {

  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  year: number | null;
  entries$: Observable<LedgerEntry[]>;

  constructor(
    private ledgerService: LedgerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.year = this.route.snapshot.paramMap.get('year') as number | null || new Date().getFullYear();

    this.entries$ = this.ledgerService.getEntries();
  }

  addEntry(entry: LedgerEntry): void {
    this.ledgerService.createEntry(entry)
      .pipe(
        take(1),
        tap(() => this.collapse()),
      ).subscribe();
  }

  collapse(): void {
    this.expansionPanel.close();
  }

}
