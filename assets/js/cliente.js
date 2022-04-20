const cargarModalAddCliente = () => {
    modalAddCliente.toggle();
}

const cargarModalEditCliente = (e) => {
  
    const txtidCliente = document.querySelector("#idCliente-m")
    const txtnombreCliente = document.querySelector("#nombreCliente-m")
    const txtapellidoCliente = document.querySelector("#apellidosCliente-m")
    const txtdniCliente = document.querySelector("#dni-m")
    const txtrucCliente = document.querySelector("#ruc-m")
    const txtrsCliente = document.querySelector("#rs-m")
    const txtdireccionCliente = document.querySelector("#direccion-m")
    const txttelefonoCliente = document.querySelector("#telefono-m")
    const txtemailCliente = document.querySelector("#email-m")
    const txtsexoCliente = document.querySelector("#s-m")

    /*
    const txtestadoEmp = document.querySelector("#estadoEmp-m")
*/
txtidCliente.value=e.target.parentNode.parentNode.childNodes[3].textContent.trim()
txtnombreCliente.value=e.target.parentNode.parentNode.childNodes[5].textContent.trim()
txtapellidoCliente.value=e.target.parentNode.parentNode.childNodes[7].textContent.trim()
txtdniCliente.value=e.target.parentNode.parentNode.childNodes[9].textContent.trim()
txtrucCliente.value=e.target.parentNode.parentNode.childNodes[11].textContent.trim()
txtrsCliente.value=e.target.parentNode.parentNode.childNodes[13].textContent.trim()
txtdireccionCliente.value=e.target.parentNode.parentNode.childNodes[15].textContent.trim()
txttelefonoCliente.value=e.target.parentNode.parentNode.childNodes[17].textContent.trim()
txtemailCliente.value=e.target.parentNode.parentNode.childNodes[19].textContent.trim()
txtsexoCliente.value=e.target.parentNode.parentNode.childNodes[21].textContent.trim()
    /*
    txtestadoEmp.value=e.target.parentNode.parentNode.childNodes[19].textContent.trim()
    console.log(txtIdCargo);
    */
    modalEditCliente.toggle();
}

const main = () => {

    const divModalAddCliente = document.querySelector("#modal_addCliente");
    modalAddCliente = new bootstrap.Modal(divModalAddCliente);

    const divModalEditCliente = document.querySelector("#modal_EditCliente");
    modalEditCliente = new bootstrap.Modal(divModalEditCliente);

    const btnAddEmp = document.querySelector("#btn-addliente");
    btnAddEmp.addEventListener("click", cargarModalAddCliente);

    
    const btnModificar = document.querySelectorAll(".modificar");
    for (const but of btnModificar) {
        but.addEventListener("click", cargarModalEditCliente)
    }
    
}

window.addEventListener("load", main);