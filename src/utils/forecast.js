const request = require('request');

const forecast = (latitude, longtitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/86994770cacd239296eec7555b88a375/'+encodeURIComponent(latitude)+','+encodeURIComponent(longtitude)+'?lang=en'
    
    request({url, json:true}, (error, {body}) => {
        if(error){
                callback('Unable to connnect to weather service', undefined);
            }else if(body.error){
                callback('Unable to find location', undefined);
            }else{
                callback(undefined, body.daily.data[0].summary + ' Its currently '+ body.currently.apparentTemperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain');
            }
    })
    
}

module.exports = forecast