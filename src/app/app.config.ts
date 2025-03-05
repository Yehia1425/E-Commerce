import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');

}
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withViewTransitions() , withHashLocation() ,withViewTransitions() , withInMemoryScrolling({scrollPositionRestoration:"top"})), provideClientHydration(withEventReplay()),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorInterceptor,loadingInterceptor])),
      provideAnimations(),
     provideToastr(),
    importProvidersFrom(NgxSpinnerModule,TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,useFactory:HttpLoaderFactory,deps:[HttpClient]
      }
    }))],

};
