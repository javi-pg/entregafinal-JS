document.addEventListener("DOMContentLoaded", function () {
const nombreUsuario = prompt("Por favor ingrese su nombre:");
alert ("Hola " + nombreUsuario + " bienvenid@ al comparador de precios");
let montosTotales = [0,0,0];
let historialComparaciones = []; 

let envioAgregado = [false, false, false]; 

const productos = ["arroz", "fideos", "azucar", "envío"];
const preciosSuper1 = [2990 , 1080, 1390, 0]; //precios en supermercado 1
const preciosSuper2 = [2490 , 770, 1490, 1000]; //precios en supermercado 2
const preciosSuper3 = [1950, 890, 1290, 1500]; //precios en supermercado 3 

const productoSelect = document.getElementById("producto");
const btnComparar = document.getElementById("comparar");
const btnFinalizar = document.getElementById("finalizar");
const listaResultados = document.getElementById("listaResultados");
const listaHistorial = document.getElementById("listaHistorial");

btnComparar.addEventListener("click", function () {
    const producto = productoSelect.value;
    montosTotales = actualizarTotales(productos, preciosSuper1, preciosSuper2, preciosSuper3, producto, montosTotales);

let comparacion = `Producto: ${producto}, Supermercado1: ${preciosSuper1[productos.indexOf(producto)]}, Supermercado2: ${preciosSuper2[productos.indexOf(producto)]}, Supermercado3: ${preciosSuper3[productos.indexOf(producto)]}`;
        historialComparaciones.push(comparacion);

        const resultadoParcial = document.createElement("li");
        resultadoParcial.textContent = `Comparación para ${producto}: Supermercado1: ${montosTotales[0]}, Supermercado2: ${montosTotales[1]}, Supermercado3: ${montosTotales[2]}`;
        listaResultados.appendChild(resultadoParcial);
    });
    btnFinalizar.addEventListener("click", function () {
        mostrarMejorPrecio(montosTotales, nombreUsuario);
        mostrarHistorial(historialComparaciones);
    });

btnComparar.addEventListener("click", function () {
    const producto = productoSelect.value;
    montosTotales = actualizarTotales(productos, preciosSuper1, preciosSuper2, preciosSuper3, producto, montosTotales);
});

function actualizarTotales (productos, preciosSuper1, preciosSuper2, preciosSuper3, producto, montosTotales) {
    let indice = productos.indexOf(producto)
    montosTotales[0] += preciosSuper1[indice];
    montosTotales[1] += preciosSuper2[indice];
    montosTotales[2] += preciosSuper3[indice];

    if (!envioAgregado[0]) {
        montosTotales[0] += preciosSuper1[3]; // Agrega envío supermercado 1
        envioAgregado[0] = true;
    }
    if (!envioAgregado[1]) {
        montosTotales[1] += preciosSuper2[3]; // Agrega envío supermercado 2
        envioAgregado[1] = true;
    }
    if (!envioAgregado[2]) {
        montosTotales[2] += preciosSuper3[3]; // Agrega envío supermercado 3
        envioAgregado[2] = true;
    }
    return montosTotales
}

function mostrarMejorPrecio(montosTotales, nombreUsuario) {
    let mensaje = "";
    if (montosTotales[0] < montosTotales[1] && montosTotales[0] < montosTotales[2]) {
        mensaje = nombreUsuario + ", te recomiendo comprar en Supermercado 1";
    } else if (montosTotales[1] < montosTotales[0] && montosTotales[1] < montosTotales[2]) {
        mensaje = nombreUsuario + ", te recomiendo comprar en Supermercado 2";
    } else if (montosTotales[2] < montosTotales[1] && montosTotales[2] < montosTotales[0]) {
        mensaje = nombreUsuario + ", te recomiendo comprar en Supermercado 3";
    } else {
        mensaje = nombreUsuario + ", los precios son iguales en varios supermercados.";
    }
    alert(mensaje);
}
function mostrarHistorial(historialComparaciones) {
    listaHistorial.innerHTML = "";
    historialComparaciones.forEach((comparacion) => {
        const itemHistorial = document.createElement("li");
        itemHistorial.textContent = comparacion;
        listaHistorial.appendChild(itemHistorial);
    });
}
});
