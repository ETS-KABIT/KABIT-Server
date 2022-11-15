console.log("hello");

const {readFile, readFileSync} = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('http');
const { pathToFileURL } = require('url');
const path = require('path');


const app = express();

app.set("view engine", "ejs");

 
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//temp shit hashing function, replace before final ver.
function hashCode(s) {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
};


app.use(express.static('./KABIT-Client/'));


app.post('/kontrola', urlencodedParser, (request, response) =>
{
    console.log("log-in request");

    //add database credential search by username, and password hash check
    //*temp. static values for testing
    if(request.body.username == "hello" && hashCode(request.body.password) == "3329")
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


app.listen(process.env.PORT || 80, () => console.log("Running on port 80"))


