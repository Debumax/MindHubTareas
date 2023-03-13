let eventosProximos = ArrayUpcoming()
GeneraListCheckbox();
GeneratListEvent(eventosProximos);


let checkboxButtons = document.querySelectorAll("input[type=checkbox]")
checkboxButtons.forEach(checkbox => checkbox.addEventListener("change",() => BuscaSeleccion(eventosProximos)))


const inputBuscador = document.getElementById('buscador');
inputBuscador.addEventListener("input", () => buscador(eventosProximos))


// GENERA EL ARREGLO DE EVENTOS PASADOS 
function ArrayUpcoming() {
  let eventosProximos = [];
  let f1 = new Date(data.currentDate);
  for (const even of Eventos) {
    let f2 = new Date(even.date);
    if(f1 < f2 ){
      eventosProximos.push(even);
    }
  }
  return eventosProximos;
}

