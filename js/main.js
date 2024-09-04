const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);//me trae un arreglo de elementos con cero hago referencia al número cero
const contadorProductos = document.getElementById("contadorProductos")
const productosTotal = document.getElementById("productosTotal")
const precioTotal = document.getElementById("precioTotal")

//bandera, al ser true permite agregar los datos a la tabla
let isValid = true; //es una vareable booleana 
let contador = 0; //me cuenta los renglones de la tabla
let precio = 0;//defino precio salde del Random
let costoTotal = 0;//es importante poner un valor de inicio para que no aparezca como que no está establecido
let totalEnProductos = 0;

//Guardar los datos de la tabla
let datos = new Array();

function validarCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    }//length==0

    if (isNaN(txtNumber.value)) {
        return false;
    }// isNaN

    if (Number(txtNumber.value) <= 0) {
        return false;
    }//<0

    return true;
}//validarCantidad()

//Crear un precio al azar con una función que me permite inventar el precio
//ya sea directo o que lo mande a llamar 
//en cosola: get precio()
function getPrecio() {
    return Math.round((Math.random() * 10000)) / 100;

}//obtener precio al azar (consultar Math en la documentación)

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault()//tengo que decirle que deje de hacer lo que por default hace se botón, si el botón es de submit se va a actualizar la página, para prevernir lo que hacer por dafult el botón
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    isValid = true; //va aquí si no, no funciona
    //Validar nombre del producto
    if (txtNombre.value.length < 3) {
        txtNombre.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = "El <strong>Nombre</strong> no es correcto.<br/>";
        alertValidaciones.style.display = "block";
        isValid = false;
        //return false;

    }//if lenght<3

    //validar cantidad
    if (!validarCantidad()) {
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "La <strong>Cantidad</strong> no es correcto.<br/>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }//! validarCantidad

    //agregar elementos a la tabla
    if (isValid) {
        contador++;
        precio = getPrecio();
        let row = `<tr>
                  <td>${contador}</td>
                  <td>${txtNombre.value}</td>
                  <td>${txtNumber.value}</td>
                 <td>${precio}</td>
    </tr>`;

    let elemento ={"contador": contador,
                    "nombre": txtNombre.value,
                    "cantidad":txtNumber.value,
                    "precio": precio};
     
    datos.push(elemento);
    localStorage.setItem ("datos", JSON.stringify(datos));        

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        totalEnProductos += Number(txtNumber.value);
        contadorProductos.innerText = contador;
        productosTotal.innerText=totalEnProductos;
        precioTotal.innerText="$ " + costoTotal.toFixed(2);

        localStorage.setItem("contador", contador);//de inicio contador tiene 0
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);


        txtNombre.value = "";//borra y regresa
        txtNumber.value = "";
        txtNombre.focus();

    }//isValid, cualquier validación que falle será falso y ya no lo agrega a la tabla


}); //btnAgregar.addEventListener (aquí termina)

btnClear.addEventListener("click", function(event){
    event.preventDefault();
     //Limpiar el valor de los campos
     txtNombre.value="";
     txtNumber.value="";
     //Limpiar el localStorage
     //localStorage.removeItem("contador");//quita elemento por elemento 
     //localStorage.removeItem("costoTotal");
     //localStorage.removeItem("totalEnProductos");
     //Elimina todo el contenido del local storage
     localStorage.clear();
     //Limpiar la tabla
     cuerpoTabla.innerHTML="";
     //Reiniciar las variables, contador, costoTotal, totalEnProductos
     contador=0; //Asignamos valor solamente ya están definidas
     costoTotal =0;
     totalEnProductos =0;
     //Asinar las variables a los divs
     //se pueden asignar manuamente los valores, pero es pérdida de tiempo
     contadorProductos.innerText = contador; //viene de arriba
     productosTotal.innerText=totalEnProductos;
     precioTotal.innerText="$ " + costoTotal.toFixed(2);
     //Oculatar alertas
     alertValidaciones.innerHTML="";
     alertValidaciones.style.display="none";
     //Quitar los bordes
     txtNombre.style.border = "";
     txtNumber.style.border = "";
     //Manda el foco al campo nombre
     txtNombre.focus();

});





//evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function (_event) {
    txtNombre.value = txtNombre.value.trim();
});// txtNombre.addEventListener

txtNumber.addEventListener("blur", function (_event) {
    txtNumber.value = txtNumber.value.trim();

});


//cuando termine de cargar la pagina, empieza a ejecutar esto
window.addEventListener("load", function(){//load hace que cargue todo
 
    if(this.localStorage.getItem("contador") !=null){ //si no tiene nada marca null, como cuando entras por primera vez a la página
        contador = Number(this.localStorage.getItem("contador"));
    }//!=null

    if(this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }
    
    if (this.localStorage.getItem("costoTotal") !=null){
        costoTotal = Number (this.localStorage.getItem("costoTotal"));
    }//!=null
     
    contadorProductos.innerText = contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText="$ " + costoTotal.toFixed(2);
     
    if (this.localStorage.getItem("datos") !=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//!=null
    datos.forEach(r => {
        let row = `<tr>
                     <td>${r.contador}</td>
                     <td>${r.nombre}</td>
                     <td>${r.cantidad}</td>
                     <td>${r.precio}</td>
                  </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
    });

});//window load

