import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Location } from '@common/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  delete(location: Location) {
    return this.http.delete(`/api/location/${location.name}`);
  }

  findAll() {
    return this.http.get<Location[]>('/api/location');
  }

  findOne(name: string) {
    return this.http.get<Location>(`/api/location/${name}`);
  }

  save(location: Location) {
    return this.http.post<Location>('/api/location', location);
  }

}
