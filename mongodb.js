const mongodb = require('mongodb')

// initialize connection
const MongoClient = mongodb.MongoClient
const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'node task3';

MongoClient.connect(connectionUrl,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
    if(error){
        return console.log('error')
    }
    else{
        console.log('success')
    }

    // get refrence to our database
    const db = client.db(dbName)

   

})



