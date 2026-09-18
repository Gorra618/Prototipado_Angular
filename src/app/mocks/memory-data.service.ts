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
  createDb(): Record<string, unknown> {
    return {
      personas: personasMock,
      generos: generosMock,
      nacionalidades: nacionalidadesMock,
      equipos: equiposMock,
      hobbies: hobbiesMock,
    };
  }
}
