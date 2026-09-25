import { Injectable } from '@angular/core';
import type { IResourceMethodObservable } from '@ngx-resource/core';
import {
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod,
} from '@ngx-resource/core';

import {
  EquipoResource,
  GeneroResource,
  HobbyResource,
  NacionalidadResource,
} from '../../resources/domain.model';

@Injectable({ providedIn: 'root' })
@ResourceParams({ pathPrefix: '/api/generos' })
export class GeneroApiResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ path: '/', method: ResourceRequestMethod.Get })
  declare getAll: IResourceMethodObservable<undefined, GeneroResource[]>;
}

@Injectable({ providedIn: 'root' })
@ResourceParams({ pathPrefix: '/api/nacionalidades' })
export class NacionalidadApiResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ path: '/', method: ResourceRequestMethod.Get })
  declare getAll: IResourceMethodObservable<undefined, NacionalidadResource[]>;
}

@Injectable({ providedIn: 'root' })
@ResourceParams({ pathPrefix: '/api/equipos' })
export class EquipoApiResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ path: '/', method: ResourceRequestMethod.Get })
  declare getAll: IResourceMethodObservable<undefined, EquipoResource[]>;
}

@Injectable({ providedIn: 'root' })
@ResourceParams({ pathPrefix: '/api/hobbies' })
export class HobbyApiResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ path: '/', method: ResourceRequestMethod.Get })
  declare getAll: IResourceMethodObservable<undefined, HobbyResource[]>;
}