interface LaundryItemData { 
    object_id: string, 
    name: string,
    icon: string,
    rate: {
        wash: number,
        dryclean: number
    },
    "x-access-token": string

}

export interface LaundryItemModel{
 href : string,
 data : Array<LaundryItemData>
}