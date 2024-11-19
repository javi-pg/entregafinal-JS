document.addEventListener("DOMContentLoaded", async function () {
await cargarDatos();
let montosTotales = [0,0,0];
let historialComparaciones = JSON.parse(localStorage.getItem("historialComparaciones")) || []; 
let envioAgregado = [false, false, false]; 
const imagenProducto = document.getElementById("imagenProducto");
let nombreUsuario = "";

let productos = [];
let preciosSuper1 = [];
let preciosSuper2 = [];
let preciosSuper3 = [];
//fetch
async function cargarDatos() {
    try {
        const response = await fetch('precios.json');
        console.log('Estado del fetch:', response.status); 
        if (!response.ok) throw new Error('Error al cargar los datos');
        const data = await response.json();
        console.log('Datos cargados:', data); 
        productos = data.productos;
        preciosSuper1 = data.preciosSuper1;
        preciosSuper2 = data.preciosSuper2;
        preciosSuper3 = data.preciosSuper3;
    } catch (error) {
        console.error("Hubo un problema al cargar los datos:", error);
    }
}

const productoSelect = document.getElementById("producto");
const btnComparar = document.getElementById("comparar");
const btnFinalizar = document.getElementById("finalizar");
const listaResultados = document.getElementById("listaResultados");
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
           Swal.showValidationMessage("Debe ingresar su nombre para continuar"); //No continuar sin ingresar el nombre 
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

btnComparar.addEventListener("click", async function () {
    if (productos.length === 0 || preciosSuper1.length === 0) {
            Swal.fire({
                title: "Error",
                text: "Los datos aún no están disponibles. Intenta nuevamente.",
                icon: "error",
            });
            return;
        }
    
        const producto = productoSelect.value;
        montosTotales = actualizarTotales(productos, preciosSuper1, preciosSuper2, preciosSuper3, producto, montosTotales);
    
        // Guardar historial
        let comparacion = {
            producto: producto,
            supermercado1: preciosSuper1[productos.indexOf(producto)],
            supermercado2: preciosSuper2[productos.indexOf(producto)],
            supermercado3: preciosSuper3[productos.indexOf(producto)],
        };
        historialComparaciones.push(comparacion);
        localStorage.setItem("historialComparaciones", JSON.stringify(historialComparaciones));
    
        // Mostrar resultado parcial
        const resultadoParcial = document.createElement("li");
        resultadoParcial.textContent = `Comparación agregando ${producto}: Super1: ${montosTotales[0]}, Super2: ${montosTotales[1]}, Super3: ${montosTotales[2]}`;
        listaResultados.appendChild(resultadoParcial);
    });

//Guardar historial
    let comparacion =`Producto: ${producto}, Super1: ${preciosSuper1[productos.indexOf(producto)]}, Super2: ${preciosSuper2[productos.indexOf(producto)]}, Super3: ${preciosSuper3[productos.indexOf(producto)]}`;
    historialComparaciones.push(comparacion);
    localStorage.setItem("historialComparaciones", JSON.stringify(historialComparaciones));

//Mostrar resultado parcial 
    const resultadoParcial = document.createElement("li");
    resultadoParcial.textContent = `Comparación agregando ${producto}: Super1: ${montosTotales[0]}, Super2: ${montosTotales[1]}, Super3: ${montosTotales[2]}`;
    listaResultados.appendChild(resultadoParcial);

    btnFinalizar.addEventListener("click", function () {
        mostrarMejorPrecio(montosTotales, nombreUsuario);
        mostrarHistorial(historialComparaciones);
    });
    });

function actualizarTotales (productos, preciosSuper1, preciosSuper2, preciosSuper3, producto, montosTotales) {
    return new Promise((resolve, reject) => {
        try {
            let indice = productos.indexOf(producto);
            if (indice === -1) throw new Error("Producto no encontrado");

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
} catch (error) {
    reject(error);
    }
});
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

async function mostrarHistorial() {
    listaHistorial.innerHTML = "";
    const historial = await Promise.resolve(historialComparaciones);

    historial.forEach((comparacion) => {
        const itemHistorial = document.createElement("li");
        itemHistorial.textContent = `Producto: ${comparacion.producto}, Super1: ${comparacion.supermercado1}, Super2: ${comparacion.supermercado2}, Super3: ${comparacion.supermercado3}`;
        listaHistorial.appendChild(itemHistorial);
    });
}