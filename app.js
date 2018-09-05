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
const mail= require('./routes/mails');
const unidades= require('./routes/unidades');
const clientes= require('./routes/clientes');

const  port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
app.use('/mail', mail);
app.use('/unidades', unidades);
app.use('/clientes', clientes);

app.get('/', (req,res) => {
    res.send('Invalido');
});

// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.hstm'));
// });


app.listen(port, () => {
    console.log("server iniciao en puerto: "+port)
});

