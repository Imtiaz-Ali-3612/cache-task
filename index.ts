const express       = require('express')
const bodyParser    = require('body-parser')
const mongoose      = require('mongoose')
const controller    = require('./controller')
const dotEnv        = require('dotenv').config()
const app=express()
app.use(bodyParser.json())
var query = process.env.MONGODB_URL
 
const db = (query);
mongoose.Promise = global.Promise;
 
mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log("Error!" + error);
    }else{
        console.log('Mongodb Connected !!')
    }
});


app.get('/all',controller.getAllKeys) // get all keys
app.get('/key/:key',controller.getKey) // get key valye
app.post('/key',controller.insertKey) // add new key values
app.delete('/key/:key',controller.removeKey) // remove particular key
app.delete('/all',controller.removeAllKeys) // remove all keys


app.listen(3040,()=>{
    console.log('listening at 3040')
})

module.exports={

    getAllKeys:getAllKeys,
    getKey:getKey,
    insertKey:insertKey,
    removeKey:removeKey,
    removeAllKeys:removeAllKeys
}