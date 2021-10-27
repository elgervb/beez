import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'auth';
import { BehaviorSubject, EMPTY, from, map, mergeMap, Observable, tap } from 'rxjs';
import firebase from 'firebase/app';
import { Timestamp } from '../models';

export interface Preferences {
  id?: string;
  date: Timestamp;
  language: string;
}

export const defaultPreferences: Preferences = {
  date: firebase.firestore.Timestamp.fromDate(new Date()),
  language: 'en'
};

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  preferences$: Observable<Preferences | undefined>;
  private preferenceSubject = new BehaviorSubject<Preferences | undefined>(undefined);

  private get collectionPath(): string {
    return `beez/${this.authService.uid}/preferences`;
  }

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.preferences$ = this.preferenceSubject.asObservable();
  }

  get(): Observable<Preferences | undefined > {
    if (!this.preferenceSubject.value) {
      this.angularFirestore.collection<Preferences>(this.collectionPath, ref => ref.orderBy('date', 'desc').limit(1))
        .get().pipe(
          map(prefs => prefs.size > 0 ? prefs.docs[0] : undefined),
          tap(pref => this.preferenceSubject.next(pref?.data() || defaultPreferences))
        ).subscribe();
    }
    return this.preferences$;
  }

  update(prefs?: Preferences): Observable<Preferences | undefined> {
    if (prefs && prefs !== this.preferenceSubject.value) {
      const date = firebase.firestore.Timestamp.fromDate(new Date());
      const collection = this.angularFirestore.collection<Preferences>(this.collectionPath);
      return from(collection.add({ ...prefs, date }).then(document => collection.doc(document.id).get().pipe(map(doc => doc.data()))))
        .pipe(mergeMap(p => p));
    }

    return EMPTY;
  }

}
