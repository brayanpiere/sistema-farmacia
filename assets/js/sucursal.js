const cargarModalAddSucursal = () => {
    modalAddSucursal.toggle();
}


const main = () => {

    const divModalAddSucursal = document.querySelector("#modal_addSucursal");
    modalAddSucursal = new bootstrap.Modal(divModalAddSucursal);

    //const divModalEditEmp = document.querySelector("#modal_EditEmp");
    //modalEditEmp = new bootstrap.Modal(divModalEditEmp);

    const btnAddSucursal = document.querySelector("#btn-addSucursal");
    btnAddSucursal.addEventListener("click", cargarModalAddSucursal);
/*
    const btnModificar = document.querySelectorAll(".modificar");
    for (const but of btnModificar) {
        but.addEventListener("click", cargarModalEditEmp)
    }
  */  
}

window.addEventListener("load", main);