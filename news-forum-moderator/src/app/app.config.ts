import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

import { provideAnimations } from '@angular/platform-browser/animations';
import { FeatherModule } from 'angular-feather';

import { allIcons } from 'angular-feather/icons';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(FeatherModule.pick(allIcons)),
    provideStore(),
  ],
};
