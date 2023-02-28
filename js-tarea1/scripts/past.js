
  let pasados=[];
  let current=new Date(data.currentDate);
  for (const iterator of data.events) {
    let fecha2= new Date(iterator.date);
    if (current > fecha2) {
      pasados.unshift(iterator);
      console.log('hola');
    }
  }

  let eventosPasados=[];
  let f1 =new Date(data.currentDate);

  for (const even of data.events) {

      let f2=new Date(even.date);
      if(f1 > f2 ){
          eventosPasados.unshift(even);
      }
  }


let lista = document.getElementById('lista-dinamica'); 

let fragment=document.createDocumentFragment();

for (const even of eventosPasados) {
  let div=document.createElement('div');
  div.classList.add('card-container');
  let div2=document.createElement('div');
  div2.classList.add('card');
  let img=document.createElement('img');
  img.classList.add('card-img-top');
  img.src=even.image;
  let div3=document.createElement('div');
  div3.classList.add('card-body');
  let h=document.createElement('h5');
  h.classList.add('card-title');
  h.textContent=even.name;
  let p= document.createElement('p');
  p.classList.add('card-text');
  p.textContent=even.description;
  let a=document.createElement('a');
  a.classList.add('btn');
  a.classList.add('btn-primary');
  a.textContent='Ver mas...'
  a.href="../Details.html";

  div3.appendChild(h);
  div3.appendChild(p);
  div3.appendChild(a);


  div2.appendChild(img);
  div2.appendChild(div3);
  div.appendChild(div2);
  fragment.appendChild(div);
} 

lista.appendChild(fragment);

