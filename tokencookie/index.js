
// importacao dos modulos necessarios
var express = require('express')
var redis = require('redis') // importa driver conexao redis
var cookie = require('cookie-parser')
var jwt = require('jsonwebtoken') // geracao de tokens

// instanciar o servidor de aplicacao
var app = express()

// cria um cliente para o redis
var cli = redis.createClient()
	
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
	
	// usuario "fake" teste / 123
	if (username == 'teste' && senha == '123') {
	
		// gerar o token
		var token = jwt.sign({ username }, 'minhachavesecreta')
		// persiste o token no redis um hash - hset [chave, atributos]
		cli.hmset([token, 'corfrente', '#', 'corfundo', '#'], function (err, res){
			console.log(err)
		})
		// grava o cookie
		res.cookie('tokencookie',token)
		// redireciona para a pagina de configuracao de perfil
		res.sendFile(__dirname + "/public/perfil.html");
		
	} else {
		res.send('Acesso negado!')
	}
	
})

app.get('/testeredis', function (req, res){
	

	cli.set('mensagem', 'Conexao redis ok')
	
	res.send('<h1>Teste feito</h1>')
	
})

// requisicao para remover o cookie da requisicao
app.get('/remove', function (req, res){

        // remove o cookie (clear) chamado tokencookie
 	res.clearCookie('tokencookie')
        res.status(200).send('Cookie removido!')

})

// DESAFIO#1 - aceitar requisições POST no contexto /perfil


// inicia o servidor na porta 5000
app.listen(5000, function () {
	console.log('Servidor atendendo na porta 5000')
})
