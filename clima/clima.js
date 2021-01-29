const axios = require('axios');

const getClima = async(lat, lng) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=ee7529964d7c0d8aa502110a365e2d49&units=metric`);
    if (resp != null && resp.data.main != null) {
        return resp.data.main.temp
    }
    return new Error(`Error al obtener la temperatura de la latitud ${lat} y longitud ${lng}`)

}


module.exports = {
    getClima
}