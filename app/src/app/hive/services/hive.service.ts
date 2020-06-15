import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hive } from '@common/hive';

@Injectable({
  providedIn: 'root'
})
export class HiveService {

  constructor(private http: HttpClient) { }

  delete(hive: Hive) {
    return this.http.delete(`/api/hive/${hive.name}/${hive.number}`);
  }

  findAll() {
    return this.http.get<Hive[]>('/api/hive');
  }

  findOne(name: string, nr: number) {
    return this.http.get<Hive>(`/api/hive/${name}/${nr}`);
  }

  save(hive: Hive) {
    return this.http.post<Hive>('/api/hive', hive);
  }
}
