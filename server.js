const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/Blockchain-Cow-Milk'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.listen(port, () => console.log("running .. "));
