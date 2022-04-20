// To Do: preferably isolate all of this global variables into a containerized fuction using a namespacing pattern, such as IIFE
// See more: 'https://benalman.com/news/2010/11/immediately-invoked-function-expression/'

// Variables globales
const rowProductos = document.querySelector('.row-productos')
// Variables
const filtrarProds = document.getElementById('filtrarProds')
const colprods = document.querySelectorAll('.colprod')
const buttonsAdd = document.querySelectorAll('.addItem')
// Rejilla para agregar los productos
const listaItems = document.querySelector('.lista-items')
const garbage = []
const whitespaces = { elements: [] }
const tipoCompCol = document.getElementById('tipocompcol')
const tipoComp = document.getElementById('tipocomp')
const form = document.querySelector('form')

const items = []

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
    const { id, offsetParent } = e.target
    // console.log(e.target.getBoundingClientRect());
    const idProducto = +id.trim().replace('item','')
    const producto = {
        idProducto,
        nombreProducto: offsetParent.querySelector('.card-nombre').textContent.trim(),
        composicion: offsetParent.querySelector('.card-comp').textContent.trim(),
        nombrePresentacion: offsetParent.querySelector('.card-pre').textContent.trim()
    }
    const itemProducto = new Item(producto)
    if (items && items.length > 0) {
        const foundIndex = items.findIndex(item => item.idProducto === idProducto)
        // console.log("Found index: " + foundIndex);
        if (foundIndex === -1) {
            itemProducto.agregarItem()
            saveItemsInLocalMemory()
        } else {
            console.log("El producto ya se encuentra en el carrito. Elija otro.")
        }
    } else {
        itemProducto.agregarItem()
        saveItemsInLocalMemory()
    }
}

const eliminarProducto = (e) => {
    e.stopPropagation()
    const { id, offsetParent } = e.target
    const idProducto = +id.trim().replace('eitem','')
    const foundIndex = items.findIndex(item => item.idProducto === idProducto)
    if(foundIndex === -1) {
        console.log('No se pudo eliminar el producto: producto no registrado.')
    } else {
        items.splice(foundIndex, 1)
        const removedElToGarbage = offsetParent.parentNode
        garbage.push(listaItems.removeChild(removedElToGarbage))
        saveItemsInLocalMemory()
    }
}

