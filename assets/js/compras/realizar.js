// Variables
const filtrarProds = document.getElementById('filtrarProds')
const colprods = document.querySelectorAll('.colprod')
const buttons = document.querySelectorAll('.addItem')

// Callbacks
const filtrarProductos = () => {
    // Cada vez que se realizan 
    const nombre = document.getElementById('nombre').value
    const comp = document.getElementById('composicion').value
    const pre = document.getElementById('presentacion').value

    for (const colprod of colprods) {
        // colprod.style.display = 'none'
        // Aquellas clases poseen la propiedad textContent, que almacenan el contenido del elemento
        const cardNombre = colprod.querySelector('.card-nombre').textContent
        const cardComp = colprod.querySelector('.card-comp').textContent
        const cardPre = colprod.querySelector('.card-pre').textContent
        // console.log(cardNombre);
        if(cardNombre.trim().toLowerCase().includes(nombre.trim().toLowerCase()) &&
           cardComp.trim().toLowerCase().includes(comp.trim().toLowerCase()) &&
           cardPre.trim().toLowerCase().includes(pre.trim().toLowerCase())
        ) {
            colprod.style.display = 'block'
        } else {
            colprod.style.display = 'none'
        }
    }
    // To Do opcional: considerar realizar una lista de colprods y 
    // filtrar aquellas opciones que cumplan con la propiedad filter

    limpiarCampos()
}

const limpiarCampos = () => {
    const nombre = document.getElementById('nombre')
    const comp = document.getElementById('composicion')
    const pre = document.getElementById('presentacion')

    nombre.value = ''
    comp.value = ''
    pre.value = ''
}

const agregarProducto = (e) => {
    const { id } = e.target
    // console.log(e.target.getBoundingClientRect());
    console.log(e.target);
}

// Eventos
filtrarProds.addEventListener('click', filtrarProductos)

for (const but of buttons) {
    but.style.fontWeight = 700
    but.addEventListener('click', agregarProducto)
}

// Anotaciones extra de codigo

// colprods[0].style.display = 'block'
// const nomprodLike = '% || ' + nombre.value + ' || %'
// const compLike = '% || ' + composicion.value + ' || %'
// const preLike = '% || ' + presentacion.value + ' || %'

// const query = {
//     text: 'select p."nombreProducto", p."composicion", pre."nombrePresentacion", lot."stock" \
//     from "Producto" p, "Presentacion" pre, "LoteProducto" lot \
//     where p."idPresentacion" = pre."idPresentacion" \
//     and lot."idProducto" = p."idProducto" \
//     and lot."estado" = $1, \
//     and p."nombreProducto" like $2, \
//     and p."composicion" like $3, \
//     and pre."nombrePresentacion" like $4',
//     values: ['Activo', nomprodLike, compLike, preLike]
// }
