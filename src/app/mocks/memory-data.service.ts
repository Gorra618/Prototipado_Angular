import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import {
  equiposMock,
  generosMock,
  hobbiesMock,
  nacionalidadesMock,
  personasMock,
} from './data-mocks';

@Injectable({ providedIn: 'root' })
export class MemoryDataService implements InMemoryDbService {
  private readonly mappingUrlToMemoryDb: Record<string, string> = {
    'api/personas/listado': 'http://localhost/api/personas',
    'api/generos': 'http://localhost/api/generos',
    'api/nacionalidades': 'http://localhost/api/nacionalidades',
    'api/equipos': 'http://localhost/api/equipos',
    'api/hobbies': 'http://localhost/api/hobbies',
  };

  createDb(): Record<string, unknown> {
    return {
      personas: personasMock,
      generos: generosMock,
      nacionalidades: nacionalidadesMock,
      equipos: equiposMock,
      hobbies: hobbiesMock,
    };
  }

  getMappingUrl(path: string | undefined): string {
    if (!path) {
      return '';
    }

    const mapping = Object.entries(this.mappingUrlToMemoryDb).find(([key]) =>
      path.startsWith(key),
    );

    if (!mapping) {
      return '';
    }

    const [sourcePath, targetPath] = mapping;
    return `${targetPath}${path.slice(sourcePath.length)}`;
  }
}
