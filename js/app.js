document.addEventListener("DOMContentLoaded", function () {
let montosTotales = [0,0,0];
let historialComparaciones = JSON.parse(localStorage.getItem("historialComparaciones")) || []; 
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
// Mostrar imagen según el producto seleccionado
  productoSelect.addEventListener("change", function () {
    const selectedOption = productoSelect.options[productoSelect.selectedIndex];
    const imagePath = selectedOption.getAttribute("data-img");
    imagenProducto.src = imagePath;
});

//Pedir nombre de usuario
Swal.fire({
    title: "¡Hola!",
    text: 'Por favor, ingrese su nombre:',
    input: 'text',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,
    preConfirm: (value) => {
        if (!value) {
           Swal.showValidationMessage("Debe ingresar su nombre para continuar"); //No deja continuar sin ingresar el nombre 
        }
        return value;
    }
}).then((result) => {
    if (result.isConfirmed && result.value) {
        nombreUsuario = result.value;
        Swal.fire({
            title: `Hola ${nombreUsuario}`,
            text: "Bienvenid@ al comparador de precios",
            icon: 'success'
        });
    }
});

btnComparar.addEventListener("click", function () {
    const producto = productoSelect.value;
    montosTotales = actualizarTotales(productos, preciosSuper1, preciosSuper2, preciosSuper3, producto, montosTotales);

//Guardar historial
    let comparacion =`Producto: ${producto}, Super1: ${preciosSuper1[productos.indexOf(producto)]}, Super2: ${preciosSuper2[productos.indexOf(producto)]}, Super3: ${preciosSuper3[productos.indexOf(producto)]}`;
    historialComparaciones.push(comparacion);
    localStorage.setItem("historialComparaciones", JSON.stringify(historialComparaciones));

//Mostrar resultado parcial 
    const resultadoParcial = document.createElement("li");
    resultadoParcial.textContent = `Comparación agregando ${producto}: Super1: ${montosTotales[0]}, Super2: ${montosTotales[1]}, Super3: ${montosTotales[2]}`;
    listaResultados.appendChild(resultadoParcial);
    });
    btnFinalizar.addEventListener("click", function () {
        mostrarMejorPrecio(montosTotales, nombreUsuario);
        mostrarHistorial(historialComparaciones);
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
    return montosTotales;
}

function mostrarMejorPrecio(montosTotales) {
    let mensaje = "";
    if (montosTotales[0] < montosTotales[1] && montosTotales[0] < montosTotales[2]) {
        mensaje = "Te recomiendo comprar en Supermercado 1";
    } else if (montosTotales[1] < montosTotales[0] && montosTotales[1] < montosTotales[2]) {
        mensaje = "Te recomiendo comprar en Supermercado 2";
    } else if (montosTotales[2] < montosTotales[1] && montosTotales[2] < montosTotales[0]) {
        mensaje = "Te recomiendo comprar en Supermercado 3";
    } else {
        mensaje = "Los precios son iguales en varios supermercados.";
    }
    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: 'info'
    });
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
