let urlapi = "https://mindhub-xj03.onrender.com/api/amazing";

async function getData() {

    try {
        const res = await fetch(urlapi);
        const datos = await res.json();

        gereratabla(datos)

    } catch (error) {
        console.log(error);
    }

}
getData();

function gereratabla(datos) {
    const eventos = datos.events;
    const porcXeven = porcentajeDeAsistenciaXevento(eventos);
    
    const mayorPorcentaje = isMayor(porcXeven);
    const menorPorcentaje = isMenor(porcXeven);
    const mayorCapacidad = isMayorCapacidad(eventos);

    generaInfoMayor(mayorPorcentaje, porcXeven);
    generaInfoMenor(menorPorcentaje, porcXeven);
    generaMayorCapacidad(mayorCapacidad, 'xMC');

    const passEvents = ArrayPass(datos);
    const upcomingEvents = ArrayUpcoming(datos);

    eventXCategoria(passEvents, categorias(eventos), 'Events-past');
    eventXCategoria(upcomingEvents, categorias(eventos), 'Events-upcoming')


}

//genera los tr y td en la tabla correspondiente
function eventXCategoria(array, categorias, id) {

    let tbody = document.getElementById(id);
    let fragment = document.createDocumentFragment();

    categorias.forEach(cat => {
        let eventosSegunCategoria = eventosAgrupados(cat, array);
        
        let gananciasXcategoria = calculaGanancia(eventosSegunCategoria);

        let porcentajeAsistenciaCategoria = calculaPorcentaje(eventosSegunCategoria);

        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        td1.textContent = cat;

        let td2 = document.createElement('td');
        td2.textContent = '$ ' + gananciasXcategoria;

        let td3 = document.createElement('td');
        td3.textContent = porcentajeAsistenciaCategoria + ' %';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        fragment.appendChild(tr);
    })
    tbody.appendChild(fragment);
}


function calculaPorcentaje(eventosSegunCategoria) {
    let porcentajePromedio = 0;
    let suma = 0;
    let cant = 0;
    if (eventosSegunCategoria.length) {
        eventosSegunCategoria.forEach(elemento => {

            if (elemento.assistance) {
                let result = (elemento.assistance * 100) / elemento.capacity;
                if (!isNaN(result)) {
                    suma = suma + result;
                    cant = cant + 1;
                }
            }
            else {
                if (elemento.estimate) {
                    let result = (elemento.estimate * 100) / elemento.capacity;
                    if (!isNaN(result)) {
                        suma = suma + result;
                        cant = cant + 1;
                    }
                }
            }
        });
    } else {
        return 0;
    }
    porcentajePromedio = suma / cant
    return porcentajePromedio.toFixed(2);

}

function calculaGanancia(eventosSegunCategoria) {
    let ganancia = 0;
    if (eventosSegunCategoria) {
        eventosSegunCategoria.forEach(elemento => {
            if (elemento.assistance) {
                let result = (elemento.assistance) * elemento.price;
                if (!isNaN(result)) {
                    ganancia = ganancia + result;
                }
            } else {
                if (elemento.estimate) {
                    let result = (elemento.estimate) * elemento.price;
                    if (!isNaN(result)) {
                        ganancia = ganancia + result;
                    }
                }
            }
        });
    } else {
        return 0;
    }

    return ganancia
}

function eventosAgrupados(cat, array) {

    let eventos = array.filter(elemento => elemento.category == cat);
    return eventos
}


function generaMayorCapacidad(evento, clase) {
    let tr = document.getElementById(clase);
    tr.innerHTML += `
    <td>${evento.name}</td>
    <td>${evento.category}</td>
    <td>${evento.capacity}</td>
    <td> 0 % </td>
    `
}

function generaInfoMenor(menorPorcentaje, porcXeven) {
    const indice = menorPorcentaje.indiceMenor;
    const eve = porcXeven[indice][0];
    tableDato(eve, menorPorcentaje.menor, 'xmP');
}

function generaInfoMayor(mayorPorcentaje, porcXeven) {
    const indice = mayorPorcentaje.indiceMayor;
    const eve = porcXeven[indice][0];
    tableDato(eve, mayorPorcentaje.mayor, 'xMP');
}

function tableDato(evento, porcentaje, clase) {
    let tr = document.getElementById(clase);
    tr.innerHTML += `
    <td>${evento.name}</td>
    <td>${evento.category}</td>
    <td>${evento.capacity}</td>
    <td>${porcentaje} %</td>
    `
}


function isMayorCapacidad(evento) {
    let mayor = 0;
    let indice = 0;
    let eventMayorcapacidad = 0
    evento.forEach(array => {

        if (mayor <= array.capacity) {
            mayor = array.capacity;
            eventMayorcapacidad = array
        }

    });
    return eventMayorcapacidad
}

function isMenor(porcentajeXevento) {
    let menor = 120;
    let indice = 0;
    let indiceMenor = 0
    porcentajeXevento.forEach(array => {

        if (menor >= array[1]) {
            menor = array[1];
            indiceMenor = indice;
        }
        indice++;
    });
    return { menor, indiceMenor }
}


function isMayor(porcentajeXevento) {
    let mayor = 0;
    let indice = 0;
    let indiceMayor = 0
    porcentajeXevento.forEach(array => {

        if (mayor <= array[1]) {
            mayor = array[1];
            indiceMayor = indice;
        }
        indice++;
    });
    return { mayor, indiceMayor }
}


function porcentajeDeAsistenciaXevento(eventos) {
    // me devuelve un array de evento y porcentaje 
    let eventoPorcentaje = [];
    eventos.forEach(even => {
        let result = (even.assistance * 100) / even.capacity;
        if (!isNaN(result)) {
            let porcentaje = result.toFixed(2);
            eventoPorcentaje.push([even, porcentaje]);
        }
    });
    return eventoPorcentaje;
}


function ArrayPass(data) {
    let eventosPasados = [];
    let f1 = new Date(data.currentDate);
    for (const even of data.events) {
        let f2 = new Date(even.date);
        if (f1 > f2) {
            eventosPasados.push(even);
        }
    }
    return eventosPasados;
}

function ArrayUpcoming(data) {

    let eventosProximos = [];

    let f1 = new Date(data.currentDate);
    for (const even of data.events) {
        let f2 = new Date(even.date);
        if (f1 < f2) {
            eventosProximos.push(even);
        }
    }

    return eventosProximos;
}

function categorias(params) {
    let cat = [];
    params.forEach(evn => { cat.push(evn.category) })

    let categorias = cat.filter((item, index) => {
        return cat.indexOf(item) === index;
    })
    return categorias;
}
