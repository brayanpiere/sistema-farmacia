const cargarModalAddCargo = () => {
    modalAddCargo.toggle();
}

const mostrarValores = (e) => {
    console.log(e.target.parentNode.parentNode.childNodes[5].textContent.trim())
}

const main = () => {

    const divModalAddCargo = document.querySelector("#modal_addCargo");
    modalAddCargo = new bootstrap.Modal(divModalAddCargo);

    const btnAddCargo = document.querySelector("#btn-addCargo");
    btnAddCargo.addEventListener("click", cargarModalAddCargo);

    const btnModificar = document.querySelectorAll(".modificar");
    // console.log(btnModificar);
    for (const but of btnModificar) {
        but.addEventListener("click", mostrarValores)
    }

    const btnEliminar = document.querySelector(".eliminar");
}

window.addEventListener("load", main);