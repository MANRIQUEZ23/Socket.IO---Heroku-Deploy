
// servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const path = require('path');
const Sockets = require('./sockets'); 
 

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        // http server
        this.server = http.createServer(this.app); 

        // configuraciones de sockets
        this.io = socketio(this.server , { /* Configuraciones */  }) 
    }

    middlewares(){
        this.app.use( express.static( path.resolve(  __dirname  , '../public' )  ));
    }


    configuraSockets(){
        new Sockets( this.io );

    }

    execute(){

        // inicializaer Middlewares
        this.middlewares(); 

        this.configuraSockets();

        this.server.listen( this.port, ( data ) =>{
                console.log(data);

                this.io.emit('mensaje-from-server', data);
        });
    }

}


module.exports = Server;