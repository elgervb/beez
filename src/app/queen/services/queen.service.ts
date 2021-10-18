import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { Queen } from '../models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  private get collectionPath(): string {
    return `beez/${this.authService.uid}/queens`;
  }

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }

  createQueen(queen: Queen): Observable<DocumentReference<Queen>> {
    return from(this.angularFirestore.collection<Queen>(this.collectionPath).add(queen));
  }

  deleteQueen(queen: Queen): Observable<boolean> {
    this.angularFirestore.doc(`${this.collectionPath}/${queen.id}`).delete();
    return of(true);
  }

  getQueen(queenId: string): Observable<Queen | undefined> {
    return this.angularFirestore.collection<Queen>(this.collectionPath).doc(queenId).get()
      .pipe(
        map(doc => doc.data()),
        map(queen => queen ? { ...queen, id: queenId } : queen)
      );
  }

  getQueens(): Observable<Queen[]> {
    return this.angularFirestore.collection<Queen>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  updateQueen(queen: Queen): Observable<Queen | undefined> {
    const document = this.angularFirestore.collection<Queen>(this.collectionPath).doc(queen.id);
    document.update(queen);
    return document.get()
      .pipe(map(doc => doc.data()));
  }

}
