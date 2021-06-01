import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth';
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

  private collectionPath(hiveId: string): string {
    return `beez/${this.authService.uid}/hives/${hiveId}/inspections`;
  }
}
