export interface GeneroResource {
  id: number;
  descripcion: string;
}

export interface NacionalidadResource {
  id: number;
  descripcion: string;
}

export interface EquipoResource {
  id: number;
  descripcion: string;
}

export interface HobbyResource {
  id: number;
  descripcion: string;
} 

export interface PersonaResource {
  id: number;
  nombre: string;
  apellido: string;
  generoId: number;
  nacionalidadId: number;
  equipoId: number;
  hobbiesIds: number[];
  fechaNacimiento: string;
  email: string;
  password: string;
  otrasActividades: string;
}

export type ModeType = 'nuevo' | 'editar';
