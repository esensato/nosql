
// importacao dos modulos necessarios
var express = require('express')
var redis = require('redis')
var cookie = require('cookie-parser')

// instanciar o servidor de aplicacao
var app = express()

// ativa uso de cookies na aplicacao
app.use(cookie())
// define que o conteudo estatico sera colocado na pasta public
app.use(express.static('public'))
// ativar a manipulacao de formularios html (form)
app.use(express.urlencoded({ extended: true }))

// responder a requisicoes do tipo GET
app.get('/', function (req, res){

	// verifica se ja possui o cookie com o token
	var temCookie = req.cookies.tokencookie
	
	if (temCookie) {
		res.send('<h1>Cookie - SIM!</h1>')		
	} else {
		// retorna a pagina de login localizada em .../tokencookie/public/login.html
		res.sendFile(__dirname + "/public/login.html");
	}
	
})

// responder ao login (POST)
app.post('/login', function (req, res){
	var username = req.body.username // acesso ao conteudo do campo username do form login.html
	var senha = req.body.senha
	console.log('Username = ' + username)
	res.send('ok')
})

app.get('/testeredis', function (req, res){
	
	// cria um cliente para o redis
	var cli = redis.createClient()
	cli.set('mensagem', 'Conexao redis ok')
	
	res.send('<h1>Teste feito</h1>')
	
})

// inicia o servidor na porta 5000
app.listen(5000, function () {
	console.log('Servidor atendendo na porta 5000')
})