

function gereraInfo(data) {

    const eventos = data.events;

    GeneratListEvent(eventos)

    let cat = categorias(eventos);
    
    GeneraListCheckbox(cat);

    let checkboxButtons = document.querySelectorAll("input[type=checkbox]")
    checkboxButtons.forEach(checkbox => checkbox.addEventListener("change", () => BuscaSeleccion(eventos)));

    const inputBuscador = document.getElementById('buscador');
    inputBuscador.addEventListener("input", () => buscador(eventos, inputBuscador.value))

}


function categorias(params) {
    let cat = [];
    params.forEach(evn => { cat.push(evn.category) })

    let categorias = cat.filter((item, index) => {
        return cat.indexOf(item) === index;
    })
    return categorias;
}












