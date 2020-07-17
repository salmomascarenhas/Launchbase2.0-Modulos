const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express:server,
    autoescape:false,
    noCache: true
});

server.get('/', function(req,res) {
    const about = {
        avatar_url: 'https://avatars3.githubusercontent.com/u/37513299?s=460&u=80644fdd0b79e278095ef700453531b0803ae978&v=4',
        name: 'Salmo Mascarenhas',
        role: 'Estudante',
        description: 'Estudando as tecnologias: Javascript, Node.js , React.js e React Native',
        links : [ 
            { name: 'Github', url: 'https://github.com/salmomascarenhas'},
            { name: 'Linkedin', url: 'https://www.linkedin.com/in/salmomascarenhas/'},
            { name: 'Instagram', url: 'https://www.instagram.com/salmomascarenhas/'},
        ]
    };

    return res.render('about', { about });
});

server.get('/portfolio', function(req, res) {
    return res.render('portfolio', {items: videos});
});

server.get('/video', function(req, res) {
    const id = req.query.id;

    const video = videos.find( video => video.id === id);
    
    if(!video){
        return res.send('Video not found!');
    }
    
    return res.render('video', { video });
});


server.listen(5000, function(){
    console.log('Server is running');
});