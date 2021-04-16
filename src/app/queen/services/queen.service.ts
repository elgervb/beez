import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth';
import { Queen } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  get collection(): string {
    return `beez/${this.authService.uid}/queens`;
  }

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }


  createQueen(queen: Queen): Promise<DocumentReference<Queen>> {
    return this.angularFirestore.collection<Queen>(this.collection).add(queen);
  }

  getQueens(): AngularFirestoreCollection<Queen> {
    return this.angularFirestore.collection<Queen>(this.collection);
  }
}
