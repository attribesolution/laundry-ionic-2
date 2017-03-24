export const globalVars =  {

    BaseURL: "http://stage.dmenu.co:3005",        //192.168.1.104

    LaundryitemsURL: "/api/v1/laundryItems",
    getLaundryitemsApiURL(){
        return ((this.BaseURL + this.LaundryitemsURL) as string);
    },
    laundryURL:"/laundryItems",
    patchLaundryitemsApiURL(orderID){
        return ((this.BaseURL + this.OrderURL+orderID+this.laundryURL) as string);
    },
    PreGenURL: "pregen/order",
    PreGenApiURL(){
        return this.BaseURL + this.OrderURL + this.PreGenURL;
    },
    OrderURL: "/api/v1/orders/",
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
    AllUsers: "/api/v1/users",
    PostNewUser(){
        return ((this.BaseURL + this.AllUsers as string));
    },
    UsersURL: 'user/',
    getOrdersHistoryURL(userID: string){
        return this.BaseURL + this.OrderURL + this.UsersURL + userID;
    }
}
