import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { LaundryMap } from '../pages/map/map.component';
import { ProfileComponent } from '../pages/profile/profile';
import { NotificationComponent } from '../pages/notifications/notifications';
import { RatesListComponent } from '../pages/rates-list/rates-list'
import { SignInPage } from '../pages/sign-in/sign-in'
import { OrdersHistoryPage } from '../pages/orders-history/orders-history';
import { ComplaintsSuggestionsPage } from '../pages/complaints-suggestions/complaints-suggestions';
import { PaymentMethodsPage } from '../pages/payment-methods/payment-methods';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
@Component({
  templateUrl: 'app.html',
  providers: [Storage, JwtHelper]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any; //= SignInPage;

  pages: Array<{title: string, component: any}>;
  constructor(public platform: Platform, 
              private storage: Storage,
              private jwtHelper: JwtHelper) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    this.pages = [      
      { title: 'Home', component: OrdersHistoryPage },
      { title: 'Profile', component: ProfileComponent },
      { title: 'Payment Method', component: PaymentMethodsPage },
      { title: 'Rates List', component: RatesListComponent },
      { title: 'Notifications', component: NotificationComponent },
      { title: 'Complaints and Suggestions', component: ComplaintsSuggestionsPage },
      { title: 'ForgotPassword', component: ForgotPasswordPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('x-access-token').then(
        token =>{
          console.log(token);
          if(!!token){
            localStorage.setItem('x-access-token', token);
            localStorage.setItem('userID', this.jwtHelper.decodeToken(token)['_id']);
            console.log(localStorage.getItem('userID'), 'at App component \n',
                        localStorage.getItem('x-access-token')
                        );

            console.log('Got token.', token);
            this.rootPage = ForgotPasswordPage;  
          }else{
            this.rootPage = ForgotPasswordPage
            console.log('Authentication failed.');
          }
        },
        error => {
          console.log(error);
        }
      );
      Splashscreen.hide();
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
