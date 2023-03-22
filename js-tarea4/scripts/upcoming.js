
let urlapi = "https://mindhub-xj03.onrender.com/api/amazing";

async function getData() {

  try {
    const res = await fetch(urlapi);
    const datos = await res.json();
    
    gereraInfo(datos)

  } catch (error) {
    console.log(error);
  }

}

getData();


function gereraInfo(data) {

  let eventosProximos = ArrayUpcoming(data)
 
  GeneratListEvent(eventosProximos);

  let cat = categorias(data.events);

  GeneraListCheckbox(cat);

  let checkboxButtons = document.querySelectorAll("input[type=checkbox]")
  checkboxButtons.forEach(checkbox => checkbox.addEventListener("change", () => BuscaSeleccion(eventosProximos)));

  const inputBuscador = document.getElementById('buscador');
  inputBuscador.addEventListener("input", () => buscador(eventosProximos, inputBuscador.value))

}


// GENERA EL ARREGLO DE EVENTOS PASADOS 
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












