$(document).ready(function () {
	var socket 		= io.connect(),
		$msg_form 	= $('#send-message'),
		$chat 		= $('#chat'),
		$msgBox		= $('#message'),
		$nick_form	= $('#set-nick'),
		$nick 		= $('#nick'),
		$nick_box 	= $('#nick-wrap'),
		$users_list	= $('#users-list'),
		$content	= $('#content-wrap');

	$msg_form.on('submit', function (event) {
		event.preventDefault();
		socket.emit('send message', $msgBox.val(), function(data){
			$chat.append('<div class="panel alert">'+data+'</div>');
		});
		$msgBox.val('');
	});

	$nick_form.on('submit', function (event) {
		event.preventDefault();
		socket.emit('new user', $nick.val(), function(data){
			if(data) {
				$nick_box.fadeOut(function(){
					$content.fadeIn()
				});
			} else {
				$nick_form.find('.alert-box').slideDown();
			}
		});
	});

	socket.on('new message', function (data) {
		display_msg(data);
	});

	socket.on('usernames', function (data) {
		var $li = $users_list.children().first().clone();
		$users_list
			.empty()
			.append($li);
		for (var i = 0; i < data.length; i++) {
			$users_list.append( $('<li class="bullet-item">'+data[i]+'</li>') );
		};
	});

	socket.on('whisper', function (data) {
		$chat.append('<div class="panel callout"><strong>'+data.nick+':</strong> '+data.msg+'</div>');
	});

	socket.on('load old msgs', function (msgs) {
		for (var i = msgs.length-1; i >= 0 ; i--) {
			display_msg(msgs[i]);
		};
	});

	function display_msg(data) {
		$chat.append('<div class="panel"><strong>'+data.nick+':</strong> '+data.msg+'</div>');
	}

});