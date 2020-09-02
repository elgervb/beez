import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inspection } from '@common/inspection';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  constructor(private http: HttpClient) { }

  delete(inspection: Inspection) {
    return this.http.delete(`${apiUrl}/inspection/${inspection.id}`);
  }

  findAll(hiveId: string) {
    return this.http.get<Inspection[]>(`${apiUrl}/inspection/${hiveId}`);
  }

  findOne(hiveId: string, inspectionId: string) {
    return this.http.get<Inspection>(`${apiUrl}/inspection/${hiveId}/${inspectionId}`);
  }

  save(inspection: Inspection) {
    return this.http.post<Inspection>(`${apiUrl}/inspection`, inspection);
  }
}
