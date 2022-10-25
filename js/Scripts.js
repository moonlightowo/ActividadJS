let amigos = [];

let btnGuardar = document.getElementById("btnGuardar");
let btnCancelar = document.getElementById("btnCancelar");

let lista = document.getElementById("listaAmigos");
let formulario = document.getElementById("formulario");
let error = document.getElementById("error");
let numeroFallido = document.getElementById("numeroFallido");

// let buscarNumero = [];
let numeroRepetido = false;

pintar();

function limpiar(){
    formulario[0].value="";
    formulario[1].value="";
    formulario[2].value="";
    formulario[3].value="";
};

function pintar(){
    if(amigos.length>0)
    {
        lista.innerHTML="";
        amigos.forEach((contacto, index)=>{
            let amigo=document.createElement("div");
            amigo.innerHTML=`<p>${contacto.nombre}</p><button class="muestraDetalles"><input type="hidden" value="${contacto.telefono}" />Detalles</button><button class="eliminarContacto" indice="${index}">Borrar</button>`;
            lista.appendChild(amigo);
        });
        let botones=document.getElementsByClassName("muestraDetalles");
        for (let i = 0; i < botones.length; i++) {
            const element = botones[i];
            element.addEventListener("click",()=>{
                showDetalles(element.children[0].value);
            });
        }
        botones=document.getElementsByClassName("eliminarContacto");
        for (let i = 0; i < botones.length; i++){
            const element = botones [i];
            element.addEventListener("click",()=>{
                amigos.splice(element.getAttribute("indice"),1);
                pintar();
            });
        }
    }
    else{
        lista.innerHTML="<h2>No tenemos amigos</h2>";
    }
};

function showDetalles(tel){
    let detalles=document.getElementById("detallesAmigo");
    let amigo=amigos.find(a=>{
        if(a.telefono==tel)
        {
            return a;
        }
    });
    detalles.innerHTML=`<img src="${amigo.foto}" alt="">
    <h3>${amigo.nombre}</h3>
    <p><span>Telefono:</span>${amigo.telefono}</p>
    <p><span>Correo:</span>${amigo.correo}</p>
    <button class="btnCerrarDetalles">Cerrar</button>`;
    detalles.classList.remove("oculto");

    let cerrarDetalles = document.querySelector(".btnCerrarDetalles");
    cerrarDetalles.addEventListener("click", function()
    {
        detalles.classList.add('oculto');
    });
};

btnCancelar.addEventListener("click",(event)=>{
    limpiar();
    event.preventDefault();
});

btnGuardar.addEventListener("click", function(event){
    // for(let i = 0; i < amigos.length; i++){
    //     if(buscarNumero.includes(amigos[i]['telefono']))
    //     {
    //         numeroRepetido = true;
    //     }
    // }
    if(formulario[0].value === null || formulario[0].value === "" || formulario[1].value === null || formulario[1].value === "" || formulario[2].value === null || formulario[2].value === "" || formulario[3].value === null || formulario[3].value === "")
    {
        error.classList.remove("oculto");

        event.preventDefault();
    }
    else if(numeroRepetido === true)
    {
        numeroFallido.classList.remove("oculto");

        event.preventDefault();
    }
    else
    {
        error.classList.add("oculto");

        let contacto={
            nombre:formulario["nombre"].value,
            telefono:formulario["telefono"].value,
            correo:formulario["correo"].value,
            foto:formulario["foto"].value,
        };
    
        amigos.push(contacto);
        limpiar();
        pintar();
        event.preventDefault();
    }
});