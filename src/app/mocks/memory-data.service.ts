import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import {
  EquipoResource,
  GeneroResource,
  HobbyResource,
  NacionalidadResource,
  PersonaResource,
} from '../resources/domain.model';

@Injectable({ providedIn: 'root' })
export class MemoryDataService implements InMemoryDbService {
  createDb(): Record<string, unknown> {
    const personas: PersonaResource[] = [];
    const generos: GeneroResource[] = [
      { id: 1, descripcion: 'Masculino' },
      { id: 2, descripcion: 'Femenino' },
      { id: 3, descripcion: 'No binario' },
    ];
    const nacionalidades: NacionalidadResource[] = [
      { id: 1, descripcion: 'Argentina' },
      { id: 2, descripcion: 'Brasil' },
      { id: 3, descripcion: 'Chile' },
      { id: 4, descripcion: 'Uruguay' },
    ];
    const equipos: EquipoResource[] = [
      { id: 1, descripcion: 'Belgrano' },
      { id: 2, descripcion: 'Talleres' },
      { id: 3, descripcion: 'Instituto' },
      { id: 4, descripcion: 'Boca' },
      { id: 5, descripcion: 'River' },
      { id: 6, descripcion: 'Racing' },
      { id: 7, descripcion: 'Independiente' },
    ];
    const hobbies: HobbyResource[] = [
      { id: 1, descripcion: 'Fútbol' },
      { id: 2, descripcion: 'Lectura' },
      { id: 3, descripcion: 'Viajes' },
      { id: 4, descripcion: 'Música' },
      { id: 5, descripcion: 'Tecnología' },
    ];

    return { personas, generos, nacionalidades, equipos, hobbies };
  }
}
