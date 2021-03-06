/**
 * Created by fprospitti on 5/10/2017.
 */
const  express=require('express');
const  path=require('path');
const  bodyParser=require('body-parser');
const  cors=require('cors');
const  passport=require('passport');
const  mongoose=require('mongoose');
const  config=require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connectado', () =>{
   console.log('Conectado a: '+config.database)
});

mongoose.connection.on('erro', (err) =>{
    console.log('Error a: '+config.database)
});


const  app=express();

const users= require('./routes/users');
const clientes= require('./routes/clientes');
const estados= require('./routes/estados');
const movimientos= require('./routes/movimientos');
const caracteristicas= require('./routes/caracteristicas');


const  port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
app.use('/clientes', clientes);
app.use('/estados', estados);
app.use('/movimientos', movimientos);
app.use('/caracteristicas', caracteristicas);

app.get('/', (req,res) => {
    res.send('URL Invalida');
});

// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.hstm'));
// });


app.listen(port, () => {
    console.log("Servidor iniciado en puerto: "+port)
});

