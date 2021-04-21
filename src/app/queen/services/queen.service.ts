import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { Queen } from '../models';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  get collectionPath(): string {
    return `beez/${this.authService.uid}/queens`;
  }

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }

  createQueen(queen: Queen): Observable<DocumentReference<Queen>> {
    return from(this.angularFirestore.collection<Queen>(this.collectionPath).add(queen));
  }

  deleteQueen(queen: Queen): Observable<void> {
    this.angularFirestore.doc(`${this.collectionPath}/${queen.id}`).delete();
    return of();
  }

  getQueens(): AngularFirestoreCollection<Queen> {
    return this.angularFirestore.collection<Queen>(this.collectionPath);
  }

  updateQueen(queen: Queen): Observable<firebase.firestore.DocumentSnapshot<Queen>> {
    const doc = this.angularFirestore.collection<Queen>(this.collectionPath).doc();
    doc.update(queen);
    return doc.get();
  }
}
