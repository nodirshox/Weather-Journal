// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get('/all', (req, res) => {
    res.send(projectData)
})

app.post('/add', addWeather);

function addWeather(req,res){
    projectData.temp = req.body.temperature,
    projectData.date = req.body.date,
    projectData.res = req.body.response
}
// Setup Server
const port = 3000
app.listen(port, running())

function running() {
    console.log("Server started on " + port)
}