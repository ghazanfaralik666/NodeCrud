
'use strict';


const express = require('express'),
const   bodyParser = require('body-parser'),
const   mongoose = require('mongoose');


var ObjectId = mongoose.ObjectId;


var User = require('./models/User');


const app = express();

mongoose.connect('mongodb://localhost/nodejscrud', { useNewUrlParser: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/user/insert', (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("your data is saved successfully");
        })
        .catch(err => {
            res.status(400).send("error in saving data");
        });
});

app.put('/user/update/:id', (req, res) => {
    var query = { _id: req.params.id };
    User.updateOne(query, { $set: { username: req.body.username, title: req.body.title, description: req.body.description } }, (err) => {
        if (err) {
            console.log(err);
        }
        res.send('your data is deleted successfully');
    })
});

app.get('/user', (req, res) => {
    User.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.send("error in getting data" + err);
        });
});

app.delete('/user/delete/:id', (req, res) =>{
    User.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            console.log(err);
        }
        res.send('your data is deleted successfully');
    })
});




const server = app.listen(3000, function () {
    const port = server.address().port

    console.log("app listening at ", port)
});