const cargarModalAddUsuarioEmp = () => {
    modaladdUsuarioEmp.toggle();
}

const cargarModalEditUsuarioEmp = (e) => {
    console.log('entro');
    
    //console.log(e.target.parentNode.parentNode.childNodes[5].textContent.trim())
    
    const txtIdUsuario = document.querySelector("#idUsuario-m")
    const txtPassUsuario = document.querySelector("#pass-m")
    const comboIdSucursal = document.querySelector("#idSucursal-m")
    txtIdUsuario.value=e.target.parentNode.parentNode.childNodes[3].textContent.trim()
    txtPassUsuario.value=e.target.parentNode.parentNode.childNodes[5].textContent.trim()
    comboIdSucursal.value=e.target.parentNode.parentNode.childNodes[9].textContent.trim()
    
    modalEditUsuarioEmp.toggle();
    
}


const main = () => {

    const divModaladdUsuarioEmp = document.querySelector("#modal_addUsuarioEmp");
    modaladdUsuarioEmp = new bootstrap.Modal(divModaladdUsuarioEmp);

    const divModalEditUsuarioEmp = document.querySelector("#modal_EditUsuarioEmp");
    modalEditUsuarioEmp = new bootstrap.Modal(divModalEditUsuarioEmp);

    const btnAddUsuarioEmp = document.querySelector("#btn-addUsuarioEmp");
    btnAddUsuarioEmp.addEventListener("click", cargarModalAddUsuarioEmp);

    const btnModificar = document.querySelectorAll(".modificar");
    for (const but of btnModificar) {
        but.addEventListener("click", cargarModalEditUsuarioEmp)
    }

}

window.addEventListener("load", main);