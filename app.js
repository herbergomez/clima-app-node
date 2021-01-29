const lugar = require('./lugares/lugares');
const clima = require('./clima/clima')
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;
/** 
lugar.getLugarLatLng(argv.direccion).then(resp => {
    console.log(resp);
});

clima.getClima(35, 139).then(resp => {
    console.log(resp);
}).catch(err => {
    console.log("Error:", err);
});**/

const getInfo = async(pos) => {
    const lug = await lugar.getLugarLatLng(argv.direccion);
    if (lug != null) {
        //  console.log(lug);
        const c = await clima.getClima(lug.lat, lug.lng)
        if (c != null) {
            const objReturn = {
                dir: lug.direccion,
                temp: c
            }
            return objReturn;
        } else {
            return new Error(`No se pudo determinar el clima de ${lug.direccion}`)
        }
    } else {
        return new Error(`No se pudo encontrar la posicion ${pos}`)
    }

}

getInfo(argv.direccion).then(resp => {
    console.log(`El clima de ${resp.dir} es de ${resp.temp}`);
}).catch(err => {
    console.log(err);
});