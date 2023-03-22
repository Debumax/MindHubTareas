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

  let eventosPasados = ArrayPass(data);

  GeneratListEvent(eventosPasados);

  let cat = categorias(data.events);

  GeneraListCheckbox(cat);

  let checkboxButtons = document.querySelectorAll("input[type=checkbox]")
  checkboxButtons.forEach(checkbox => checkbox.addEventListener("change", () => BuscaSeleccion(eventosPasados)));

  const inputBuscador = document.getElementById('buscador');
  inputBuscador.addEventListener("input", () => buscador(eventosPasados, inputBuscador.value))

}

// GENERA EL ARREGLO DE EVENTOS PASADOS 
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


function categorias(params) {
  let cat = [];
  params.forEach(evn => { cat.push(evn.category) })

  let categorias = cat.filter((item, index) => {
    return cat.indexOf(item) === index;
  })
  return categorias;
}
