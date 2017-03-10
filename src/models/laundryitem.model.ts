
interface LaundryItemData { 
    object_id: string, 
    name: string,
    icon: string,
    rate: {
        wash: number,
        dryclean: number
    }

}

export interface LaundryItemModel{
 href : string,
 data : Array<LaundryItemData>
}