var app = require('express')();
var http = require('http').Server(app);
var io = require ('socket.io')(http);

app.get('/', function(req,res){

    res.sendFile(__dirname + '/chat.html');
});

io.on('connection',function(socket){
    console.log('Un usuario se ha conectado')

    var username; // variable dentro para que solo haya uno
    socket.on('crearUsuario', function(data){
        username = data;
    });

    socket.on('mensajeNuevo', function(data){

        // Con el broadcast lo que hacemos es emitir el mensaje del socket a todos lados menos al que lo envía
        socket.broadcast.emit('mensaje',{
            usuario: username,
            mensaje: data
        });

        socket.emit('mensaje',{
            usuario: username,
            mensaje: data,
        });


    });

    socket.on('mensajeNuevobold', function(data){

        // Con el broadcast lo que hacemos es emitir el mensaje del socket a todos lados menos al que lo envía
        socket.broadcast.emit('mensajebold',{
            usuario: username,
            mensajebold: data
        });

        socket.emit('mensajebold',{
            usuario: username,
            mensajebold: data
        });

    });

});

http.listen(3000, function(){
    console.log('Servidor listo en puerto 3000');
});