let eventosPasados = ArrayPass();
GeneraListCheckbox();
GeneratListEvent(eventosPasados);

let checkboxButtons = document.querySelectorAll("input[type=checkbox]")
checkboxButtons.forEach(checkbox => checkbox.addEventListener("change",() => BuscaSeleccion(eventosPasados)))


const inputBuscador = document.getElementById('buscador');
inputBuscador.addEventListener("input", () => buscador(eventosPasados))


// GENERA EL ARREGLO DE EVENTOS PASADOS 
function ArrayPass() {
  let eventosPasados = [];
  let f1 = new Date(data.currentDate);
  for (const even of Eventos) {
    let f2 = new Date(even.date);
    if (f1 > f2) {
      eventosPasados.push(even);
    }
  }
  return eventosPasados;
}


