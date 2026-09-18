import { Routes } from '@angular/router';

import { ListadoPersonasComponent } from './components/listado-personas/listado-personas';
import { PersonaFormularioComponent } from './components/persona-formulario/persona-formulario';

export const routes: Routes = [
  {
    path: '',
    component: ListadoPersonasComponent,
    pathMatch: 'full',
  },
  {
    path: 'persona-formulario/nuevo',
    component: PersonaFormularioComponent,
    data: { mode: 'nuevo' },
  },
  {
    path: 'persona-formulario/:id',
    component: PersonaFormularioComponent,
    data: { mode: 'editar' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
