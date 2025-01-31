# AuthAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




import { ErrorHandler, InjectionToken, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ServiceWorkerModule } from '@angular/service-worker';


// MATERIAL MODULES
// ======----------------------============---------------===========------------====================---------------
//-----------------=============---------===========---------------===============-----------------===============----
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatCommonModule, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetModule } from '@angular/material/bottom-sheet';
// ======----------------------============---------------===========------------====================---------------
//-----------------=============---------===========---------------===============-----------------===============----
import { GlobalErrorHandlerService } from './SERVICES/FIREBASE-SERVICES/global-error-handler.service';
import { PopNotificationComponent } from './POPUP-COMPONENTS/pop-notification/pop-notification.component';
import { LoginComponent } from './BASE-COMPONENTS/login/login.component';
import { ForgotPasswordComponent } from './BASE-COMPONENTS/forgot-password/forgot-password.component';
import { PopAbsentNoonComponent } from './POPUP-COMPONENTS/pop-absent-noon/pop-absent-noon.component';
import { BaseChartDirective, provideCharts, ThemeService, withDefaultRegisterables } from 'ng2-charts';
import { ToggleThemeDirective } from './SERVICES/FIREBASE-SERVICES/toggle-theme.directive';
import { SettingsComponent } from './POPUP-COMPONENTS/settings/settings.component';
import { DeleteUserPoupComponent } from './BASE-COMPONENTS/delete-user-poup/delete-user-poup.component';
import { ConfirmationDialogComponent } from './POPUP-COMPONENTS/confirmation-dialog/confirmation-dialog.component';
import { AttendancePoupComponent } from './POPUP-COMPONENTS/attendance-poup/attendance-poup.component';
import { MessageComponentComponent } from './POPUP-COMPONENTS/message-component/message-component.component';
import { AuthService } from './SERVICES/AUTH-SERVICE/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacultyRoleComponent } from './POPUP-COMPONENTS/faculty-role/faculty-role.component';
import { ProgressCardComponent } from './POPUP-COMPONENTS/progress-card/progress-card.component';
import { ProfileComponent } from './BASE-COMPONENTS/profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './SERVICES/FIREBASE-SERVICES/httperrorinteceptor';
import { LoadingComponent } from './BASE-COMPONENTS/loading/loading.component';
import { LogUpdateService, CheckForUpdateService, PromptUpdateService, HandleUnrecoverableStateService } from './SERVICES/UTILITY/update.service';
import { interval } from 'rxjs';
import { LeaveLetterComponent } from './BASE-COMPONENTS/leave-letter/leave-letter.component';
import { FooterComponent } from './BASE-COMPONENTS/footer/footer.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserManuelComponent } from './BASE-COMPONENTS/user-manuel/user-manuel.component';
import { ArtsEventComponent } from './BASE-COMPONENTS/arts-event/arts-event.component';
import { QrCodeScannerComponent } from './BASE-COMPONENTS/qr-code-scanner/qr-code-scanner.component';


import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { QrCodeGeneratorComponent } from './BASE-COMPONENTS/qr-code-generator/qr-code-generator.component';
import { QRCodeModule } from 'angularx-qrcode';
LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();
export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export const SECONDARY_APP = new InjectionToken<FirebaseApp>('secondary');


@NgModule({
  declarations: [
    AppComponent,
    PopNotificationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ToggleThemeDirective,
    SettingsComponent,
    DeleteUserPoupComponent,
    ConfirmationDialogComponent,
    AttendancePoupComponent,
    MessageComponentComponent,
    FacultyRoleComponent,
    ProgressCardComponent,
    ProfileComponent,
    LoadingComponent,
    LeaveLetterComponent,
    FooterComponent,
    UserManuelComponent,
    ArtsEventComponent,
    QrCodeScannerComponent,
    QrCodeGeneratorComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Angular Material modules
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatBadgeModule,
    MatStepperModule,
    MatSortModule,
    MatAutocompleteModule,
    TextFieldModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    BaseChartDirective,
    MatBottomSheetModule,
    MatChipsModule,
    CdkAccordionModule,
    MatExpansionModule,
    HttpClientModule,
    NgxScannerQrcodeModule,
    QRCodeModule,
    //////////////////////////
    PopAbsentNoonComponent,

    //////////////////////    ToggleThemeDirective,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
      registrationStrategy: () => interval(10000)
      // registrationStrategy: 'registerImmediately'
    }),
  ],
  providers: [ThemeService, AuthService,
    LogUpdateService,
    CheckForUpdateService,
    PromptUpdateService,
    HandleUnrecoverableStateService,
    provideAnimationsAsync(), provideNativeDateAdapter(),
    provideFirebaseApp(() => initializeApp({ "projectId": "jdt-portal", "appId": "1:472261696902:web:01d1d61e42c7c0c0cd6007", "storageBucket": "jdt-portal.appspot.com", "apiKey": "AIzaSyDwNHKgPowdljmrzXCxPKFKoEkg5lf9iuE", "authDomain": "jdt-portal.firebaseapp.com", "messagingSenderId": "472261696902", "measurementId": "G-16Y116L2GQ" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),

    provideCharts(withDefaultRegisterables()),
    { provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },

    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Set locale for DD/MM/YYYY format
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: FIREBASE_OPTIONS, useValue: { "projectId": "jdt-portal", "appId": "1:472261696902:web:01d1d61e42c7c0c0cd6007", "storageBucket": "jdt-portal.appspot.com", "apiKey": "AIzaSyDwNHKgPowdljmrzXCxPKFKoEkg5lf9iuE", "authDomain": "jdt-portal.firebaseapp.com", "messagingSenderId": "472261696902", "measurementId": "G-16Y116L2GQ" } },

    provideFirebaseApp(() => initializeApp(environment.firebaseSecondary, 'secondary')),
    provideFirestore(() => getFirestore(), { appName: 'secondary' }),
    provideStorage(() => getStorage(), { appName: 'secondary' }),
    { provide: SECONDARY_APP, useFactory: () => initializeApp(environment.firebaseSecondary, 'secondary') }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private afAuth: AngularFireAuth,) {
    this.afAuth.setPersistence('local'); // 'local', 'session', or 'none'
    this.clearCache();
  }
  clearCache(): void {
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        console.log(cacheNames)
        cacheNames.forEach((cacheName) => {
          console.log(cacheName)
          caches.delete(cacheName);
        });
        console.log(cacheNames)

        console.log('Cache cleared!');
      }).catch((err) => {
        console.error('Error clearing cache:', err);
      });
    } else {
      console.log('Cache API not supported in this browser.');
    }
  }
}
export const environment = {
  firebaseSecondary: {
    projectId: 'jdtpoly-399dc',
    appId: '1:508853288713:web:025513802d4ee5d1c51dd8',
    databaseURL: 'https://jdtpoly-399dc-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'jdtpoly-399dc.appspot.com',
    apiKey: 'AIzaSyDlIw7XSv4G70Pct3t12WNLBQgoS1Gi0jU',
    authDomain: 'jdtpoly-399dc.firebaseapp.com',
    messagingSenderId: '508853288713',
    measurementId: 'G-HTBE1QC8LV',
  },

};


