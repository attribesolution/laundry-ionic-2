export const globalVars =  {
    BaseURL: "http://localhost:3000",
    LaundryitemsURL: "/api/v1/laundryItems",
    getLaundryitemsApiURL(){
        return ((this.BaseURL + this.LaundryitemsURL) as string);
    },
    laundryURL:"/laundryItems",
    patchLaundryitemsApiURL(orderID){
        return ((this.BaseURL + this.OrderURL+"/"+orderID+this.laundryURL) as string);
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
