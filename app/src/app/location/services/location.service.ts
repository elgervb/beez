import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@common/location';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  delete(location: Location) {
    return this.http.delete(`${apiUrl}/location/${location.name}`);
  }

  findAll() {
    return this.http.get<Location[]>(`${apiUrl}/location`);
  }

  findOne(name: string) {
    return this.http.get<Location>(`${apiUrl}/location/${name}`);
  }

  save(location: Location) {
    return this.http.post<Location>(`${apiUrl}/location`, location);
  }

}
