function Hello() {}
Hello.prototype.setName = function(thyName) {
	name = thyName;
};
Hello.prototype.sayHello = function() {
	console.log('Hello ' + name);
};
module.exports = Hello;