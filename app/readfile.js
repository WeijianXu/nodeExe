var fs = require("fs");
/**
 * 阻塞代码实例
 */
function readfile1(fs) {

	var data = fs.readFileSync('input.txt');

	console.log(data.toString());
	console.log("程序执行结束!");
}
// readfile1(fs);
/**
 * 输出结果：
 * hello, world!
 * 程序执行结束!
 */


/**
 * 非阻塞代码实例，异步调用实现，大大提高了程序的性能
 */
function readfile2(fs) {
	fs.readFile('input.txt', function(err, data) {
		if (err) {
			console.log(err.stack);
			return;
		}
		console.log(data.toString());
	});

	console.log("程序执行结束!");
}
// readfile2(fs);
/**
 * 输出结果：
 * 程序执行结束!
 * hello, world!
 */

(function(fs) {
	console.log("准备打开文件！");
	fs.open('input.txt', 'r+', function(err, fd) {
		if (err) {
			return console.error(err);
		}
		console.log("文件打开成功！");
	});
}); //(fs);

(function(fs) {
	console.log("准备打开文件！");
	fs.stat('input.txt', function(err, stats) {
		if (err) {
			return console.error(err);
		}
		console.log(stats);
		console.log("读取文件信息成功！");

		// 检测文件类型
		console.log("是否为文件(isFile) ? " + stats.isFile());
		console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
	});
}); //(fs);

(function(fs) {
	console.log("准备写入文件");
	fs.writeFile('input.txt', '我是通过写入的文件内容！', function(err) {
		if (err) {
			return console.error(err);
		}
		console.log("数据写入成功！");
		console.log("--------我是分割线-------------")
		console.log("读取写入的数据！");
		fs.readFile('input.txt', function(err, data) {
			if (err) {
				return console.error(err);
			}
			console.log("异步读取文件数据: " + data.toString());
		});
	});
}); //(fs);

(function(fs) {
	var buf = new Buffer(1024);
	console.log("准备打开已存在的文件！");
	fs.open('input.txt', 'r+', function(err, fd) {
		if (err) {
			return console.error(err);
		}
		console.log("文件打开成功！");
		console.log("准备读取文件：");
		fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
			if (err) {
				console.log(err);
			}
			console.log(bytes + "  字节被读取");

			// 仅输出读取的字节
			if (bytes > 0) {
				console.log(buf.slice(0, bytes).toString());
			}

			// 关闭文件
			fs.close(fd, function(err) {
				if (err) {
					console.log(err);
				}
				console.log("文件关闭成功");
			});
		});
	});
})(fs);