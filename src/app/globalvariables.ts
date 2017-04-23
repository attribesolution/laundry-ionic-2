export const globalVars =  {
    // BaseURL: "http://localhost:3000", 
    BaseURL: "http://192.168.0.108:3000",
    // BaseURL: "http://stage.dmenu.co:3005",
    
    LaundryitemsURL: "/api/v1/laundryItems",
    getLaundryitemsApiURL(){
        return ((this.BaseURL + this.LaundryitemsURL) as string);
    },
    laundryURL:"/laundryItems",
    patchLaundryitemsApiURL(orderID){
        return ((this.BaseURL + this.OrderURL + orderID +this.laundryURL) as string);
    },
    PreGenURL: "pregen/order/user/",
    PreGenApiURL(userID){
        return this.BaseURL + this.OrderURL + this.PreGenURL + userID;
    },
    OrderURL: "/api/v1/orders/",
    getOrderByIdURL(orderID){
        return this.BaseURL + this.OrderURL + orderID;
    },
    ServicesURL: "/service",
    ServicesApiURL(orderID){
        return this.BaseURL + this.OrderURL + orderID + this.ServicesURL;
    },
    PickupURL: "/pickup",
    patchPickupApiURL(orderID){
        return this.BaseURL + this.OrderURL + orderID + this.PickupURL;
    },
    DropOffURL: "/dropoff",
    patchDropOffApiURL(orderID){
        return this.BaseURL + this.OrderURL + orderID + this.DropOffURL;
    },
    CareInstructionsURL: "/instructions",
    patchCareInstructionsURL(orderID){
        return this.BaseURL + this.OrderURL + orderID + this.CareInstructionsURL;
    },
    AllUsers: "/api/v1/users/",
    SignUp: "/api/v1/user/signup",
    PostNewUser(){
        return ((this.BaseURL + this.SignUp as string));
    },
    UsersURL: 'user/',
    getOrdersHistoryURL(userID: string){
        return this.BaseURL + this.OrderURL + this.UsersURL + userID;
    },
    UsersAddressURL: '/address',
    UserAddress(userID: string){
        return this.BaseURL + this.AllUsers  +  userID + this.UsersAddressURL;
    },
    getUsersAddress(userID: string){
        return this.BaseURL + this.AllUsers  + userID +  '/addresses';
    },
    ComplainUrl:'/complain',
    PatchComplainURL(userID){
        return this.BaseURL + this.AllUsers + '/' + userID + this.ComplainUrl; 
    },
    getComplainsURL(userID){
        return this.BaseURL + this.AllUsers + '/' + userID + this.ComplainUrl + 's';
    },
    NotificationURL: '/notificationSettings',
    NotificationSettingsURL(userID){
        return this.BaseURL + this.AllUsers + '/' + userID + this.NotificationURL;
    },
    SignInURL: '/api/v1/auth/local',
    PostSignInApi(){
        return (this.BaseURL + this.SignInURL as string);
    },
    forgorPasswordURL: '/password/forgot',
    getForgotPasswordAPIURL(userID){
        return this.BaseURL + this.AllUsers + userID + this.forgorPasswordURL;
    },
    profileURL: '/profile',
    profileAPIURL(userID){
        return this.BaseURL + this.AllUsers + userID + this.profileURL;
    },
    statusURL: '/statuslist',
    statusAPIURL(){
        return this.BaseURL + this.OrderURL + this.statusURL;
    }
}
