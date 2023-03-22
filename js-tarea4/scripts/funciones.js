// GENERA LA LISTA DE CARTS 

function GeneratListEvent(array) {
    let lista = document.getElementById('lista-dinamica');
    let fragment = document.createDocumentFragment();
    lista.innerHTML = "";

    for (const even of array) {
        let div = document.createElement('div');
        div.classList.add('card-container');

        let div2 = document.createElement('div');
        div2.classList.add('card-modi');

        let div_cont_img = document.createElement('div');
        div_cont_img.classList.add('card-cont-img');

        let img = document.createElement('img');
        img.classList.add('card-img');
        img.src = even.image;

        let div3 = document.createElement('div');
        div3.classList.add('card-info');

        let h = document.createElement('h5');
        h.classList.add('card-titulo');
        h.textContent = even.name;
        let p = document.createElement('p');
        p.classList.add('card-parrafo');
        p.textContent = even.description;
        let a = document.createElement('a');
        a.classList.add('btn');
        a.classList.add('btn-primary');
        a.textContent = 'Ver mas...'
        a.href = `../Details.html?id=${even._id}`;

        div3.appendChild(h);
        div3.appendChild(p);
        div3.appendChild(a);

        div_cont_img.appendChild(img)
        div2.appendChild(div_cont_img);
        div2.appendChild(div3);
        div.appendChild(div2);
        fragment.appendChild(div);
    }

    lista.appendChild(fragment);
}

///////////////////////////////////////


// --- GENERA LA LISTA DE CHECKBOX
function GeneraListCheckbox(cat) {
    const checks = document.querySelector(".check-container");
    let fragment2 = document.createDocumentFragment();

    cat.forEach(cat => {

        let div2 = document.createElement('div');
        div2.classList.add('form-check');
        div2.classList.add('form-check-inline');

        let input = document.createElement('input');
        input.classList.add('form-check-input');
        input.type = 'checkbox';
        input.value = cat;
        input.id = cat;
        input.name = cat;

        let label = document.createElement('label')
        label.classList.add('form-check-label')
        label.for = cat;
        label.textContent = cat

        div2.appendChild(input);
        div2.appendChild(label);
        fragment2.appendChild(div2);

    });

    checks.appendChild(fragment2);
}

/////////////////////////////////////////////////

// ----GENERA UNA LISTA DE EVENTOS SEGUN BUSQUEDA Y CHECK
function crearLista(arr) {
    let lista = document.getElementById('lista-dinamica');
    
    //reseteo el contenido de lista para que no se acumulen los distintos lis
    lista.innerHTML = "";
    if (arr.length === 0) {
        let h = document.createElement('h1');
        h.classList.add('card-title');
        h.textContent = 'NO SE ENCONTRARON COINCIDENCIAS';
        lista.appendChild(h);
    }
    else GeneratListEvent(arr);

}

/////////////////////////////////////
// solo checkbox 
function BuscaSeleccion(arr) {//EL DE FILTROS
    
    let seleccionado = [];
    let categoriasSeleccionadas = [];

    let checkboxButtons = document.querySelectorAll("input[type=checkbox]")
    
    let chek= Array.from(checkboxButtons);
    seleccionado = chek.filter(checkbox => checkbox.checked);
     
    seleccionado.forEach((cat) => {
        categoriasSeleccionadas.push(cat.defaultValue)
        
    });



    crearLista(filtrarEventos(arr, categoriasSeleccionadas));

}
////////////////////////////

// FUNCION DEL EVENTO INPUT 
function buscador(arr,value) {
   
    let encontrado = [];
    let seleccionado = [];
    let categoriasSeleccionadas=[];

    //const texto = inputBuscador.value;
    ////// BUSQUEDA Y FILTRADO 

    let checkboxButtons = document.querySelectorAll("input[type=checkbox]")  
    let chek= Array.from(checkboxButtons);
    seleccionado = chek.filter(checkbox => checkbox.checked);
    
    seleccionado.forEach((cat) => {
        categoriasSeleccionadas.push(cat.defaultValue)
        
    });

    if (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 7) {
        encontrado = BuscandoTexto(arr, value)
    }
    else {
        let arrayNuevosEventos = filtrarEventos(arr, categoriasSeleccionadas)
        encontrado = BuscandoTexto(arrayNuevosEventos, value);
    }

    crearLista(encontrado, "#lista-dinamica")

};
/////////////////////////////


//BUSCA TEXTO SEGUN ARRAY  

function BuscandoTexto(array, valor) {
    let searched = []
    array.forEach(even => {
        if (even.name.toLowerCase().includes(valor.toLowerCase()) || even.description.toLowerCase().includes(valor.toLowerCase())) {
            searched.push(even);
        }
    });
    return searched;
}
//////////////////////////////

//---FILTRA SEGUN CHECK - SEGUN ARRAY 
function filtrarEventos(array, seleccionados) {
    let filtrados = [];
    let filtradochecBusc = [];
    if (seleccionados.length === 7 || seleccionados.length === 0) {
        filtrados = array;
    }
    else {
        seleccionados.forEach(categorias => {
            array.forEach(even => {
                if (even.category === categorias) {
                    filtrados.push(even);
                }
            });
        });
    }

    /// se fija si hay algo en el buscador
    let textbuscar = document.getElementById('buscador').value;
    if (textbuscar === '') {
        return filtrados;
    }
    else {
        filtradochecBusc = BuscandoTexto(filtrados, textbuscar)
        return filtradochecBusc
    }
}

