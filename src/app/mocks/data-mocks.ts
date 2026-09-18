import {
  EquipoResource,
  GeneroResource,
  HobbyResource,
  NacionalidadResource,
  PersonaResource,
} from '../resources/domain.model';

export const personasMock: PersonaResource[] = [
  {
    id: 1,
    nombre: 'Genaro',
    apellido: 'Santi',
    generoId: 1,
    nacionalidadId: 1,
    equipoId: 1,
    hobbiesIds: [1, 3],
    fechaNacimiento: '1995-04-12',
    email: 'genaro@gmail.com',
    password: '123456',
    otrasActividades: 'Voluntariado',
  },
  {
    id: 2,
    nombre: 'Nicolas',
    apellido: 'Stasyszyn',
    generoId: 1,
    nacionalidadId: 1,
    equipoId: 2,
    hobbiesIds: [2, 5],
    fechaNacimiento: '1992-09-23',
    email: 'Nicolas@example.com',
    password: '123456',
    otrasActividades: 'Fotografía',
  },
];

export const generosMock: GeneroResource[] = [
  { id: 1, descripcion: 'Masculino' },
  { id: 2, descripcion: 'Femenino' },
  { id: 3, descripcion: 'No binario' },
];

export const nacionalidadesMock: NacionalidadResource[] = [
  { id: 1, descripcion: 'Argentina' },
  { id: 2, descripcion: 'Brasil' },
  { id: 3, descripcion: 'Chile' },
  { id: 4, descripcion: 'Uruguay' },
];

export const equiposMock: EquipoResource[] = [
  { id: 1, descripcion: 'Belgrano' },
  { id: 2, descripcion: 'Talleres' },
  { id: 3, descripcion: 'Instituto' },
  { id: 4, descripcion: 'Boca' },
  { id: 5, descripcion: 'River' },
  { id: 6, descripcion: 'Racing' },
  { id: 7, descripcion: 'Independiente' },
];

export const hobbiesMock: HobbyResource[] = [
  { id: 1, descripcion: 'Fútbol' },
  { id: 2, descripcion: 'Lectura' },
  { id: 3, descripcion: 'Viajes' },
  { id: 4, descripcion: 'Música' },
  { id: 5, descripcion: 'Tecnología' },
];