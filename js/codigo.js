class Divisa {
    constructor(nombre, iniciales, valorCambio, pais) { //Le di propiedades de nombre, iniciales, valor de cambio a dólares y país a las divisas.
        this.nombre = nombre;
        this.iniciales = iniciales;
        this.valorCambio = valorCambio;
        this.pais = pais;
    }
    convertir(montoEntrada, divisaEntrada, divisaSalida) { //Aqui se realiza e imprime la conversion. Primero se dolariza el valor ingresado, y luego se lo convierte a la moneda de salida
        let salida;
        salida = montoEntrada / (divisas[divisas.indexOf(divisaEntrada)].valorCambio); //salida=cantidad ingresada/valor de la moneda ingresada en dolares 
        salida = salida * (divisas[divisas.indexOf(divisaSalida)].valorCambio); //cantidad ingresada (ahora en dolares) se multiplica por valor en dolares de la moneda de la salida
        // console.log(`Monto final: ${salida} ${divisas[divisas.indexOf(divisaSalida)].nombre}`); //se imprime el resultado

        cambiarMontoSalida(salida); //se modifica el div de salida
    }
}

class Registro {
    constructor(entrada, codigoDivisaEntrada, salida, codigoDivisaSalida) {
        this.entrada = entrada;
        this.codigoDivisaEntrada = codigoDivisaEntrada;
        this.salida = salida;
        this.codigoDivisaSalida = codigoDivisaSalida;
    }
}

function cambiarMontoSalida(montoSalida) {
    salida = document.querySelector('#montoSalida');
    salida.textContent = Number.parseFloat(montoSalida).toFixed(2); //Trunca el número de salida
}

function dibujarTabla() {
    let entrada = document.querySelector('#montoEntrada').value;
    let codigoDivisaEntrada = document.querySelector('#divisaEntrada').value;
    let salida = document.querySelector('#montoSalida').textContent;
    let codigoDivisaSalida = document.querySelector('#divisaSalida').value;
    let tabla = document.querySelector('#tabla');
    tabla.innerHTML += `
    <tr>
        <td>${entrada} ${codigoDivisaEntrada}</td>
        <td>${salida} ${codigoDivisaSalida}</td>
    </tr>
    `;
    // Guardar elementos en LocalStorage
    const nuevoRegistro = new Registro(entrada, codigoDivisaEntrada, salida, codigoDivisaSalida);
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



const ars = new Divisa("Pesos Argentinos", "ARS", 390, "Argentina");
const brl = new Divisa("Reales Brasileños", "BRL", 4.9, "Brasil");
const eur = new Divisa("Euros", "EUR", 0.94, "Unión Europea");
const usd = new Divisa("Dolares Estadounidenses", "USD", 1, "Estados Unidos");
const uyu = new Divisa("Pesos Uruguayos", "UYU", 39.31, "Uruguay");

const divisas = [ars, brl, eur, usd, uyu]; //Array de todos los objetos "Divisas"
const registro = []; //Historial de las conversiones

//Primero tomamos los select de entrada y salida
let divisaEntrada = document.querySelector('#divisaEntrada');
let codigoDivisaEntrada = usd; //Al tener como select por defecto al USD, tengo que cambiar el orden con un switch
divisaEntrada.addEventListener('blur', () => {
    switch (divisaEntrada.selectedIndex) {
        case 0: codigoDivisaEntrada = usd; //usd
            break;
        case 1: codigoDivisaEntrada = ars; //ars
            break;
        case 2: codigoDivisaEntrada = brl; //brl
            break;
        case 3: codigoDivisaEntrada = eur; //eur
            break;
        case 4: codigoDivisaEntrada = uyu; //uyu
            break;
    }
})

let divisaSalida = document.querySelector('#divisaSalida');
let codigoDivisaSalida = ars;
divisaSalida.addEventListener('blur', () => {
    switch (divisaSalida.selectedIndex) {
        case 0: codigoDivisaSalida = ars; //usd
            break;
        case 1: codigoDivisaSalida = brl; //ars
            break;
        case 2: codigoDivisaSalida = eur; //brl
            break;
        case 3: codigoDivisaSalida = usd; //eur
            break;
        case 4: codigoDivisaSalida = uyu; //uyu
            break;
    }
});

//Eventos que activan la toma del valor del input, para transformarlo
let montoEntrada = document.querySelector('#montoEntrada');
montoEntrada.addEventListener('blur', () => { usd.convertir(montoEntrada.value, codigoDivisaEntrada, codigoDivisaSalida) }); //usar blur o keydown

divisaEntrada = document.querySelector('#divisaEntrada');
divisaEntrada.addEventListener('blur', () => { usd.convertir(montoEntrada.value, codigoDivisaEntrada, codigoDivisaSalida) }); //usar blur o keydown

divisaSalida = document.querySelector('#divisaSalida');
divisaSalida.addEventListener('blur', () => { usd.convertir(montoEntrada.value, codigoDivisaEntrada, codigoDivisaSalida) }); //usar blur o keydown

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
});

let arrayTemporal;
arrayTemporal = JSON.parse(localStorage.getItem("registro")) || [];
console.log(arrayTemporal);
arrayTemporal.forEach(dibujarRegistro); //hacer una validación para asegurarse de que existe en el local storage


//DARK MODE
const botonModoOscuro = document.querySelector('#modoOscuro');
botonModoOscuro.addEventListener('click', toggle);