const init = (function setup() {
    const btnEsCliente = document.getElementById('esCliente'),
        btnEsVisitante = document.getElementById('esVisitante')
        
    const tipoComp = document.getElementById('tipocomp')
    const tipoCompCol = document.getElementById('tipocompcol')
    const garbage = { elements: [] }

    function login() {
        console.log(btnEsCliente.textContent)
        console.log(btnEsVisitante.textContent)
        
    }

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

    // Listeners
    btnEsCliente.addEventListener("click", () => console.log("esCliente"))
    btnEsVisitante.addEventListener("click", () => console.log("esVisitante"))
    tipoComp.addEventListener('change', displayCompCol)

    // Initializers
    displayCompCol()

    // Return to use outside
    // return {
    //     login
    // }
}());

// Funcion que se ejecuta cada vez que se carga la pagina
// init.login()