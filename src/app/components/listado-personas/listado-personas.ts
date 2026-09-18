import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  GeneroResource,
  NacionalidadResource,
  PersonaResource,
} from '../../resources/domain.model';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-listado-personas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-personas.html',
})
export class ListadoPersonasComponent implements OnInit {
  personas: PersonaResource[] = [];
  generos: GeneroResource[] = [];
  nacionalidades: NacionalidadResource[] = [];
  errorMessage = '';

  constructor(
    private readonly personaService: PersonaService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.personaService.getPersonas().subscribe({
      next: (personas) => {
        this.personas = personas;
      },
      error: (error) => {
        this.errorMessage = 'No se pudieron cargar las personas.';
        console.error(error);
      },
    });

    this.personaService.getGeneros().subscribe((generos) => {
      this.generos = generos;
    });

    this.personaService.getNacionalidades().subscribe((nacionalidades) => {
      this.nacionalidades = nacionalidades;
    });
  }

  editarPersona(persona: PersonaResource): void {
    this.router.navigate(['/persona-formulario', persona.id]);
  }

  nuevaPersona(): void {
    this.router.navigate(['/persona-formulario', 'nuevo']);
  }

  eliminarPersona(persona: PersonaResource): void {
    const nombreCompleto = `${persona.apellido}, ${persona.nombre}`;
    if (!window.confirm(`¿Desea eliminar a ${nombreCompleto}?`)) {
      return;
    }

    this.personaService.deletePersona(persona.id).subscribe({
      next: (personas) => {
        this.personas = personas;
      },
      error: (error) => {
        this.errorMessage = 'No se pudo eliminar la persona.';
        console.error(error);
      },
    });
  }

  obtenerGenero(id: number): string {
    return this.generos.find((genero) => genero.id === id)?.descripcion ?? '';
  }

  obtenerNacionalidad(id: number): string {
    return this.nacionalidades.find((nacionalidad) => nacionalidad.id === Number(id))?.descripcion ?? '';
  }
}
