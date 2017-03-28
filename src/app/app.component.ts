import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';
import { LaundryMap } from '../pages/map/map.component';
import { ProfileComponent } from '../pages/profile/profile';
import { NotificationComponent } from '../pages/notifications/notifications';
import { RatesListComponent } from '../pages/rates-list/rates-list'
import { SignInPage } from '../pages/sign-in/sign-in'
import { OrdersHistoryPage } from '../pages/orders-history/orders-history';
import { ComplaintsSuggestionsPage } from '../pages/complaints-suggestions/complaints-suggestions';
import { FBSignInPage } from '../pages/fb-sign-in/fb-sign-in';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInPage;

  pages: Array<{title: string, component: any}>;
  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    this.pages = [      
      { title: 'Home', component: LaundryMap },
      { title: 'Profile', component: ProfileComponent },
      { title: 'Payment Method', component: LaundryMap },
      { title: 'Order History', component: OrdersHistoryPage },
      { title: 'Rates List', component: RatesListComponent },
      { title: 'Notifications', component: NotificationComponent },
      { title: 'Complaints and Suggestions', component: ComplaintsSuggestionsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //Facebook Login
      let env = this;
      NativeStorage.getItem('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        env.nav.push(OrdersHistoryPage);
        Splashscreen.hide();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.nav.push(FBSignInPage);
        Splashscreen.hide();
      });

      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
