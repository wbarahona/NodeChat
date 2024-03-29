var express 	= require('express'),
	app			= express(),
	server		= require('http').createServer(app),
	io			= require('socket.io').listen(server, {'close timeout': 5}),
	mongoose 	= require('mongoose'),
	ChatModel	= require('./libs/db').ChatModel,
	users		= {}

io.enable('browser client minification')
io.set('transports', [ 'xhr-polling', 'jsonp-polling', 'htmlfile' ])
app
  .set('port', 3000)
  .use(express.static(__dirname+'/public'))

server.listen(app.get('port'))

app.get('/', function(req,res){
	res.sendfile(__dirname+'/index.html')
})

io.sockets.on('connection', function (socket) {
	var query = ChatModel.find({})
	query.sort('-created').limit(8).exec(function(err, docs){
		if(err) throw err
		socket.emit('load old msgs', docs)
	})

	socket.on('send message', function (data, callback) {
		var msg = data.trim(),
			newMsg = new ChatModel({msg: msg, nick: socket.nickname})
		newMsg.save(function(err){
			if(err) throw err
			io.sockets.emit('new message', {msg: msg, nick: socket.nickname})
		})
	})

	socket.on('new user', function (data, callback) {
		if( data in users ) {
			callback(false)
		} else {
			callback(true)
			socket.nickname = data
			users[socket.nickname] = socket
			update_nicknames()
		}
	})

	socket.on('disconnect', function (data) {
		if(!socket.nickname) return
		delete users[socket.nickname]
		update_nicknames()
	});

	function update_nicknames() {
		io.sockets.emit('usernames', Object.keys(users))
	}

})