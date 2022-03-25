const cargarModalAddCargo = () => {
    modalAddCargo.toggle();
}

const main = () => {

    const divModalAddCargo = document.querySelector("#modal_addCargo");
    modalAddCargo = new bootstrap.Modal(divModalAddCargo);

    const btnAddCargo = document.querySelector("#btn-addCargo");
    btnAddCargo.addEventListener("click", cargarModalAddCargo);

    
}

window.addEventListener("load", main);