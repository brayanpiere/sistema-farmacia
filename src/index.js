const express = require('express');
const app = express();
const router = require('../routes/routes');
const bodyParser = require('body-parser');
const path = require('path');
const ventasRoutes = require('../routes/ventas')
const comprasRoutes = require('../routes/compras')
const cargosRoutes = require('../routes/cargo')
const EmpleadosRoutes = require('../routes/empleado')
const SucursalesRoutes = require('../routes/sucursal')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended :true
}))
app.use(express.static('assets'));
app.set('port', 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(router);
app.use('/', router)
app.use('/ventas', ventasRoutes)
app.use('/compras', comprasRoutes)
app.use('/cargos', cargosRoutes)
app.use('/empleados', EmpleadosRoutes)
app.use('/sucursales', SucursalesRoutes)
// NOTA:
// Si tuvieramos que definir aquí una ruta, cuya sintaxis posee un parametro, ej:
// /productos/:id/
// tendríamos que agregar el paramatro { mergeParams: true } al momento de definir el router
// En el router: const router = Router({ mergeParams: true })
// Así podemos rescatar el parámetro ":id" definido en la ruta inicial

app.get('/', (req, res) => {
    res.send('<h1>Welcome home!</h1><p>Ver <a href="/ventas">ventas</a>.</p><p>Ver <a href="/compras">compras</a>.</p>')
})

app.listen(app.get('port'), () => console.log('Serving on port 5000.'))