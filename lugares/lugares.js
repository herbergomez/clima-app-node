const axios = require('axios');

const getLugarLatLng = async(posicion) => {
    const instance = axios.create({
        baseURL: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        headers: {
            'x-rapidapi-key': '2a47acc336mshc8c87d8bcddaf16p14fdeejsnea9ec1c6d12e',
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
    });

    const resp = await instance.get();

    if (resp.data.data.length === 0) {
        throw new Error('No hay resultados.')
    }
    if (resp.data.data.length < posicion) {
        throw new Error(`No hay resultados para la posicion ${posicion}.`)
    }
    const obj = resp.data.data[posicion];
    return {
        direccion: obj.name,
        lat: obj.latitude,
        lng: obj.longitude
    }
}
module.exports = {
    getLugarLatLng
}