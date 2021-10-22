import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from 'auth';
import { Inspection } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }

  add(inspection: Inspection, hiveId: string): Observable<DocumentReference<Inspection>> {
    return from(this.angularFirestore.collection<Inspection>(this.collectionPath(hiveId)).add(inspection));
  }

  getInspections(hiveId: string, limit = 5): Observable<Inspection[]> {
    return this.angularFirestore.collection<Inspection>(
      this.collectionPath(hiveId),
      ref => ref.limit(limit).orderBy('date', 'desc')
    ).valueChanges({ idField: 'id' });
  }

  private collectionPath(hiveId: string): string {
    return `beez/${this.authService.uid}/hives/${hiveId}/inspections`;
  }

}
