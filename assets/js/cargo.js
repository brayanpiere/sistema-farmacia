const cargarModalAddCargo = () => {
    modalAddCargo.toggle();
}

const cargarModalEditCargo = (e) => {
    console.log(e.target.parentNode.parentNode.childNodes[5].textContent.trim())
    const txtIdCargo = document.querySelector("#idCargo-m")
    const txtDescCargo = document.querySelector("#descCargo-m")
    txtIdCargo.value=e.target.parentNode.parentNode.childNodes[3].textContent.trim()
    txtDescCargo.value=e.target.parentNode.parentNode.childNodes[5].textContent.trim()
    console.log(txtIdCargo);
    modalEditCargo.toggle();
}

const main = () => {

    const divModalAddCargo = document.querySelector("#modal_addCargo");
    modalAddCargo = new bootstrap.Modal(divModalAddCargo);

    const divModalEditCargo = document.querySelector("#modal_editCargo");
    modalEditCargo = new bootstrap.Modal(divModalEditCargo);

    const btnAddCargo = document.querySelector("#btn-addCargo");
    btnAddCargo.addEventListener("click", cargarModalAddCargo);

    const btnModificar = document.querySelectorAll(".modificar");
    for (const but of btnModificar) {
        but.addEventListener("click", cargarModalEditCargo)
    }

    const btnEliminar = document.querySelector(".eliminar");
}

window.addEventListener("load", main);