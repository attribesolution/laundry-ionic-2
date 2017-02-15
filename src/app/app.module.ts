import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ProfileComponent } from '../pages/profile/profile';
import { PlaceOrderModule } from '../place-order/place-order.module';
import { LaundryMap } from '../pages/map/map.component'
@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    ProfileComponent,
    LaundryMap
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    PlaceOrderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    ProfileComponent,
    LaundryMap
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
