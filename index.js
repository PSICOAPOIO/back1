const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})

app.post('/usuario/insertdados', function (req, res) {
  const nome = req.body.nome
  const email = req.body.email
  const senha = req.body.senha
  const idusuario = req.body.idusuario

  const query =`INSERT INTO usuario (idusuario,nome, email, senha) VALUES ('${idusuario}','${nome}', '${email}','${senha}')`
  


 
  conn.query(query, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/')
  })
})

app.get('/usuario/:id', function (req, res) {
  const id = req.params.id
  
  const query = `SELECT * FROM usuario WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const usuario = data[0]

    console.log(data[0])

    res.render('usuario', {usuario})
  })
})

app.get('/usuario/:id',(req,res)=>{
  const id = req.params.id

  const query =`SELECT * FROM usuario WHERE id = ${id}`

  conn.query(query, function(err, data){
    if (err) {
      console.log(err)
      return
    }
    const usuario=data[0]
  })
})


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'psicoapoio_bd',
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Conectado ao MySQL!')

  app.listen(3000)
})


