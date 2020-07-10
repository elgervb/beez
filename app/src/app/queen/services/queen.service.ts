import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Queen } from '@common/queen';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  constructor(private http: HttpClient) { }

  delete(queen: Queen) {
    return this.http.delete(`${apiUrl}/queen/${queen.name}`);
  }

  findAll() {
    return this.http.get<Queen[]>(`${apiUrl}/queen`);
  }

  findOne(name: string) {
    return this.http.get<Queen>(`${apiUrl}/queen/${name}`);
  }

  save(queen: Queen) {
    return this.http.post<Queen>(`${apiUrl}/queen`, queen);
  }
}
