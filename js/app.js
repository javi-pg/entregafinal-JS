const nombreUsuario = prompt("Por favor ingrese su nombre:");
let montosTotales = [0,0,0];
alert ("Hola " + nombreUsuario + " bienvenid@ al comparador de precios");
const supermercados =["Supermercado1", "Supermercado2", "Supermercado3"];
const productos = ["arroz", "fideos", "azucar", "envío"];
const preciosSuper1 = [2990 , 1080, 1390, 0]; //precios en supermercado 1
const preciosSuper2 = [2490 , 770, 1490, 1000]; //precios en supermercado 2
const preciosSuper3 = [1950, 890, 1290, 1500]; //precios en supermercado 3 
let flag = true;

while (flag) {
    let producto = prompt ("selecciona un precio para comparar: arroz, fideos, azucar. Escribe salir para terminar");
    if (producto == "salir") {
        flag = false;
        mostrarMejorPrecio(montosTotales, nombreUsuario);
    }
    else if (productos.indexOf(producto) == -1 && producto != "envío") {
        alert ("intenta otra vez, no tenemos ese producto en inventario");
    } 
    else {
        montosTotales = actualizarTotales(productos, preciosSuper1, preciosSuper2, preciosSuper3, producto, montosTotales);
    } 
}

function actualizarTotales (productos, preciosSuper1, preciosSuper2, preciosSuper3, producto, montosTotales) {
    let indice = productos.indexOf(producto)
    montosTotales [0] = montosTotales[0] + preciosSuper1[indice] + preciosSuper1[3];
    montosTotales [1] = montosTotales[1] + preciosSuper2[indice] + preciosSuper2[3];
    montosTotales [2] = montosTotales[2] + preciosSuper3[indice] + preciosSuper3[3];
    return montosTotales
}


function mostrarMejorPrecio(montosTotales, nombreUsuario) {
    if (montosTotales [0] < montosTotales [1] && montosTotales [0] < montosTotales [2]) {
        alert (nombreUsuario + ", te recomiendo comprar en supermercado 1");
    }
    else if (montosTotales [1] < montosTotales [0] && montosTotales [1] < montosTotales [2]) {
        alert (nombreUsuario + ", te recomiendo comprar en supermercado 2");
    }
    else if (montosTotales [2] < montosTotales [1] && montosTotales [2] < montosTotales [0] ) {
        alert (nombreUsuario + ", te recomiendo comprar en supermercado 3");
    }
    else {
        alert (nombreUsuario + ", los precios son iguales en varios supermercados.");
    }
}
confirm ("Pulsa aceptar para finalizar la comparación de precios y pasar a la página web")


