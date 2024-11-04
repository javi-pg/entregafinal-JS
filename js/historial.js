document.addEventListener("DOMContentLoaded", function () {
    const listaHistorial = document.getElementById("listaHistorial");
    const historialComparaciones = JSON.parse(localStorage.getItem("historialComparaciones")) || [];

    const conteoProductos = {};

    historialComparaciones.forEach(comparacion => {
        const itemHistorial = document.createElement("li");
        itemHistorial.textContent = comparacion;
        listaHistorial.appendChild(itemHistorial);
    const producto = comparacion;
    conteoProductos[producto] = (conteoProductos[producto] || 0) + 1; 
});
    const resumenArray = Object.entries(conteoProductos).map(([producto, cantidad]) => `${cantidad}`).join(", ");
    const resumenText = document.getElementById("resumenText");
    resumenText.textContent = `Se han agregado al carro (arroz, fideos, azucar): (${resumenArray}). ` ;
    //Boton volver
    const botonVolver = document.getElementById("volver");
    botonVolver.addEventListener("click", function() {
        window.location.href = "index.html";
    });
    //Funcionalidad botón borrar 
    const botonBorrarHistorial = document.getElementById("borrarHistorial");
    botonBorrarHistorial.addEventListener("click", function() {
    localStorage.removeItem("historialComparaciones");
    alert("El historial ha sido borrado."); // Notificación al usuario
    });
});