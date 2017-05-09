interface OrderData{
    details: {
        eta: string,
        status: Object,
        id: string
    }
}

export interface OrderModel{
    href: string,
    data: [{
        data: OrderData
    }]
}