/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/



class BaseResponse{
    constructor(httpCode, message, data){
        this.httpCode= httpCode;
        this.message= message;
        this.data = data;
    }

    toObject(){
        return {
            'message': this.message,
            'httpCode': this.httpCode,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }
}

module.exports= BaseResponse;