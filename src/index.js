const express = require('express');
const app = express();
const router=require('../routes/routes');
const bodyParser = require('body-parser');
const path = require('path');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended :true
}))
app.use(express.static('assets'));
app.set('port',5000);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);

app.listen(app.get('port'),()=>{
    console.log('server on port 5000');
})