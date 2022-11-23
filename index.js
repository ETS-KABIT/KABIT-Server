console.log("hello");

const {readFile, readFileSync} = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('http');
const { pathToFileURL } = require('url');
const path = require('path');
const { response } = require('express');
const mqtt = require('mqtt');

const app = express();

const client = mqtt.connect("mqtt://10.6.60.51:1883");

client.on('connect', () =>
{
    console.log("MQTT Client connected")

});

app.set("view engine", "ejs");

 
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//password hashing function
function hashCode(str, seed = 0) 
{
    let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) 
    {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
  
     h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};


app.use(express.static('./KABIT-Client/'));


app.post('/kontrola', urlencodedParser, (request, response) =>
{
    console.log("log-in request");

    //add database credential search by username, and password hash check
    //*temp. static values for testing
    if(request.body.username == "hello" && hashCode(request.body.password) == 4295414792258359)
    {
        console.log("login suc");
        readFile('./KABIT-Client/kontrola/index.html', 'utf-8', (err, html) =>
        {
            if(err) response.send(err);
            response.send(html);
        });
    }
    else
    {
        console.log("login err");
        readFile('./KABIT-Client/index.html', 'utf-8', (err, html) =>
        {
            if(err) response.send(err);
            response.send(html);
        });
    }
});


app.get('/pregled', (request, response) =>
{
    response.render("pregled");
});


app.post('/kontrola/dnevna-soba', jsonParser, (request, response) =>
{
    console.log(request.body);
    console.log("hello");
    client.publish('led-hodnik', request.body.slider);
    response.send("oksi");

});


app.post('/kontrola/hodnik', urlencodedParser, (request, response) =>
{
    console.log(request.body.slider);
    client.publish('led-dnevna', request.body.slider);
    response.send("oksi");

});

app.post('/kontrola/kupatlo', urlencodedParser, (request, response) =>
{
    console.log(request.body.slider);
    client.publish('led-kupatilo', request.body.slider);
    response.send("oksi");

});

app.post('/kontrola/soba-1', urlencodedParser, (request, response) =>
{
    console.log(request.body.slider);
    client.publish('led-soba1', request.body.slider);
    response.send("oksi");

});

app.post('/kontrola/soba-2', urlencodedParser, (request, response) =>
{
    console.log(request.body.slide);
    client.publish('led-soba2', request.body.slider);
    response.send("oksi");

});

app.post('/kontrola/stepenice', urlencodedParser, (request, response) =>
{
    console.log(request.body.slider);
    client.publish('led-stepenice', request.body.slider);
    response.send("oksi");

});

app.get('/request/temp/prizemlje', urlencodedParser, (request, response) =>
{
    response.send("hello");
});

app.listen(process.env.PORT || 80, () => console.log("Running on port 80"));


