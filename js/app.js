let nombreUsuario = prompt("Por favor ingrese su nombre:")
alert ("Hola " + nombreUsuario + " bienvenid@ al comparador de precios")
const supermercados =["Supermercado1", "Supermercado2", "Supermercado3"];
let productos = ["arroz", "fideos", "azucar", "envío"];
let preciosSupermercados = [
[2890 , 980, 1390, 0 ], //precios en supermercado 1
[2690 , 870, 1490, 1000 ], //precios en supermercado 2
[2050, 990, 1390, 2000] //precios en supermercado 3
]; 


let producto = prompt ("selecciona un precio para comparar: arroz, fideos, azucar, envío")
if (producto != productos) {
    alert ("intenta otra vez, no tenemos ese producto en inventario")
} 


function resultados (producto, precios){
    producto = preciosSupermercados 
}