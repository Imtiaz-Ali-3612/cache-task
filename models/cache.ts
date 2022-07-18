
 
var CacheSchema = new mongoose.Schema({
    dateCreated:Date,
    lastUsed:Date,
    entry:{
        key:String,
        value:String
    }
});
 
module.exports = mongoose.model(
    'cache', CacheSchema, 'Cache');