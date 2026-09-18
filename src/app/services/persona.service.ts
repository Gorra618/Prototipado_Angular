import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import {
  EquipoResource,
  GeneroResource,
  HobbyResource,
  NacionalidadResource,
  PersonaResource,
} from '../resources/domain.model';
@Injectable({ providedIn: 'root' })
export class PersonaService {
  private readonly apiUrl = '/api';

  constructor(private readonly http: HttpClient) {}

  getPersonas(): Observable<PersonaResource[]> {
    return this.http.get<PersonaResource[]>(`${this.apiUrl}/personas`);
  }

  getPersona(id: number): Observable<PersonaResource> {
    return this.http.get<PersonaResource>(`${this.apiUrl}/personas/${id}`);
  }

  savePersona(persona: PersonaResource): Observable<PersonaResource[]> {
    const request = persona.id === 0
      ? this.http.post<PersonaResource>(`${this.apiUrl}/personas`, persona)
      : this.http.put<PersonaResource>(`${this.apiUrl}/personas/${persona.id}`, persona);

    return request.pipe(switchMap(() => this.getPersonas()));
  }

  deletePersona(id: number): Observable<PersonaResource[]> {
    return this.http.delete<void>(`${this.apiUrl}/personas/${id}`).pipe(
      switchMap(() => this.getPersonas()),
    );
  }

  getGeneros(): Observable<GeneroResource[]> {
    return this.http.get<GeneroResource[]>(`${this.apiUrl}/generos`);
  }

  getNacionalidades(): Observable<NacionalidadResource[]> {
    return this.http.get<NacionalidadResource[]>(`${this.apiUrl}/nacionalidades`);
  }

  getEquipos(): Observable<EquipoResource[]> {
    return this.http.get<EquipoResource[]>(`${this.apiUrl}/equipos`);
  }

  getHobbies(): Observable<HobbyResource[]> {
    return this.http.get<HobbyResource[]>(`${this.apiUrl}/hobbies`);
  }
}
