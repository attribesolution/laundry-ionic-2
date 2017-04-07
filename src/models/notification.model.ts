interface  NotificationSettingData{ 
    settings: {
       generalNotification: boolean,
       orderNotification: boolean,
       emailNotification: boolean,
       promoNotification: boolean
     }

}

export interface NotificationModel{
 href : string,
 data : NotificationSettingData
}