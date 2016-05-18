var exec = require('child_process').exec;
var wechat = require('wechat');

var config = {
	token: 'superpi',
	appid: 'wx1833a56d86b539c6',
	encodingAESKey: 'B1dOEIDmw50nsE3rtnClD1BuaThITnX5VLeW96wsXrQ'
};

var options = {
	encoding: 'utf8',
	timeout: 0,
	maxBuffer: 200*1024,
	killSignal: 'SIGTERM',
	cwd: '/home/pi'
}

var commands = {
	music_start:'/home/pi/player.sh start',
	music_next:'/home/pi/player.sh next',
	music_prev:'/home/pi/player.sh prev',
	music_random:'/home/pi/player.sh random',
	music_stop:'/home/pi/player.sh stop',

	volume_0:"amixer set PCM -- 0%",
	volume_70:"amixer set PCM -- 70%",
	volume_80:"amixer set PCM -- 80%",
	volume_90:"amixer set PCM -- 90%",
	volume_100:"amixer set PCM -- 100%"
}

module.exports = wechat(config, function (req, res, next) {
	var message = req.weixin;

	if (message.MsgType == 'text') {
		execCommand(message.Content, res);
	} else if(message.MsgType == 'event' && message.Event == 'CLICK') {
		var command = commands[message.EventKey];
		if(command){
			//res.reply(command);
			execCommand(command, res);
			return;
		}
		res.reply('Unknown Command : ' + command);
	}
});

function execCommand(command, res){
	console.log(command);
	exec(command, options, function(err, stdout, stderr){
		if(err) {
			if(res){
				res.reply(stderr.trim());
			}
			console.error(stderr.trim());
			return;
		}
		if(res){
			console.log(stdout.trim());
			res.reply(stdout.trim());
		}
	});
}
