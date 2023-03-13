//console.log([document]);
const queryString= location.search;
const params = new URLSearchParams(queryString); 
const id = params.get("id");

const evento = data.events.find( even => even._id===parseInt(id) );  

//console.log(evento);


const div = document.querySelector(".details-contenedor");
div.innerHTML= `
<div class="details-contenedor-img">
    <img class="details-img" src=${evento.image} alt=${evento.name}>
</div>
<div class="details-contenedor-info">
    <h1 class="details-titulo">${evento.name}</h3>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">${evento.description}</li>
    <li class="list-group-item">place: ${evento.place}</li>
    <li class="list-group-item">Precio: $ ${evento.price}</li>
    <li class="list-group-item">category: ${evento.category}</li>
    <li class="list-group-item">capacity: ${evento.capacity}</li>
    <li class="list-group-item"></li>
    </ul>
</div>

`