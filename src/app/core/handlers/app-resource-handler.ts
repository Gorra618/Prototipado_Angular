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
    const url = request.url?.replace(/^\//, '');
    const mappedUrl = this.db.getMappingUrl(url);
    const preparedRequest = super.prepareRequest(request);

    if (!mappedUrl) {
      return preparedRequest;
    }

    return preparedRequest.clone({
      url: preparedRequest.url.replace(url ?? '', mappedUrl),
    });
  }
}
