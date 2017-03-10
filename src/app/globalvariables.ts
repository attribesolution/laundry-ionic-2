export const globalVars =  {
    BaseURL: "http://localhost:3000",
    LaundryitemsURL: "/api/v1/laundryItems",
    LaundryitemsApiURL(){
        return ((this.BaseURL + this.LaundryitemsURL) as String);
    },
    PreGenURL: "/pregen/order",
    PreGenApiURL(){
        return this.BaseURL + this.OrderURL + this.PreGenURL;
    },
    OrderURL: "/api/v1/orders",
    ServicesURL: "/pickup",
    ServicesApiURL(orderID){
        return this.BaseURL + this.OrderURL + orderID + this.ServicesURL;
    }
}