class Item {
    // constructor(idProducto = null) {
    //     this.idProducto = idProducto
    // }
    constructor(item = 
        { 
            idProducto: null, 
            nombreProducto: 'Eutirox', 
            composicion: '50ug', 
            nombrePresentacion: 'Caja' 
        }
    ) {
        this.item = item
    }
    getItem() {
        const { item } = this
        return item
    }
    getHTMLElFromGarbage() {
        const { item } = this
        const foundIndex = garbage.findIndex(el => +el.id.trim().replace('colItem','') === item.idProducto)
        // if (foundIndex > -1) {
        //     const foundElInGarbage = garbage.splice(foundIndex, 1)
        //     return foundElInGarbage
        // }
        // it only has one element
        const foundEl = garbage.splice(foundIndex, 1)[0]
        return foundIndex === -1 ? null : foundEl
    }
    getHTMLElementItem() {
        const { item } = this
        const foundElInGarbage = this.getHTMLElFromGarbage()
        // console.log('Está en garbage?' + ' ' + !!foundElInGarbage)
        // console.log(foundElInGarbage);
        if (!!foundElInGarbage) return foundElInGarbage
        // (foundElInGarbage) && (foundElInGarbage)
        // Si no está en la basura, crear un nuevo elemento
        // Columna
        const mainCol = document.createElement('div')
        // mainCol.classList.add('col', 'col' + item.idProducto)
        mainCol.classList.add('col', 'item-col')
        mainCol.id = 'colItem' + item.idProducto
        // Carta
        const card = document.createElement('div')
        card.classList.add('card')
        // Carta - header
        const cardHeader = document.createElement('div')
        cardHeader.classList.add('card-header', 'd-flex', 'justify-content-between', 'align-items-center')
        // Detalles
        const details = document.createElement('span')
        // Titulo
        const cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title', 'mt-1')
        cardTitle.textContent = capitalize(item.nombreProducto)
        // Subtitulo
        const cardSubtitle = document.createElement('h6')
        cardSubtitle.classList.add('card-subtitle', 'text-muted', 'mb-2')
        cardSubtitle.textContent = capitalize(item.composicion)
        // Acciones
        const actions = document.createElement('span')
        // Botón eliminar
        const btnEliminar = document.createElement('button')
        btnEliminar.classList.add('btn', 'btn-danger', 'fw-bold', 'elimItem')
        btnEliminar.id = 'eitem' + item.idProducto
        btnEliminar.type = 'button'
        btnEliminar.textContent = 'X'
        // Agregar listener a btnEliminar para poder eliminarlo del DOM
        btnEliminar.addEventListener('click', eliminarProducto)
        // Adherir todo el header
        details.append(cardTitle, cardSubtitle)
        actions.appendChild(btnEliminar)
        cardHeader.append(details, actions)
        // Carta - body
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        // body - text
        const cardText = document.createElement('p')
        cardText.classList.add('card-text')
        cardText.textContent = 'Presentación: ' + capitalize(item.nombrePresentacion)
        const hr = document.createElement('hr')
        // Fila Rejilla Info
        const rejillaInfo = document.createElement('div')
        rejillaInfo.classList.add('row', 'row-cols-1', 'g-2')
        // LoteProducto infoCol
        const idCol = crearCampo(
            {
                labelId: {
                    name: 'id',
                    id: item.idProducto
                },
                labelText: ''
            },
            {
                type: 'number',
                placeholder: '',
                readonly: true,
                value: +item.idProducto
            }
        )
        idCol.style.display = 'none'
        const loteCol = crearCampo(
            {
                labelId: {
                    name: 'lote',
                    id: item.idProducto
                },
                labelText: 'Lote Producto'
            },
            {
                placeholder: 'Digite el lote del producto...'
            }
        )
        // Fecha Vencimiento infoCol
        const fechaVencCol = crearCampo(
            {
                labelId: {
                    name: 'fechavenc',
                    id: item.idProducto
                },
                labelText: 'Fecha Venc.'
            },
            {
                type: 'date',
                placeholder: 'Digite la fecha de vencimiento...'
            }
        )
        // Stock infoCol
        const stockCol = crearCampo(
            {
                labelId: {
                    name: 'stock',
                    id: item.idProducto
                },
                labelText: 'Inventario (Stock)'
            },
            {
                type: 'number',
                placeholder: 'Digite el stock del lote...',
            }
        )
        // Costo infoCol
        const costoCol = crearCampo(
            {
                labelId: {
                    name: 'costo',
                    id: item.idProducto
                },
                labelText: 'Costo (S/.)'
            },
            {
                type: 'number',
                placeholder: 'Digite el costo del lote...',
                step: 0.01
            }
        )
        // Agregar info a la rejilla
        rejillaInfo.append(idCol, loteCol, fechaVencCol, stockCol, costoCol)
        cardBody.append(cardText, hr, rejillaInfo)
        // Adherir la columna con la carta
        card.append(cardHeader, cardBody)
        mainCol.appendChild(card)
        // listaItems.appendChild(mainCol)
        return mainCol
    }
    agregarItem() {
        const item = this.getItem()
        const itemEl = this.getHTMLElementItem()
        items.push(item)
        listaItems.appendChild(itemEl)
    }
    // eliminarItem() {
    //     const { id } = this
    //     const colItem = listaItems.querySelector('.colItem' + id)
    // }
}

const crearCampo = ({ labelId = { }, labelText = '' }, { type = 'text', placeholder = '', disabled = false, readonly = false, value = null, min = 0, step = null }) => {
    // Example
    // const infoCol = '<div class="col"> \
    //     <div class="row row-cols-2 row-cols-md-1 row-cols-xl-2 align-items-center"> \
    //         <div class="col-4 col-md col-xl-4"> \
    //             <label for="costolote" class="offset-1 offset-md-0 col-form-label">Costo (S/. )</label> \
    //         </div> \
    //         <div class="col-8 col-md col-xl-8"> \
    //             <input type="number" class="form-control form-control-sm" id="costolote" placeholder="Digite el costo del lote..." min="0" step="0.01"> \
    //         </div> \
    //     </div> \
    // </div>'

    // info col
    const infoCol = document.createElement('div')
    infoCol.classList.add('col')
    // filas
    const camposInfo = document.createElement('div')
    camposInfo.classList.add('row', 'row-cols-2', 'row-cols-md-1', 'row-cols-xl-2', 'align-items-center')
    // label col
    const labelCol = document.createElement('div')
    labelCol.classList.add('col-4', 'col-md', 'col-xl-4')
    // label
    const label = document.createElement('label')
    label.htmlFor = labelId.name + labelId.id
    label.classList.add('offset-1', 'offset-md-0', 'col-form-label')
    label.textContent = labelText
    // input col
    const inputCol = document.createElement('div')
    inputCol.classList.add('col-8', 'col-md', 'col-xl-8')
    // input
    const input = document.createElement('input')
    input.type = type
    input.name = labelId.id ? `items[${ labelId.id }][${ labelId.name }]` : labelId.name
    // console.log(type);
    if (type === 'number') {
        input.setAttribute('min', min)
        if (step && !step.isNaN && step > 0) input.step = step
    }
    input.classList.add('form-control', 'form-control-sm')
    input.setAttribute('id', labelId.name + labelId.id)
    if (placeholder && placeholder.length > 0) input.placeholder = placeholder
    if (disabled) input.disabled = true
    if (readonly) input.readOnly = true
    if (!!value) input.setAttribute('value', value)
    // Agregar los datos a una columna de info
    labelCol.appendChild(label)
    inputCol.appendChild(input)
    camposInfo.append(labelCol, inputCol)
    infoCol.appendChild(camposInfo)
    return infoCol
}

