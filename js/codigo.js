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
        alert(`Monto final: ${salida} ${divisas[divisas.indexOf(divisaSalida)].nombre}`); //se imprime el resultado
    }
}

const ars = new Divisa("Pesos Argentinos", "ARS", 390, "Argentina");
const brl = new Divisa("Reales Brasileños", "BRL", 4.9, "Brasil");
const eur = new Divisa("Euros", "EUR", 0.94, "Unión Europea");
const usd = new Divisa("Dolares Estadounidenses", "USD", 1, "Estados Unidos");
const uyu = new Divisa("Pesos Uruguayos", "UYU", 39.31, "Uruguay");

const divisas = [ars, brl, eur, usd, uyu]; //Array de todos los objetos "Divisas"

let seguir = "si"; //Al cambiar este valor se terminará el loop, y así también el programa
alert("Bienvenido al conversor de divisas");

while (seguir == "si") {
    let cant;
    let numeroDivisaEntrada;
    let numeroDivisaSalida;

    do { //Ingreso y validación de la divisa de entrada
        numeroDivisaEntrada = +prompt("¿Qué divisa ingresará?\n1: ARS - Pesos Argentinos\n2: BRL - Reales Brasileños\n3: EUR - Euros\n4: USD - Dolares Estadounidenses\n5: UYU - Pesos Uruguayos");
    } while (numeroDivisaEntrada != "1" && numeroDivisaEntrada != "2" && numeroDivisaEntrada != "3" && numeroDivisaEntrada != "4" && numeroDivisaEntrada != "5");

    do { //Ingreso y validación del numero
        cant = +prompt("Ingrese la cantidad a convertir: ");
    } while (typeof cant !== 'number');

    do { //Ingreso y validación de la divisa salida
        numeroDivisaSalida = +prompt("¿Qué divisa quiere obtener?\n1: ARS - Pesos Argentinos\n2: BRL - Reales Brasileños\n3: EUR - Euros\n4: USD - Dolares Estadounidenses\n5: UYU - Pesos Uruguayos");
    } while (numeroDivisaSalida != "1" && numeroDivisaSalida != "2" && numeroDivisaSalida != "3" && numeroDivisaSalida != "4" && numeroDivisaSalida != "5");

    usd.convertir(cant, divisas[numeroDivisaEntrada - 1], divisas[numeroDivisaSalida - 1]); //Con la cantidad, la divisa de entrada y la divisa de salida ejecutamos el método convertir, el cual calcula e imprime el resultado

    seguir = prompt("¿Desea realizar otra conversion? (si/no)");
    seguir = seguir.toLowerCase(); //Convierte el ingreso de un "Si/sI/SI" a un "si";
}