const init = (function setup() {
    const btnEsCliente = document.getElementById('esCliente'),
        btnEsVisitante = document.getElementById('esVisitante'),
        arrObj = {
            value: [],
            getValue() {
                return this.value
            },
            setValue(newVal) {
                this.value = newVal
            },
            appendValue(newVal) {
                this.value.push(newVal)
            },
        }
        
    function login() {
        console.log(btnEsCliente.textContent)
        console.log(btnEsVisitante.textContent)
        
    }
    return {
        login
    }
}());

// Funcion que se ejecuta cada vez que se carga la pagina
init.login()