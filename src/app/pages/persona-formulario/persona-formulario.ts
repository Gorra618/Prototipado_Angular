import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';

import {
  EquipoResource,
  GeneroResource,
  HobbyResource,
  NacionalidadResource,
  PersonaResource,
} from '../../resources/domain.model';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-persona-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-formulario.html',
})
export class PersonaFormularioComponent implements OnInit {
  personaForm!: FormGroup;
  generos: GeneroResource[] = [];
  nacionalidades: NacionalidadResource[] = [];
  equipos: EquipoResource[] = [];
  hobbies: HobbyResource[] = [];
  mode: 'nuevo' | 'editar' = 'nuevo';
  errorMessage = '';
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly personaService: PersonaService,
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.loading = true;
    const routeMode = this.route.snapshot.data['mode'] as string | undefined;
    this.mode = routeMode === 'editar' ? 'editar' : 'nuevo';

    this.personaService.getGeneros().pipe(
      catchError((error) => {
        this.errorMessage = 'No se pudieron cargar los géneros.';
        console.error(error);
        return of([]);
      }),
    ).subscribe((generos) => {
      this.generos = generos;
    });

    this.personaService.getNacionalidades().pipe(
      catchError((error) => {
        this.errorMessage = 'No se pudieron cargar las nacionalidades.';
        console.error(error);
        return of([]);
      }),
    ).subscribe((nacionalidades) => {
      this.nacionalidades = nacionalidades;
    });

    this.personaService.getEquipos().pipe(
      catchError((error) => {
        this.errorMessage = 'No se pudieron cargar los equipos.';
        console.error(error);
        return of([]);
      }),
    ).subscribe((equipos) => {
      this.equipos = equipos;
    });

    this.personaService.getHobbies().pipe(
      catchError((error) => {
        this.errorMessage = 'No se pudieron cargar los hobbies.';
        console.error(error);
        return of([]);
      }),
    ).subscribe((hobbies) => {
      this.hobbies = hobbies;
    });

    const routeId = this.route.snapshot.paramMap.get('id');
    if (this.mode === 'nuevo' || routeId === 'nuevo') {
      this.mode = 'nuevo';
      this.resetForm(this.emptyPersona());
      this.loading = false;
    } else {
      const id = Number(routeId);
      this.mode = 'editar';
      this.personaService.getPersona(id).pipe(
        catchError((error) => {
          this.errorMessage = 'No se pudo cargar la persona.';
          console.error(error);
          return of(this.emptyPersona());
        }),
        finalize(() => {
          this.loading = false;
        }),
      ).subscribe((persona) => {
        this.resetForm(persona);
      });
    }
  }

  crearFormulario(): void {
    this.personaForm = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      generoId: [0, Validators.required],
      nacionalidadId: [0, Validators.required],
      equipoId: [0, Validators.required],
      hobbiesIds: this.fb.array([], Validators.required),
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],
      otrasActividades: [''],
    }, { validators: this.passwordsMatchValidator() });
  }

  resetForm(persona: PersonaResource): void {
    const hobbiesControl = this.personaForm.get('hobbiesIds') as FormArray;
    hobbiesControl.clear();

    persona.hobbiesIds.forEach((id) => {
      hobbiesControl.push(new FormControl(id));
    });

    this.personaForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      generoId: persona.generoId,
      nacionalidadId: persona.nacionalidadId,
      equipoId: persona.equipoId,
      fechaNacimiento: persona.fechaNacimiento,
      email: persona.email,
      password: persona.password,
      confirmarPassword: persona.password,
      otrasActividades: persona.otrasActividades,
    });
  }

  onHobbiesChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedValues = Array.from(select.selectedOptions).map((option) => Number(option.value));

    const hobbies = this.personaForm.get('hobbiesIds') as FormArray;
    hobbies.clear();

    selectedValues.forEach((hobbyId) => {
      hobbies.push(new FormControl(hobbyId));
    });
  }

  onHobbyChange(hobbyId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const hobbies = this.personaForm.get('hobbiesIds') as FormArray;
    const selectedIds = hobbies.value as number[];

    if (checkbox.checked && !selectedIds.includes(hobbyId)) {
      hobbies.push(new FormControl(hobbyId));
    } else if (!checkbox.checked) {
      const index = selectedIds.indexOf(hobbyId);
      if (index >= 0) {
        hobbies.removeAt(index);
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

  guardar(): void {
    if (this.personaForm.invalid) {
      this.personaForm.markAllAsTouched();
      this.errorMessage = 'Complete todos los campos requeridos.';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    const persona = this.personaForm.getRawValue() as PersonaResource;

    this.personaService.savePersona(persona).pipe(
      catchError((error) => {
        this.errorMessage = 'No se pudo guardar la persona.';
        console.error(error);
        return of([]);
      }),
      finalize(() => {
        this.loading = false;
      }),
    ).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  private emptyPersona(): PersonaResource {
    return {
      id: 0,
      nombre: '',
      apellido: '',
      generoId: 0,
      nacionalidadId: 0,
      equipoId: 0,
      hobbiesIds: [],
      fechaNacimiento: '',
      email: '',
      password: '',
      otrasActividades: '',
    };
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmarPassword = control.get('confirmarPassword')?.value;

      return password === confirmarPassword ? null : { passwordsMismatch: true };
    };
  }
}
