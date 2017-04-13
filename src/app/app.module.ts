import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { MyApp } from './app.component';
import { LaundryMap } from '../pages/map/map.component';
import { OrderPlaced } from '../pages/order-placed/order-placed';
import { CareInstructions } from '../pages/care-instructions/care-instructions';
import { DropOffDetails } from '../pages/drop-off-details/drop-off-details'
import { ServicesPage } from '../pages/services/services';
import { LaundryItems } from '../pages/laundryitems/laundryitems';
import { SavedLocations } from '../pages/modals/saved-locations/saved-locations';
import { PickUpDetails } from '../pages/pick-up-details/pick-up-details'
import { AdditionalNote } from '../pages/modals/additional-note/additional-note'
import { ProfileComponent } from '../pages/profile/profile'
import { NotificationComponent } from '../pages/notifications/notifications';
import { RatesListComponent } from '../pages/rates-list/rates-list';
import { SignInPage } from '../pages/sign-in/sign-in'
import { SignUpPage } from '../pages/sign-up/sign-up';
import { OrdersHistoryPage } from '../pages/orders-history/orders-history';
import { ComplaintsSuggestionsPage } from '../pages/complaints-suggestions/complaints-suggestions';
import { PaymentMethodsPage } from '../pages/payment-methods/payment-methods';
import { OrderSummaryPage } from '../pages/order-summary/order-summary';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
let storage: Storage;

export function getAuthHttp(http){
  let authConfig: AuthConfig = new AuthConfig({
    headerPrefix: 'Autherization',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('x-access-token'))
  });
  return new AuthHttp(authConfig, http)
}

@NgModule({
  declarations: [
    MyApp,
    LaundryMap,
    OrderPlaced,
    CareInstructions,
    DropOffDetails,
    ServicesPage,
    LaundryItems,
    SavedLocations,
    PickUpDetails,
    AdditionalNote,
    ProfileComponent,
    NotificationComponent,
    RatesListComponent,
    SignInPage,
    SignUpPage,
    OrdersHistoryPage,
    ComplaintsSuggestionsPage,
    PaymentMethodsPage,
    OrderSummaryPage,
    ForgotPasswordPage
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClwzFHgEdw9cmOYtKmGcvyTEN3nK4gXiY'
    }),
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LaundryMap,
    OrderPlaced,
    CareInstructions,
    DropOffDetails,
    ServicesPage,
    LaundryItems,
    SavedLocations,
    PickUpDetails,
    AdditionalNote,
    ProfileComponent,
    NotificationComponent,
    RatesListComponent,
    SignInPage,
    SignUpPage,
    OrdersHistoryPage,
    ComplaintsSuggestionsPage,
    PaymentMethodsPage,
    OrderSummaryPage,
    ForgotPasswordPage
  ],
  providers: [{
    provide: ErrorHandler, 
    useClass: IonicErrorHandler
  },
  {
    provide: AuthHttp,
    useFactory: getAuthHttp,
    deps: [Http]

  }]
})
export class AppModule {}
