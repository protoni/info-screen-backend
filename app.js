const express = require("express");
const bodyParser = require("body-parser");
var fs = require('fs'); 

let app = express();
 
app.use(bodyParser.json());
// app.use(express.static(__dirname+"/public_www"));

function getRandomIndex(list) {

    return Math.floor(Math.random()*list.length); 
}

function readConfig() {
    let raw = fs.readFileSync("config.json");
    let json = JSON.parse(raw);

    return json;
}

function getImagesFromConfig() {
    let config = readConfig();

    return config.images;
}

function getNewsFromConfig() {
    let config = readConfig();

    return config.news;
}


function getRandomImage() {
    const images = getImagesFromConfig();
    const index = getRandomIndex(images);

    return images[index];
}

app.get("/one", function(req, res) {
    
    const arr = {};
    

    const random = getRandomImage()
    arr.image = random;
    console.log(arr);
	return res.status(200).json(arr);
});

app.get("/all", function(req, res) {
    
    const arr = {};
    const images = getImagesFromConfig();

    arr.images = images;
    console.log(arr);
	return res.status(200).json(arr);
});

app.get("/news", function(req, res) {
    
    const arr = {};
    const news = getNewsFromConfig();

    
    arr.news = news;
    console.log(arr);
	return res.status(200).json(arr);
});

/* Multiple promises test */

function createPromise(data) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(data);
            
          }, 1000);
    })
}


function getPromises(){
    let datas = ["1", "2", "3"];

    let promises = datas.map(item => createPromise(item));
    
    let arr = []
    return Promise.all(promises)
    .then(function(data) {
        return data;
        /*
        return {
            "1":data[0],
            "2":data[1],
            "3":data[2]
        } */
    });
} 

/*
function getPromises(){
    let promises = ["1", "2", "3"];

    for(let i = 0; i < 3; i += 1) {
        let promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(i);
                
              }, 1000);
        })

        promises.push(promise);
    }
    return promises;
} */

app.get("/test", function(req, res) {
    
    let promises = getPromises();
    promises.then(data => {
        console.log(data);
    })
/*
    Promise.all(promises).then(values => {
        // do stuff with values here
        console.log(values[0]);
        console.log(values[1]);
        console.log(values[2]);
      });*/

	return res.status(200).json(promises);
});

app.listen(3001);
console.log("Running in port 3001");