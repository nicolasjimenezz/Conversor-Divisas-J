class Registro {
    constructor(entrada, codigoDivisaEntrada, salida, codigoDivisaSalida) {
        this.entrada = entrada;
        this.codigoDivisaEntrada = codigoDivisaEntrada;
        this.salida = salida;
        this.codigoDivisaSalida = codigoDivisaSalida;
    }
}

function convertir(montoEntrada, codigoDivisaEntrada, codigoDivisaSalida) { //Aqui se realiza e imprime la conversion. Primero se dolariza el valor ingresado, y luego se lo convierte a la moneda de salida
    let salida;
    console.log(divisas[codigoDivisaEntrada].valorCambio);
    console.log(divisas[codigoDivisaSalida].valorCambio);
    salida = montoEntrada / (divisas[codigoDivisaEntrada].valorCambio); //salida=cantidad ingresada/valor de la moneda ingresada en dolares 
    salida = salida * (divisas[codigoDivisaSalida].valorCambio); //cantidad ingresada (ahora en dolares) se multiplica por valor en dolares de la moneda de la salida
    cambiarMontoSalida(salida); //se modifica el div de salida
}

function cambiarMontoSalida(montoSalida) {
    salida = document.querySelector('#montoSalida');
    salida.textContent = Number.parseFloat(montoSalida).toFixed(2); //Trunca el número de salida
}

function dibujarTabla() {
    let entrada = document.querySelector('#montoEntrada').value;
    console.log(codigoDivisaEntrada);
    console.log(codigoDivisaSalida);
    codigoDivisaEntradaDibujo = document.querySelector('#divisaEntrada').selectedIndex;
    codigoDivisaEntradaDibujo=conversorCodigo(codigoDivisaEntrada);
    let salida = document.querySelector('#montoSalida').textContent;
    codigoDivisaSalidaDibujo = document.querySelector('#divisaSalida').value;
    let tabla = document.querySelector('#tabla');
    tabla.innerHTML += `
    <tr>
        <td>${entrada} ${divisas[codigoDivisaEntrada].iniciales}</td>
        <td>${salida} ${divisas[codigoDivisaSalida].iniciales}</td>
    </tr>
    `;
    // Guardar elementos en LocalStorage
    const nuevoRegistro = new Registro(entrada, divisas[codigoDivisaEntrada].iniciales, salida, divisas[codigoDivisaSalida].iniciales);
    console.log(nuevoRegistro);
    let registro = JSON.parse(localStorage.getItem("registro")) || []; //Carga el localstorage actual en registro
    registro.push(nuevoRegistro); //Pushea el nuevo registro en el array registro
    localStorage.clear(); //Limpiar el localstorage
    localStorage.setItem("registro", JSON.stringify(registro)); //Actualiza localstorage con el array modificado
}

function dibujarRegistro(arrayTemporal) {
    let tabla = document.querySelector('#tabla');
    tabla.innerHTML += `
    <tr>
        <td>${arrayTemporal.entrada} ${arrayTemporal.codigoDivisaEntrada}</td>
        <td>${arrayTemporal.salida} ${arrayTemporal.codigoDivisaSalida}</td>
    </tr>
    `;
}

function conversorCodigo(codigo){
    switch (codigo) {
        case 0: return 3; //usd
        case 1: return 0; //ars
        case 2: return 1; //brl
        case 3: return 2; //eur
        case 4: return 4; //uyu
    }
}

//DARK MODE
function toggle() {
    let body = document.body;
    body.classList.toggle('bodyModoOscuro');

    let header = document.querySelector('#header');
    header.classList.toggle('headerModoOscuro');

    const h2 = document.querySelectorAll('.h2');
    h2.forEach(h2 => {
        h2.classList.toggle('h2ModoOscuro');
    });

    let tabla = document.querySelector('#tabla');
    tabla.classList.toggle('tablaModoOscuro');

    let footer = document.querySelector('#footer');
    footer.classList.toggle('footerModoOscuro');
}





// INICIO DEL CODIGO PRINCIPAL

const registro = []; //Historial de las conversiones
let codigoDivisaEntrada = 3; //Toma al 3 (USD) por defecto
let codigoDivisaSalida = 0; //Toma al 0 (ARS) por defecto
let codigoDivisaEntradaDibujo, codigoDivisaSalidaDibujo;

//Eventos que activan la toma del valor del input, para transformarlo
let montoEntrada = document.querySelector('#montoEntrada');
montoEntrada.addEventListener('blur', () => { convertir(montoEntrada.value, codigoDivisaEntrada, codigoDivisaSalida) });

let divisaEntrada = document.querySelector('#divisaEntrada');
divisaEntrada.addEventListener('blur', () => {
    codigoDivisaEntrada=conversorCodigo(codigoDivisaEntrada);
    convertir(montoEntrada.value, codigoDivisaEntrada, codigoDivisaSalida);
});

let divisaSalida = document.querySelector('#divisaSalida');
divisaSalida.addEventListener('blur', () => {
    codigoDivisaSalida=divisaSalida.selectedIndex;
    convertir(montoEntrada.value, codigoDivisaEntrada, codigoDivisaSalida);
});

//Para evitar que las arrowup y arrowdown alteren el valor del input
document.getElementById('montoEntrada').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault(); //Para prevenir el comportamiento por defecto
    }
});

//boton guardar intercambio en la tabla
let guardar = document.querySelector('#botonGuardarIntercambio');
guardar.addEventListener('click', () => {
    dibujarTabla();
    Toastify({
        text: '¡Añadiste una nueva fila!',
        className: 'nuevaFilaTostada',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
    }).showToast();
});

//boton limpiar tabla
let limpiar = document.querySelector('#botonLimpiarTabla');
limpiar.addEventListener('click', () => {
    let tabla = document.querySelector('#tabla');
    tabla.innerHTML = `
    <thead id="tablaHead">
        <tr>
            <th>Entrada</th>
            <th>Salida</th>
        </tr>
    </thead>
    <tbody>
        <tr></tr>
    </tbody>
    `;
    localStorage.clear();
    Toastify({
        text: '¡Limpiaste la tabla!',
        className: 'limpiarTablaTostada',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
    }).showToast();
});

let arrayTemporal;
arrayTemporal = JSON.parse(localStorage.getItem("registro")) || [];
arrayTemporal.forEach(dibujarRegistro);


const divisas = [];
fetch('./divisas.json')
    .then(response => response.json())
    .then(datosJSON => {
        datosJSON.forEach(element => {
            divisas.push(element); //PUSH DE LOS JSON EN DIVISAS
        });
    })


//DARK MODE
const botonModoOscuro = document.querySelector('#modoOscuro');
botonModoOscuro.addEventListener('click', toggle);