const express = require('express')
const mongoose = require('mongoose')
const auth = require('./middleware/authMiddleware')
const path =  require('path')

var app = express();

app.use(express.static('public'));
app.use(express.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
.catch(err => {
  console.log(err);   
});
mongoose.connection.once('open',function(){ 
    console.log('connection made'); 
    
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");        
        res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
        next()
      });

    app.use('/api/item',require('./Routes/taskRoutes')); 
    app.use('/api/user',require('./Routes/userRoutes'));    
    app.use('/api/auth',require('./Routes/authRoutes'));

    // serve statis assets if in production

    if(process.env.NODE_ENV == 'production'){
      app.use(express.static('todolist/build'));            
      app.get('*',(req,res) => {
          res.sendFile(path.resolve(__dirname,'todolist','build','index.html'))
      })
    }
        
    const port = process.env.PORT || 5000;    
    
    app.listen(port);
});