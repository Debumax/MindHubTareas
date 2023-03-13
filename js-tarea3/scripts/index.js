GeneratListEvent(Eventos)
GeneraListCheckbox();

let checkboxButtons = document.querySelectorAll("input[type=checkbox]")
checkboxButtons.forEach(checkbox => checkbox.addEventListener("change",() => BuscaSeleccion(Eventos)))


const inputBuscador = document.getElementById('buscador');
inputBuscador.addEventListener("input", () =>buscador(Eventos))













