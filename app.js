const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    
    const url = "https://v2.jokeapi.dev/joke/Any";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const jokeData = JSON.parse(data);
            const type = jokeData.type;
            if (type === "twopart"){
                const part1 = jokeData.setup;
                const part2 = jokeData.delivery;
                var j = part1 +" " + part2
                res.render("list", { jokeView: j });

            }
            else{
                const part = jokeData.joke;
                res.render("list", { jokeView: part });
            }
        })
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("App is listening on port 3000");
})