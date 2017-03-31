// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();   // events 模块只提供了一个对象：events.EventEmitter。

function events(eventEmitter) {

    // 创建事件处理程序
    var connectHandler = function connected() {
        console.log('连接成功。');
        // 触发 data_received 事件 
        this.emit('data_received'); // this 就是eventEmitter对象
    }

    // 绑定 connection 事件处理程序
    eventEmitter.on('connection', connectHandler);

    // 使用匿名函数绑定 data_received 事件
    eventEmitter.on('data_received', function() {
        console.log('数据接收成功。');
    });

    // 触发 connection 事件 
    eventEmitter.emit('connection');

    console.log("程序执行完毕。");
}
// events(emitter);
/**
 * 输出结果：
 * 连接成功。
 * 数据接收成功。
 * 程序执行完毕。
 */

function event1(event) {
    event.on('some_event', function() {
        console.log('some_event 事件触发');
    });
    setTimeout(function() {
        event.emit('some_event');
    }, 1000);
    console.log('程序执行结束');
}
// event1(emitter);

/**
 * 当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
 */
function event2(event) {
    event.on('someEvent', function(arg1, arg2) {
        console.log('listener1', arg1, arg2);
    });
    event.on('someEvent', function(arg1, arg2) {
        console.log('listener2', arg1, arg2);
    });
    event.emit('someEvent', 'arg1 参数', 'arg2 参数');
}
// event2(emitter);

function event3(event) {
    event.once('someEvent', function(arg1, arg2) {
        console.log('listener1', arg1, arg2);
    });
    event.emit('someEvent', 'arg1 参数', 'arg2 参数');
    event.emit('someEvent', 'arg3 参数', 'arg4 参数'); // 这条语句执行没有结果，事件被移除了
}
// event3(emitter);

function event4(event) {
    var callback = function(stream) {
        console.log('someone connected!');
    };
    event.on('connection', callback);
    event.emit('connection');
    // ...
    event.removeListener('connection', callback);
    event.emit('connection'); // 执行，但没有回调
}
// event4(emitter);

function event5(event) {
    var callback = function(stream) {
        console.log('someone connected!');
    };
    event.on('connection', callback);
    console.log(event.listeners('connection'));
}
// event5(emitter);

function event6(event) {
    var callback = function(stream) {
        console.log('someone connected!');
    };
    event.on('newListener', function() {
        console.log('new a newListener');
    });
    // 下面的事件将触发newListener
    event.on('removeListener', function() {
        console.log('remove a newListener');
    });
    event.on('connection', callback);
    event.emit('connection');
    // ...
    event.removeListener('connection', callback);
    event.emit('connection'); // 执行，但没有回调
}
// event6(emitter);
/**
 * 执行结果：
 * new a newListener
 * new a newListener
 * someone connected!
 * remove a newListener
 */

// emitter.emit('error');