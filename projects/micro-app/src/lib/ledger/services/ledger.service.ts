import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from 'auth';
import { from, Observable } from 'rxjs';
import { LedgerEntry } from '../models';
import firebase from 'firebase/app';

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

  getEntries(year: number): Observable<LedgerEntry[]> {
    return this.angularFirestore.collection<LedgerEntry>(this.collectionPath, ref => ref.orderBy('date', 'desc')
      .startAt(firebase.firestore.Timestamp.fromDate(new Date(`12-31-${year}`)))
      .endAt(firebase.firestore.Timestamp.fromDate(new Date(`1-1-${year}`)))
      .limit(250))
      .valueChanges({ idField: 'id' });
  }

}
