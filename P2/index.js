console.log("Ejecutando JS...");

display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("delete")
contenedor = document.getElementById("contenedor")
document.getElementById('caja').style.display = 'none';


let digitos = document.getElementsByClassName("digito");
let operando = document.getElementsByClassName("operando");

function Abrir_Calculadora() {
    document.getElementById('caja').style.display = 'inline-block';
    elementoinicial = contenedor.parentNode
    elementoinicial.removeChild(contenedor)
}

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}
 
 //-- Variable de estado de la calculadora
 //-- Al comenzar estamos en el estado incial
 let estado = ESTADO.INIT;   

 

//-- Función de retrollamada de los digitos
function digito(valor)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {

        display.innerHTML = valor;

        //-- Pasar al siguiente estado
        estado = ESTADO.OP1;

    } else if (estado == ESTADO.OP1 ) {
        display.innerHTML += valor;
    } else if (estado == ESTADO.OPERATION) {
        display.innerHTML += valor;
        estado = ESTADO.OP2;
    } else if (estado == ESTADO.OP2) {
        display.innerHTML += valor;
    }

}


//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for(i=0; i<digitos.length; i++) {
    digitos[i].onclick = (ev) => {
        console.log("Leyendo digito")
        digito(ev.target.value)
    }
}
//--Operandos
for(i=0; i<operando.length; i++){
    operando[i].onclick=(ev)=>{
        if(estado == ESTADO.OP1){
            operacion(ev.target.value);
            console.log("Operacion")
        }
    }
}


function operacion(operation){
    if(estado != ESTADO.OPERATION) {
        display.innerHTML += operation;
        estado = ESTADO.OPERATION;
    }
}




//-------- Resto de funciones de retrollamada



//-- Evaluar la expresion
igual.onclick = () => {
  

        display.innerHTML = eval(display.innerHTML);
        estado = ESTADO.OP1;
        ans.value = display.innerHTML;
   
    //-- Calcular la expresión y añadirla al display
}

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
  display.innerHTML = "0";
  console.log("clear")
  estado = ESTADO.INIT;
}

borrar.onclick = () => { 
    display.innerHTML = display.innerHTML.slice(0,-1);
    
}
//--Raiz cuadrada
sqrt.onclick = () => {
    display.innerHTML = Math.sqrt(display.innerHTML);
}

//-- ANSWER
ans.onclick = () => {
    display.innerHTML += ans.value;
 }