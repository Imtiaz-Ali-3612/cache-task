const cache     = require('./models/cache')
const generics  = require('./generics')
const config =require('./config')
const getAllKeys = (req,res)=>{
    cache.find({}).then(result=>{
        console.log('result',result);
        res.status(200).send(result);
    })
}

const getKey =(req,res)=>{
      let key=req.params.key;
      cache.findOne({"entry.key":key}).then(result=>{
        
        if(result){
            console.log('Cache Hit !')
            
      
            let difference=new Date()-result.dateCreated;
            if(difference>config.cacheTTL){
                
                let randString = generics.generateString();
                let entry={
                    key:key,
                    value:randString
                }
                let newEntry=new cache({
                    dateCreated:new Date(),
                    entry:entry
                })
                newEntry.save();
                res.status(200).send({key:key,value:randString})

            }else{
               res.status(200).send({key:key,value:result.entry.value})

            }
           
        }else{
            let randString = generics.generateString();
            console.log('Cache Miss !')
            let entry={
                key:key,
                value:randString
            }
            let newEntry=new cache({
                dateCreated:new Date(),
                entry:entry
            })
            newEntry.save();
            res.status(200).send({key:key,value:randString})


        }
      })
}

const insertKey =(req,res)=>{
    let entry={
        key:req.body.key,
        value:req.body.value
    }
    cache.findOneAndUpdate({"entry.key":entry.key},{entry:entry}).then(result=>{
        if(result){
            res.status(200).send({message:" entry updated"});
        }else{
            let newEntry=new cache({
                dateCreated:new Date(),
                entry:entry
            })
            newEntry.save();
            res.status(200).send({message:"new entry added"});
        }
    })
   
}

const removeKey = (req,res)=>{
    let key=req.params.key;
    cache.findOneAndRemove({"entry.key":key}).then(res=>{
        res.status(200).send({message:"entry removed"});
    })

}  
const removeAllKeys = (req,res)=>{
    let key=req.params.key;
    cache.findAndRemove({}).then(res=>{
        res.status(200).send({message:"all entries removed"});
    })

}  