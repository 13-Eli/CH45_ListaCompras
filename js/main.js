const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Nombre");
const txtNumber = document.getElementById("Numero");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }//length==0

    if(isNaN(txtNumber.value)){
        return false;
    }// isNaN

    if(Number(txtNumber.value)<=0){
        return false;
    }//<0
    return true;
    
}//validarCantidad()

btnAgregar.addEventListener("click", function (event){
  event.preventDefault()//temgo que decirle que deje de hacer lo que por default hace se botón, si el botón es de submit se va a actualizar la página, para prevernir lo que hacer por dafult el botón
    txtNombre.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

  if(txtNombre.value.length<3){
    txtNombre.style.border="solid red medium";
  alertValidacionesTexto.innerHTML = "El <strong>Nombre</strong> no es correcto.<br/>";
    alertValidaciones.style.display="block";
    //return false;
    
}//if lenght<3

//validar cantidad
if (! validarCantidad()){
    txtNumber.style.border="solid red medium";
    alertValidacionesTexto.innerHTML+= "La <strong>Cantidad</strong> no es correcto.<br/>";
    alertValidaciones.style.display="block";
}//! validarCantidad
  
}); //btnAgregar.addEventListener (aquí termina)
//evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim();
});// txtNombre.addEventListener

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.trim.value.trim();

)};


