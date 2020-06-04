import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Queen } from '@common/queen';

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  constructor(private http: HttpClient) { }

  delete(queen: Queen) {
    return this.http.delete(`http://localhost:3000/queen/${queen.name}`);
  }

  findAll() {
    return this.http.get<Queen[]>('http://localhost:3000/queen');
  }

  save(queen: Queen) {
    return this.http.post<Queen>('http://localhost:3000/queen', queen);
  }
}
