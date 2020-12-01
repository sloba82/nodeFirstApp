const EventEmitter = require('events');
const emitter = new EventEmitter();


emitter.on('messageLogged', (arg) => {
    console.log('listener called', arg);
});

// sgnalizuje da se nesto desilo
emitter.emit('messageLogged', { id:1, url: 'http://'});
