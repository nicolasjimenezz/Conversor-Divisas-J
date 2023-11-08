let seguir = "si";

const USD = 1;
const ARG = 350;
const EURO = 0.94;


alert("Bienvenido al conversor de divisas");

while (seguir == "si") {
    let divisaEntrada;
    let cant;
    let divisaSalida;
    let resultado;

    do {
        divisaEntrada = prompt("¿Qué divisa ingresará? (arg/euro/usd)");
        divisaEntrada=divisaEntrada.toLowerCase();
    } while (divisaEntrada != "arg" && divisaEntrada != "euro" && divisaEntrada != "usd");

    do {
        cant = +prompt("Ingrese el número a convertir: ");
    } while (typeof cant !== 'number')


    switch(divisaEntrada){
        case "arg":
            do {
                divisaSalida = prompt("¿Qué divisa quiere obtener? (euro/usd)");
                divisaSalida=divisaSalida.toLowerCase();
                if (divisaSalida!="euro" && divisaSalida!="usd") alert("Ingrese únicamente 'euro' o 'usd'");
            } while (divisaSalida != "euro" && divisaSalida != "usd");

            switch(divisaSalida){
                case "euro":
                    resultado=(cant/ARG)*EURO;
                    break;
                case "usd":
                    resultado=(cant/ARG);
                    break;
            }
            break;

        case "usd":
            do {
                divisaSalida = prompt("¿Qué divisa quiere obtener? (arg/euro)");
                divisaSalida=divisaSalida.toLowerCase();
                if (divisaSalida!="arg" && divisaSalida!="euro") alert("Ingrese únicamente 'arg' o 'euro'");
            } while (divisaSalida != "arg" && divisaSalida != "euro");

            switch(divisaSalida){
                case "arg":
                    resultado=cant*ARG;
                    break;
                case "euro":
                    resultado=cant*EURO;
                    break;
            }
            break;

        case "euro":
            do {
                divisaSalida = prompt("¿Qué divisa quiere obtener? (arg/usd)");
                divisaSalida=divisaSalida.toLowerCase();
                if (divisaSalida!="arg" && divisaSalida!="usd") alert("Ingrese únicamente 'arg' o 'usd'");
            } while (divisaSalida != "arg" && divisaSalida != "usd");

            switch(divisaSalida){
                case "arg":
                    resultado=(cant/EURO)*ARG;
                    break;
                case "usd":
                    resultado=cant/EURO;
                    break;
            }
            break;
    }

    alert(`Monto final: ${resultado} ${divisaSalida}`);
    seguir = prompt("¿Desea realizar otra conversion? (si/no)");
    seguir = seguir.toLowerCase(); //Convierte el ingreso de un "Si/sI/SI" a un "si";
}