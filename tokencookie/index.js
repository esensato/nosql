
// importacao dos modulos necessarios
var express = require('express')
var redis = require('redis')

// instanciar o servidor de aplicacao
var app = express()

// responder a requisicoes do tipo GET
app.get('/', function (req, res){
	
	res.send('<h1>Servidor no ar!</h1>')
	
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