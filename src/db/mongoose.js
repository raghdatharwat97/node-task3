const mongoose = require("mongoose");

// create connection
mongoose.connect("mongodb://127.0.0.1:27017/node-task3-api", {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false});
