import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hive } from '@common/hive';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class HiveService {

  constructor(private http: HttpClient) { }

  delete(hive: Hive) {
    return this.http.delete(`${apiUrl}/hive/${hive.name}/${hive.number}`);
  }

  findAll() {
    return this.http.get<Hive[]>(`${apiUrl}/hive`);
  }

  findOne(name: string, nr: number) {
    return this.http.get<Hive>(`${apiUrl}/hive/${name}/${nr}`);
  }

  save(hive: Hive) {
    return this.http.post<Hive>(`${apiUrl}/hive`, hive);
  }
}
