const cargarModalAddEmp = () => {
    modalAddEmp.toggle();
}

const main = () => {

    const divModalAddEmp = document.querySelector("#modal_addEmp");
    modalAddEmp = new bootstrap.Modal(divModalAddEmp);

    const btnAddEmp = document.querySelector("#btn-addEmp");
    btnAddEmp.addEventListener("click", cargarModalAddEmp);


    
}

window.addEventListener("load", main);