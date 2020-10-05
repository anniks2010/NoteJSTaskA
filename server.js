const express =require('express');
const ejs=require('ejs');
const bodyParser = require('body-parser');
const axios=require('axios');
const app=express();


app.set('view engine',ejs);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    
    res.render('index.ejs', {country: ''});
 });

app.post('/',(req, res)=>{
    let country=req.body.country;
    let url=`https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    console.log(country);
    
    axios.get(url).
    then(function(response){
        console.log(response.country);
        let countryObjects=response.data[0];
        res.render('index.ejs',{country:countryObjects});

        
    }).
    catch(function(error){
        console.log(error);
        
    });      
        

});

app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
    });