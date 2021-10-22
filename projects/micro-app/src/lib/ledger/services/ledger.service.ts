import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from 'auth';
import { from, Observable } from 'rxjs';
import { LedgerEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  private get collectionPath(): string {
    return `beez/${this.authService.uid}/ledger`;
  }

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }

  createEntry(entry: LedgerEntry): Observable<DocumentReference<LedgerEntry>> {
    return from(this.angularFirestore.collection<LedgerEntry>(this.collectionPath).add(entry));
  }

  getEntries(): Observable<LedgerEntry[]> {
    return this.angularFirestore.collection<LedgerEntry>(this.collectionPath, ref => ref.orderBy('date', 'desc').limit(250))
      .valueChanges({ idField: 'id' });
  }

}
