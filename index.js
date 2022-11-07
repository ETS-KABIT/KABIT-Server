console.log("hello");

const {readFile, readFileSync} = require('fs');

const express = require('express');
const { request } = require('http');

const app = express();

app.get('/', (request, response) =>
{
    readFile('./home.html', 'utf8', (err, html) =>
    {
        if(err)
        {
            response.status(500).send('error, cant load html')
        }
        
        response.send(html);

    })
});

app.listen(process.env.PORT || 80, () => console.log("Running on http://10.10.10.100:80"))
