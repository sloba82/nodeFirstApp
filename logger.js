const EventEmitter = require('events');


var url = "http://google.com";


class Logger extends EventEmitter {

    log(message){
        //Send an HTTP request

        console.log(message)

        // sgnalizuje da se nesto desilo
        this.emit('messageLogged', { id:1, url: 'http://'});
    }
}




module.exports = Logger;