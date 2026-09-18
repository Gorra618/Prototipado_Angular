import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IResourceRequest } from '@ngx-resource/core';
import { ResourceHandlerHttpClient } from '@ngx-resource/handler-ngx-http';

import { MemoryDataService } from '../../mocks/memory-data.service';

@Injectable()
export class AppResourceHandler extends ResourceHandlerHttpClient {
  constructor(
    http: HttpClient,
    private readonly db: MemoryDataService,
    private readonly router: Router,
  ) {
    super(http);
  }

  override prepareRequest(request: IResourceRequest): HttpRequest<unknown> {
    return super.prepareRequest(request);
  }
}
