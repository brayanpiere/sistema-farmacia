const cargarModalAddEmp = () => {
    modalAddEmp.toggle();
}

const cargarModalEditEmp = (e) => {
  
    const txtidEMp = document.querySelector("#idEmp-m")
    const txtnombreEmp = document.querySelector("#nombreEmp-m")
    const txtapellidoEmp = document.querySelector("#apellidoEmp-m")
    const txtdniEmp = document.querySelector("#dniEmp-m")
    const txttelefonoEmp = document.querySelector("#telefonoEmp-m")
    const txtemailEmp = document.querySelector("#emailEmp-m")
    const txtsalarioEmp = document.querySelector("#salarioEmp-m")
    const txtidcargoEmp = document.querySelector("#idcargoEmp-m")

    /*
    const txtestadoEmp = document.querySelector("#estadoEmp-m")
*/
    txtidEMp.value=e.target.parentNode.parentNode.childNodes[3].textContent.trim()
    txtnombreEmp.value=e.target.parentNode.parentNode.childNodes[5].textContent.trim()
    txtapellidoEmp.value=e.target.parentNode.parentNode.childNodes[7].textContent.trim()
    txtdniEmp.value=e.target.parentNode.parentNode.childNodes[9].textContent.trim()
    txttelefonoEmp.value=e.target.parentNode.parentNode.childNodes[11].textContent.trim()
    txtemailEmp.value=e.target.parentNode.parentNode.childNodes[13].textContent.trim()
    txtsalarioEmp.value=e.target.parentNode.parentNode.childNodes[15].textContent.trim()
    txtidcargoEmp.value=e.target.parentNode.parentNode.childNodes[19].textContent.trim()
    /*
    txtestadoEmp.value=e.target.parentNode.parentNode.childNodes[19].textContent.trim()
    console.log(txtIdCargo);
    */
    modalEditEmp.toggle();
}

const main = () => {

    const divModalAddEmp = document.querySelector("#modal_addEmp");
    modalAddEmp = new bootstrap.Modal(divModalAddEmp);

    const divModalEditEmp = document.querySelector("#modal_EditEmp");
    modalEditEmp = new bootstrap.Modal(divModalEditEmp);

    const btnAddEmp = document.querySelector("#btn-addEmp");
    btnAddEmp.addEventListener("click", cargarModalAddEmp);

    const btnModificar = document.querySelectorAll(".modificar");
    for (const but of btnModificar) {
        but.addEventListener("click", cargarModalEditEmp)
    }
    
}

window.addEventListener("load", main);