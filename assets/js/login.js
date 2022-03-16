const comenzar = () => {

    const inputNombre = document.querySelector("#input-usuario").value;
    if (inputNombre == "") {
        const divMensaje = document.querySelector("#mensaje-error");
        divMensaje.innerHTML = "";
        const divAlert = document.createElement("div");
        divAlert.setAttribute("class", "alert alert-danger");
        divAlert.innerText = "Debe Ingresar un Nom0bre";
        divMensaje.appendChild(divAlert);
    } else {
        console.log("entro 4");
    }
}

const main = () => {

    const btncomenzar = document.querySelector("#ingresar");
    btncomenzar.addEventListener("click", comenzar);    

}

window.addEventListener("load", main);