const cargarModalAddSucursal = () => {
    modalAddSucursal.toggle();
}

const cargarModalEditSucursal = (e) => {
    console.log(e.target.parentNode.parentNode.childNodes[5].textContent.trim())
    
    const txtIdSucursal = document.querySelector("#idSucursal-m")
    const txtaliasSucursal = document.querySelector("#aliasSucursal-m")
    const txtciudad = document.querySelector("#ciudad-m")
    txtIdSucursal.value=e.target.parentNode.parentNode.childNodes[3].textContent.trim()
    txtaliasSucursal.value=e.target.parentNode.parentNode.childNodes[5].textContent.trim()
    txtciudad.value=e.target.parentNode.parentNode.childNodes[7].textContent.trim()
    modalEditSucursal.toggle();
    
}


const main = () => {

    const divModalAddSucursal = document.querySelector("#modal_addSucursal");
    modalAddSucursal = new bootstrap.Modal(divModalAddSucursal);

    const divModalEditSucursal = document.querySelector("#modal_EditSucursal");
    modalEditSucursal = new bootstrap.Modal(divModalEditSucursal);

    const btnAddSucursal = document.querySelector("#btn-addSucursal");
    btnAddSucursal.addEventListener("click", cargarModalAddSucursal);

    const btnModificar = document.querySelectorAll(".modificar");
    for (const but of btnModificar) {
        but.addEventListener("click", cargarModalEditSucursal)
    }
  
}

window.addEventListener("load", main);