let urlapi = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlapi)
.then(res=>res.json())
.then(datos =>gereraInfo(datos))
.catch(
    error => {console.log(error);}
)

// async function getDatos() {
//     //  fetch(urlapi)
//     //     .then(res => res.json())
//     //     .then(datos => console.log(datos.events))
//     //     .catch(
//     //         error => { console.log(error); }
//     //     )
//     try {

//         const res = await fetch(urlapi)
//         //console.log(res)
//         let datos=[] ;
//         console.log(datos)
//         return await res.json()
        
//     } catch (error) {

//         console.log(error);
//     }
    
// }
// getDatos();
// let DatosApi =getDatos(); 
// console.log("datos de mi api : ", DatosApi)