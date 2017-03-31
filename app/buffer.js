buf = new Buffer(256);


(function(buf) {
	len = buf.write("William Weijian Xu");
	console.log("写入字节数 : " + len);
}); //(buf);

(function(buf) {
	buf = new Buffer(26);
	for (var i = 0; i < 26; i++) {
		buf[i] = i + 97;
	}

	console.log(buf.toString('ascii')); // 输出: abcdefghijklmnopqrstuvwxyz
	console.log(buf.toString('ascii', 0, 5)); // 输出: abcde
	console.log(buf.toString('utf8', 0, 5)); // 输出: abcde
	console.log(buf.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcde
}); //(buf);

(function(buf) {
	buf.write("William Weijian Xu");
	console.log(buf.toJSON(buf)); // 输出一个256的数组
}); //(buf);

(function(buf) {
	var buffer1 = new Buffer('菜鸟教程 ');
	var buffer2 = new Buffer('www.runoob.com');
	var buffer3 = Buffer.concat([buffer1, buffer2]);
	console.log("buffer3 内容: " + buffer3.toString());
}); //();

(function() {
	var buffer1 = new Buffer('ABCDE');
	var buffer2 = new Buffer('ABCD');
	var result = buffer1.compare(buffer2);

	if (result < 0) {
		console.log(buffer1 + " 在 " + buffer2 + "之前");
	} else if (result == 0) {
		console.log(buffer1 + " 与 " + buffer2 + "相同");
	} else {
		console.log(buffer1 + " 在 " + buffer2 + "之后");
	}
}); //();

(function() {
	var buffer1 = new Buffer('ABC');
	// 拷贝一个缓冲区
	var buffer2 = new Buffer(3);
	buffer1.copy(buffer2,0,1);	// buffer1.copy(buffer2, 1); 将不能得到完成拷贝，可能是buffer2第二个位置为空吧
	console.log("buffer2 content: " + buffer2.toString());
})();