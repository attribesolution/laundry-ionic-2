import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { LaundryMap } from '../pages/map/map.component';
import { OrderPlaced } from '../pages/order-placed/order-placed';
import { CareInstructions } from '../pages/care-instructions/care-instructions';
import { DropOffDetails } from '../pages/drop-off-details/drop-off-details'
import { ServicesPage } from '../pages/services/services';
import { LaundryItems } from '../pages/laundryitems/laundryitems';
import { AdditionalInfoModal } from '../pages/modals/additional-info-modal/additional-info-modal.component';
import { PickUpDetails } from '../pages/pick-up-details/pick-up-details'
import { AdditionalNote } from '../pages/modals/additional-note/additional-note'
import { ProfileComponent } from '../pages/profile/profile'
import { NotificationComponent } from '../pages/notifications/notifications';
import { RatesListComponent } from '../pages/rates-list/rates-list';
import { SignInPage } from '../pages/sign-in/sign-in'
import { SignUpPage } from '../pages/sign-up/sign-up';
import { OrdersHistoryPage } from '../pages/orders-history/orders-history';
@NgModule({
  declarations: [
    MyApp,
    LaundryMap,
    OrderPlaced,
    CareInstructions,
    DropOffDetails,
    ServicesPage,
    LaundryItems,
    AdditionalInfoModal,
    PickUpDetails,
    AdditionalNote,
    ProfileComponent,
    NotificationComponent,
    RatesListComponent,
    SignInPage,
    SignUpPage,
    OrdersHistoryPage
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClwzFHgEdw9cmOYtKmGcvyTEN3nK4gXiY'
    }),
    IonicModule.forRoot(MyApp),
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
    AdditionalInfoModal,
    PickUpDetails,
    AdditionalNote,
    ProfileComponent,
    NotificationComponent,
    RatesListComponent,
    SignInPage,
    SignUpPage,
    OrdersHistoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
