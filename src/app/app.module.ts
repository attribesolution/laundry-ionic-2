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
import {AdditionalInfoModal} from '../pages/modals/additional-info-modal/additional-info-modal.component';
@NgModule({
  declarations: [
    MyApp,
    LaundryMap,
    OrderPlaced,
    CareInstructions,
    DropOffDetails,
    ServicesPage,
    LaundryItems,
    AdditionalInfoModal
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
    AdditionalInfoModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
