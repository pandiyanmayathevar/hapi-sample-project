'use strict'

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 3001, host:'localhost'});

server.route({
    method: 'GET',
    path: '/',
    handler: function(req, reply){
        reply('hello world');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (req, res) => {
        res(encodeURIComponent(req.params.name));
    }
});

server.register(require('inert'), (err)=>{
    if (err){
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: (req, res)=>{
            res.file('./public/hello.html');
        }
    })
})

server.start((err)=>{
    if(err){
        throw err;
    }
    console.log('server started at: ' + server.info.uri);
})


