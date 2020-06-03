import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hive } from '@common/hive';

@Injectable({
  providedIn: 'root'
})
export class HiveService {

  constructor(private http: HttpClient) { }

  delete(hive: Hive) {
    return this.http.delete(`http://localhost:3000/hive/${hive.name}`);
  }

  findAll() {
    return this.http.get<Hive[]>('http://localhost:3000/hive');
  }

  save(hive: Hive) {
    return this.http.post<Hive>('http://localhost:3000/hive', hive);
  }
}
