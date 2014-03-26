var mongoose = require('mongoose')

// Connection
mongoose.connect('mongodb://localhost/chat', function(err){
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to Mongo');
	}
})

// Chat Schema
var chatSchema = mongoose.Schema({
	nick: String,
	msg: String,
	created: {type: Date, default: Date.now}
})

var ChatModel = mongoose.model('Message', chatSchema)

module.exports.ChatModel = ChatModel