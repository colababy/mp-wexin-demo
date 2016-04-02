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

module.exports = wechat(config, function (req, res, next) {
	var message = req.weixin;

	if (message.MsgType != 'text') {
		res.reply('Only Text Message Accepted.');
	} else {
		execCommand(message.Content, res);
	}
});

function execCommand(command, res){
	console.log(command);
	exec(command, options, function(err, stdout, stderr){
		res.reply(stdout);
		if(err) {
			res.reply(stderr);
		}
	});
}
