var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar",
    "lemon", "orange", "peach", "potato", "tomato"];

//En el historial almacenaremos los eventos que suceden en la partida
var historial = document.getElementById('historial');

//Las monedas disponibles por el usuario
var saldoDisplay = Number(document.getElementById('saldo').innerHTML);

//El array para los resultados obtenidos
var arraySlots = [];

function introducirMonedas() {
    //Deja introducir a solo si el saldo es = 0
    if (saldoDisplay == 0) {
        let monedas = Number(document.getElementById('introducir').value);
        //Para evitar la entrada de valores <= 0
        if (monedas > 0) {
            saldoDisplay += monedas;
            document.getElementById('saldo').innerHTML = saldoDisplay;
            historial.innerHTML += "<p>Has añadido " + monedas + " monedas</p>";
            scrollTop();
            //Se elimina el boton para evitar introducir mas monedas
            document.getElementById('insertCoin').setAttribute("disabled", "");
        } else {
            alert("No introduzcas cantidades iguales o menores a 0")
        }
    }
}

function randomizar() {
    //Las siguientes dos lineas nos realiza la "animacion" de la palanca
    let imgPalanca = document.getElementById('palanca');
    imgPalanca.innerHTML = "<img src= 'img/palancaUP.png'>";

    //Nos deja jugar, si nos queda alguna moneda, si no, suelta un alert
    if (saldoDisplay > 0) {
        //Restamos una moneda del botin total y rellenamos el historial
        saldoDisplay -= 1;
        historial.innerHTML += "<p>Has gastado una moneda</p>";
        scrollTop();
        //Mostramos el nuevo valor
        document.getElementById('saldo').innerHTML = saldoDisplay;
        //Obtenemnos la coleccion de las imagenes para posteriormente recorrerlas y rellenarlas con las nuevas imagenes
        let slots = document.getElementsByClassName('caja');

        for (let i = 0; i < slots.length; i++) {
            var random = Math.round(Math.random() * 9);
            slots[i].innerHTML = "<img src = 'img/" + listaImagenes[random] + ".png'/>";
            //Rellenamos el arrayResultado, para utilizarlo a la hora de valorar los premios
            arraySlots.push(listaImagenes[random]);
        }
        //Añadimos aqui la llamada a getPremios, para que se ejecute solo en caso de que existan monedas
        getPremios();
        //Quitar el atributo disabled cuando el saldo llege a 0
        if (saldoDisplay == 0 ){
            document.getElementById('insertCoin').removeAttribute("disabled", "");
        }
    } else {
        alert("No somos una ONG, dame tu dinero");
    }
}

function getPremios (){
    //Variable para evaluar la cantidad de monedas que nos salen
    let dollar = 0;
    arraySlots.forEach(element => {
        if (element == "dollar") {dollar += 1}
    });
    //Primero se evalua que no haya dolares
    if (dollar == 0){
        //3 iguales sin moneda
        if (arraySlots[0] == arraySlots[1] && arraySlots[1] == arraySlots[2]){
            saldoDisplay +=5
            historial.innerHTML += "<p>¡¡¡3 Iguales!!! Ganas 5 monedas</p>";
            scrollTop();
        //2 iguales sin moneda
        } else if (arraySlots[0] == arraySlots[1] || arraySlots [0] == arraySlots[2] || arraySlots[1] == arraySlots[2]){
            saldoDisplay += 2;
            historial.innerHTML += "<p>¡¡2 iguales!! Ganas 2 monedas</p>";
            scrollTop();
        }
    }else if (dollar == 1){
        //dos iguales y una moneda
        if (arraySlots[0] == arraySlots[1] || arraySlots [0] == arraySlots[2] || arraySlots[1] == arraySlots[2]){
            saldoDisplay += 3;
            historial.innerHTML += "<p>¡¡2 iguales y una moneda!! Ganas 3 monedas</p>";
            scrollTop();
        } else {
            saldoDisplay += 1;
            historial.innerHTML += "<p>¡¡1 moneda!! Ganas 1 moneda</p>";
            scrollTop();
        }
    }else if (dollar == 2){
            saldoDisplay += 4;
            historial.innerHTML += "<p>¡¡2  monedas!! Ganas 4 monedas</p>";
        scrollTop();
    }else if (dollar == 3){
            saldoDisplay += 4;
            historial.innerHTML += "<p>¡¡El gran premio, 3 monedas!! Has ganado 10 monedas</p>";
        scrollTop();
    }
    //Se vacia el array para tiradas posteriores
    arraySlots = [];
    document.getElementById('saldo').innerHTML = saldoDisplay;
    }

function retirar(){
    //Muestra las monedas obtenidas
    alert("Has retirado " + saldoDisplay + " monedas!!");
    //Se añado el registro al historial
    historial.innerHTML += "<p>Se han retirado " + saldoDisplay + " monedas</p>";
    scrollTop();
    //Se pone a disposicion el boton de introducir
    document.getElementById('insertCoin').removeAttribute("disabled", "");
    //Se vacia el valor de saldoDisplay y se muestra
    saldoDisplay = 0;
    document.getElementById('saldo').innerHTML = saldoDisplay;
    }

//Para que el scroll aparezca siempre abajo.
function scrollTop(){
    historial.scrollTop = historial.scrollHeight;
}
//Event listener para los movimientos de la palanca
document.getElementById('palanca').addEventListener("mousedown", function (){
    let imgPalanca = document.getElementById('palanca');
    imgPalanca.innerHTML = "<img src= 'img/palancaDOWN.png'>"
}, false);
document.getElementById('palanca').addEventListener("mouseup", randomizar, false);
