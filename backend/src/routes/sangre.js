const express = require('express');
const Sangre = require('./../models/sangre');
const app = express();

app.get("/sangres/", function (req, res){  
    Sangre.find().sort( {code:1 } )   
    .then(product => {
        console.log('GET /sangres')
        return res.status(200).jsonp(product);
    })
    .catch(err => {
        return res.send(500, err.message);
    });
});

app.get("/sangres/:id", function (req, res){  
    let id = req.params.id;
    Sangre.find({_id: id}).sort( {code:1 } )   
    .then(product => {
        console.log('GET /sangres')
        return res.status(200).jsonp(product);
    })
    .catch(err => {
        return res.send(500, err.message);
    });
});

app.post("/sangres/", function (req, res){
    let body = req.body; 
    let {code, name, level, type, content, createBy} = body;
    
    let sangre = new Sangre({
        code,
        name,
        level,
        type,
        content,
        createBy
    });

    sangre.save().then(sangres => {
        console.log(sangres)

        res.json({
            ok: true,
            sangre: sangres
        });
    })
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err,
        });
    });
    
});

app.put("/sangres/:id", function (req, res){
    let id = req.params.id;
    let body = req.body;
    let {code,name,level,type,content,createBy} = body;

    let arrayUpdate = { 
                    code,
                    name,
                    level,
                    type,
                    content,
                    createBy
                };

    Sangre.updateOne({_id: id}, { $set: arrayUpdate})
    .then(data => {
        console.log(data)
        res.json({
            ok: true,
        });
    })
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err,
        });
    });
});

app.delete("/sangres/:id", function (req, res){
    let id = req.params.id;
    Sangre.deleteOne({_id: id})
    .then(data => {
        console.log(data)
        res.json({
            ok: true,
        });
    })
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err,
        });
    });
})


module.exports = app;