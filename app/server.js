var http = require("http");
var url = require("url");
var util = require('util');

function start(route) {
	function onRequest(req, res) {
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(pathname);

		res.writeHead(200, {
			"Content-Type": "text/plain"
		});
		res.write("Hello World");
		var params = url.parse(req.url, true).query;
		res.write("网站名：" + params.name);
		res.write("\n");
		res.write("网站 URL：" + params.url);
		res.end();
	}

	http.createServer(onRequest).listen(3000);
	console.log("Server has started.");
}

function post(route) {
	var querystring = require('querystring');
	var fs = require("fs");

	http.createServer(function(req, res) {
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(pathname);

		var body = "";
		req.on('data', function(chunk) {
			body += chunk;
		});
		req.on('end', function() {
			// 解析参数
			body = querystring.parse(body);
			// 设置响应头部信息及编码
			res.writeHead(200, {
				'Content-Type': 'text/html; charset=utf8'
			});

			if (body.name && body.url) { // 输出提交的数据
				res.write("网站名：" + body.name);
				res.write("<br>");
				res.write("网站 URL：" + body.url);
			} else { // 输出表单
				var data = fs.readFileSync('index.html');
				res.write(data.toString());
			}
			res.end();
		});
	}).listen(3000);
}

exports.start = start;
exports.post = post;