const displayCompCol = (e = null) => {
    e && e.stopPropagation()
    console.log(tipoCompCol.childNodes);
    tipoCompCol.hasChildNodes() && removeChildNodes(tipoCompCol)
    tipoCompCol.parentNode.style.display = 'block'
    switch (tipoComp.value) {
        case "1":
            const dniCol = compColAppend('dni', 'DNI', 'Digite su DNI...', 'number')
            tipoCompCol.appendChild(dniCol)
            console.log('Basura: ');
            console.log(garbage)
            break;
    
        case "2":
            const rucCol = compColAppend('ruc', 'RUC', 'Digite el RUC...', 'number')
            const rsCol = compColAppend('razonsocial', 'Razón social', 'Digite la razón social...')
            const nroSerieCol = compColAppend('nroserie', 'Nro. de serie', 'Digite el número de serie...', 'number')
            const nroFacturaCol = compColAppend('nrofactura', 'Nro. de factura', 'Digite el número de factura...', 'number')
            tipoCompCol.append(rucCol, rsCol, nroSerieCol, nroFacturaCol)
            console.log('Basura: ');
            console.log(garbage)
            break;
        
        default:
            tipoCompCol.parentNode.style.display = 'none'
            console.log('Basura: ');
            console.log(garbage)
            break;
    }
}

// Solo para crear campos para información de compras en general
const compColAppend = (labelName = '', labelText = 'Texto de la etiqueta', placeholder = '', type = 'text') => {
    const foundIndex = garbage.findIndex(el => el.id === labelName + 'Col')
    if (foundIndex === -1) {
        const infoCol = crearCampo(
            {
                labelId: {
                    name: labelName,
                    id: ''
                },
                labelText
            },
            {
                type,
                placeholder
            }
        )
        infoCol.id = labelName + 'Col'
        return infoCol
    } else {
        const foundInfoCol = garbage.splice(foundIndex, 1)[0]
        console.log('Elemento encontrado: ')
        console.log(foundInfoCol)
        return foundInfoCol
    }
}

// Funciones de mantenimiento de pagina

const capitalize = (word) => (word && word.length > 0) && (word[0].toUpperCase() + word.slice(1).toLowerCase())

const created = (e) => {
    removeWhitespaceChilds(e.target.body)
    removeWhitespaceChilds(rowProductos)
    // Si no existe memoria local, asignar un array para guardar los items
    !localStorage.getItem('items') && localStorage.setItem('items', JSON.stringify(items))
    refreshItems()
    displayCompCol()
}

const refreshItems = () => {
    const savedItems = JSON.parse(localStorage.getItem('items'))
    if (savedItems && savedItems.length > 0) items.push(...savedItems)
    if (items && items.length > 0) {    
        for (const item of items) {
            const itemEl = new Item(item)
            listaItems.appendChild(itemEl.getHTMLElementItem())
        }
    } else {
        // removeChildNodes(listaItems)
        const notFoundCol = document.createElement('div')
        // console.log('No se encontraron items');
    }
}

const saveItemsInLocalMemory = () => localStorage.setItem('items', JSON.stringify(items))
const removeItemsFromLocalMemory = () => localStorage.removeItem('items')

const removeChildNodes = (DOMElement) => {
    while (DOMElement.firstChild) {
        garbage.push(DOMElement.removeChild(DOMElement.firstChild))
    }
}

const removeWhitespaceChilds = (DOMElement) => {
    const { childNodes } = DOMElement
    Array.from(childNodes, cn => {
        if (cn.nodeType === 3) {
            const whitespaceNode = DOMElement.removeChild(cn)
            whitespaces.elements.push(whitespaceNode)
        }
    })
    whitespaces.elements = []
}

// Eventos
filtrarProds.addEventListener('click', filtrarProductos)

for (const but of buttonsAdd) {
    but.addEventListener('click', agregarProducto)
}

window.addEventListener('DOMContentLoaded', created)

tipoComp.addEventListener('change', displayCompCol)

form.addEventListener('submit', () => {
    localStorage.removeItem('items')
})
