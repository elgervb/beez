import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Queen } from '@common/queen';

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  constructor(private http: HttpClient) { }

  delete(queen: Queen) {
    return this.http.delete(`/api/queen/${queen.name}`);
  }

  findAll() {
    return this.http.get<Queen[]>('/api/queen');
  }

  findOne(name: string) {
    return this.http.get<Queen>(`/api/queen/${name}`);
  }

  save(queen: Queen) {
    return this.http.post<Queen>('/api/queen', queen);
  }
}
