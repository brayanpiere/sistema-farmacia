const init = (function setup() {
    const btnEsCliente = document.getElementById('esCliente'),
        btnEsVisitante = document.getElementById('esVisitante')

    const carrito = { elements: [] }

    const buscarForm = document.getElementById('buscarform'),
        subirForm = document.getElementById('subirform'),
        btnsAgregar = document.getElementsByClassName('addprod'),
        items = document.getElementById('items')
        
    const tipoComp = document.getElementById('tipocomp'),
        tipoCompCol = document.getElementById('tipocompcol')

    const garbage = { elements: [] }

    const createFormCol = ({ labelFor = '', labelText = "Campo" }, { type = "text", placeholder = "", min = 0, step = null }) => {
        // <div class="col">
        //     <div class="row row-cols-2">
        //         <div class="col-4">
        //             <label for="dni" class="offset-1 col-form-label">DNI</label>
        //         </div>
        //         <div class="col-8">
        //             <input type="text" class="form-control" id="dni" placeholder="Digite el DNI...">
        //         </div>
        //     </div>
        // </div>
        const mainCol = document.createElement('div')
        mainCol.classList.add("col")

        const infoRow = document.createElement('div')
        infoRow.classList.add("row", "row-cols-2")

        const labelCol = document.createElement('div')
        labelCol.classList.add("col-4")

        const labelEl = document.createElement('label')
        labelEl.classList.add("offset-1", "col-form-label")
        if(labelFor) labelEl.htmlFor = labelFor
        labelEl.textContent = labelText

        const inputCol = document.createElement('div')
        inputCol.classList.add("col-8")

        const inputEl = document.createElement('input')
        inputEl.classList.add("form-control")
        inputEl.type = type
        if(placeholder) inputEl.placeholder = placeholder
        if (type === 'number') {
            inputEl.setAttribute('min', min)
            if (step && !step.isNaN && step > 0) inputEl.step = step
        }
        if(labelFor) inputEl.setAttribute('id', labelFor)
        
        inputCol.appendChild(inputEl)
        labelCol.appendChild(labelEl)
        infoRow.append(labelCol, inputCol)
        mainCol.appendChild(infoRow)
        mainCol.id = `${labelFor}Col`
        return mainCol
    }

    const compColAppend = (labelFor = "", labelText = "Campo", placeholder = "", type = "text") => {
        const foundIndex = garbage.elements.findIndex(el => el.id === labelFor + 'Col')
        if (foundIndex === -1) {
            const mainCol = createFormCol(
                {
                    labelFor,
                    labelText
                },
                {
                    type,
                    placeholder
                }
            )
            return mainCol
        } else {
            const foundInfoCol = garbage.elements.splice(foundIndex, 1)[0]
            return foundInfoCol
        }
    }

    const displayCompCol = () => {
        tipoCompCol.hasChildNodes() && removeChildNodes(tipoCompCol)
        tipoCompCol.parentNode.style.display = 'block'
        switch (tipoComp.value) {
            case "1":
                const dniCol = compColAppend('dni', 'DNI', 'Digite su DNI...', 'number')
                tipoCompCol.appendChild(dniCol)
                console.log('Basura: ');
                console.log(garbage.elements)
                break;
        
            case "2":
                const rucCol = compColAppend('ruc', 'RUC', 'Digite el RUC...', 'number')
                const rsCol = compColAppend('razonsocial', 'Razón social', 'Digite la razón social...')
                const nroSerieCol = compColAppend('nroserie', 'Nro. de serie', 'Digite el número de serie...', 'number')
                const nroFacturaCol = compColAppend('nrofactura', 'Nro. de factura', 'Digite el número de factura...', 'number')
                tipoCompCol.append(rucCol, rsCol, nroSerieCol, nroFacturaCol)
                console.log('Basura: ');
                console.log(garbage.elements)
                break;
            
            default:
                tipoCompCol.parentNode.style.display = 'none'
                console.log('Basura: ');
                console.log(garbage.elements)
                break;
        }
    }

    const removeChildNodes = (DOMElement) => {
        while (DOMElement.firstChild) {
            garbage.elements.push(DOMElement.removeChild(DOMElement.firstChild))
        }
    }

    const verForm = (e) => {
        if (!!buscarForm.elements.producto.value.trim()) {
            buscarForm.elements.producto.value = buscarForm.elements.producto.value.trim()
        } else {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const subForm = (e) => {
        if(carrito.elements && carrito.elements.length > 0) {
            const subtotal = document.getElementById('subtotal')
            const igv = document.getElementById('igv')
            const descuento = document.getElementById('descuento')
            const total = document.getElementById('total')
            subirForm.append(
                createInputHidden('subtotal', subtotal),
                createInputHidden('igv', igv),
                createInputHidden('descuento', descuento),
                createInputHidden('total', total)
            )
        } else {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const createInputHidden = (inputName, inputEl) => {
        const hiddenInput = document.createElement('input')
        hiddenInput.type = 'hidden'
        hiddenInput.readOnly = true
        hiddenInput.id = inputName + 'field'
        hiddenInput.name = inputName
        hiddenInput.value = inputEl.textContent
        return hiddenInput
    }

    const addProd = (e) => {
        const fila = e.target.parentNode.parentNode
        // Creating the object
        const idProd = +e.target.id.trim().replace('add','')
        const foundIndex = carrito.elements.findIndex(el => el.idProd === idProd)
        if (foundIndex === -1) {
            const nombreProd = fila.getElementsByClassName('nombreprod')[0].textContent.trim()
            const preProd = fila.getElementsByClassName('preprod')[0].textContent.trim()
            const pruProd = +fila.getElementsByClassName('pruprod')[0].textContent.trim().replace('S/. ', '')
            const prodObj = {
                idProd,
                nombreProd,
                preProd,
                pruProd
            }
            carrito.elements.push(prodObj)
            // finding the rendered object on trash to reuse it
            const foundElInGarbage = garbage.elements.findIndex(el => +el.id.trim().replace('rowitem','') === idProd)
            if (foundElInGarbage === -1) {
                console.log("DOMEl creándose")
                items.appendChild(addProdRow(prodObj))
            } else {
                console.log("DOMEl encontrado")
                items.appendChild(garbage.elements.splice(foundElInGarbage, 1)[0])
            }
            saveItemsInLocalMemory()
        } else {
            console.log("El producto ya se encuentra en el carrito")
        }
        // console.log(carrito.elements);
    }

    const addProdRow = (prodObj) => {
        const prodRow = document.createElement('tr')
        prodRow.id = 'rowitem' + prodObj.idProd

        const nombreProd = document.createElement('th')
        nombreProd.scope = 'row'
        nombreProd.classList.add('text-start')
        nombreProd.textContent = prodObj.nombreProd
        prodRow.appendChild(nombreProd)

        const preProd = document.createElement('td')
        preProd.textContent = prodObj.preProd
        prodRow.appendChild(preProd)

        const cantProd = document.createElement('td')
        const inputCant = document.createElement('input')
        inputCant.id = 'cantprod' + prodObj.idProd
        inputCant.classList.add('form-control')
        inputCant.type = 'number'
        inputCant.min = 0
        inputCant.name = `items[${prodObj.idProd}][cant]`

        const precioProd = document.createElement('td')
        const flexDiv = document.createElement('div')
        flexDiv.classList.add('d-flex', 'justify-content-evenly', 'align-items-center', 'align-middle')
        const precioSpan = document.createElement('span')
        precioSpan.classList.add('align-baseline', 'ms-1', 'text-center')
        const precioText = document.createElement('span')
        precioText.textContent = 'S/. '
        const pxuField = document.createElement('span')
        pxuField.classList.add('precioxund')
        pxuField.hidden = true
        pxuField.textContent = prodObj.pruProd
        const precioField = document.createElement('span')
        precioField.classList.add('pricefield')
        precioField.textContent = (prodObj.pruProd * inputCant.value) || 0
        precioSpan.append(precioText, precioField)
        const btnElimSpan = document.createElement('span')
        const btnElim = document.createElement('button')
        btnElim.id = 'elim' + prodObj.idProd
        btnElim.classList.add('btn', 'btn-danger', 'btn-sm', 'py-1', 'px-2', 'fw-bold')
        btnElim.textContent = 'X'
        btnElim.addEventListener('click', rmProd)
        btnElimSpan.appendChild(btnElim)
        flexDiv.append(pxuField, precioSpan, btnElimSpan)

        inputCant.addEventListener('change', updatePrice)
        cantProd.appendChild(inputCant)
        prodRow.appendChild(cantProd)

        precioProd.appendChild(flexDiv)
        prodRow.appendChild(precioProd)

        return prodRow
    }

    const updatePrice = (e) => {
        const newVal = e.target.value
        const tr = e.target.parentNode.parentNode
        const precioxund = +tr.getElementsByClassName('precioxund')[0].textContent.trim()
        const preciofield = tr.getElementsByClassName('pricefield')[0]
        preciofield.textContent = (newVal * precioxund).toFixed(2) || 0
        calcCifras()
    }

    const rmProd = (e) => {
        const id = +e.target.id.trim().replace('elim','')
        const foundIndex = carrito.elements.findIndex(el => el.idProd === id)
        if(foundIndex === -1) {
            console.log('No se encontró el elemento')
        } else {
            carrito.elements.splice(foundIndex, 1)
            const removedElToGarbage = e.target.offsetParent.parentNode
            garbage.elements.push(items.removeChild(removedElToGarbage))
            saveItemsInLocalMemory()
        }
    }

    const calcCifras = () => {
        const subtotal = document.getElementById('subtotal')
        const tmpsubtotal = { value: 0 }
        const igv = document.getElementById('igv')
        const descuento = document.getElementById('descuento')
        const total = document.getElementById('total')
        const preciostotales = document.getElementsByClassName('pricefield')
        for (let i = 0, len = preciostotales.length; i < len; ++i) {
            tmpsubtotal.value += +preciostotales[i].textContent
        }
        subtotal.textContent = tmpsubtotal.value.toFixed(2)
        igv.textContent = (0.18*(+subtotal.textContent)).toFixed(2)
        descuento.textContent = "0"
        const tmpigv = +igv.textContent
        const tmpdescuento = +descuento.textContent
        const tmptotal = +subtotal.textContent + tmpigv - tmpdescuento
        total.textContent = tmptotal
    }

    // Almacenar en memoria
    const saveItemsInLocalMemory = () => localStorage.setItem('carrito', JSON.stringify(carrito.elements))
    const removeItemsFromLocalMemory = () => localStorage.removeItem('carrito')
    const renderItemsFromLocalMemory = () => {
        const carritotmp = JSON.parse(localStorage.getItem('carrito'))
        if (carritotmp && carritotmp.length > 0) {
            carrito.elements = carritotmp.slice()
            for (const item of carrito.elements) {
                items.appendChild(addProdRow(item))
            }
        } else {
            removeItemsFromLocalMemory()
        }
    }

    // Listeners generales
    btnEsCliente.addEventListener("click", () => console.log("esCliente"))
    btnEsVisitante.addEventListener("click", () => console.log("esVisitante"))
    tipoComp.addEventListener('change', displayCompCol)
    buscarForm.addEventListener('submit', verForm)
    subirForm.addEventListener('submit', subForm)
    for (const but of btnsAgregar) {
        but.addEventListener('click', addProd)
    }

    // Initializers
    displayCompCol()
    renderItemsFromLocalMemory()

    // Return to use outside
    // return {
    //     login
    // }
}());

// Funcion que se ejecuta cada vez que se carga la pagina
// init.login()