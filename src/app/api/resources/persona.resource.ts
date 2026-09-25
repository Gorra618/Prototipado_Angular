import { Injectable } from '@angular/core';
import type { IResourceMethodObservable } from '@ngx-resource/core';
import {
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod,
} from '@ngx-resource/core';

import { PersonaResource } from '../../resources/domain.model';

@Injectable({ providedIn: 'root' })
@ResourceParams({ pathPrefix: '/api/personas' })
export class PersonaApiResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ path: '/listado', method: ResourceRequestMethod.Get })
  declare getAll: IResourceMethodObservable<undefined, PersonaResource[]>;

  @ResourceAction({ path: '/persona/{!id}', method: ResourceRequestMethod.Get })
  declare getById: IResourceMethodObservable<{ id: number }, PersonaResource>;

  @ResourceAction({ path: '/persona', method: ResourceRequestMethod.Post })
  declare create: IResourceMethodObservable<PersonaResource, PersonaResource>;

  @ResourceAction({ path: '/persona/{!id}', method: ResourceRequestMethod.Put })
  declare update: IResourceMethodObservable<PersonaResource, PersonaResource>;

  @ResourceAction({ path: '/persona/{!id}', method: ResourceRequestMethod.Delete })
  declare delete: IResourceMethodObservable<{ id: number }, void>;
}