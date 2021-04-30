import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { Hive } from '../models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HiveService {

  private get collectionPath(): string {
    return `beez/${this.authService.uid}/hives`;
  }

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }

  createHive(hive: Hive): Observable<DocumentReference<Hive>> {
    return from(this.angularFirestore.collection<Hive>(this.collectionPath).add(hive));
  }

  deleteHive(hive: Hive): Observable<void> {
    this.angularFirestore.doc(`${this.collectionPath}/${hive.id}`).delete();
    return of();
  }

  getHive(hiveId: string): Observable<Hive | undefined> {
    return this.angularFirestore.collection<Hive>(this.collectionPath).doc(hiveId).get()
      .pipe(
        map(doc => doc.data()),
        map(hive => hive ? { ...hive, id: hiveId } : hive)
      );
  }

  getHives(): Observable<Hive[]> {
    return this.angularFirestore.collection<Hive>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  updateHive(hive: Hive): Observable<Hive | undefined> {
    const document = this.angularFirestore.collection<Hive>(this.collectionPath).doc(hive.id);
    document.update(hive);
    return document.get()
      .pipe(
        map(doc => doc.data())
      );
  }
}
