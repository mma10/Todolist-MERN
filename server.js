const express = require('express')
const mongoose = require('mongoose')
const auth = require('./middleware/authMiddleware')
const path =  require('path')
//const cors = require('cors');

var app = express();

app.use(express.static('public'));
app.use(express.json());

const db = process.env.MONGODB_URI || require('./config/keys').mongoURI;

mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
.catch(err => {
  console.log('error connecting to database');   
});
mongoose.connection.once('open',function(){ 
    console.log('connection made'); 
    
    app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
    
      // Pass to next layer of middleware
      next();
    });

    //app.use(cors());

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
        
    const port = process.env.PORT || 4000;    
    
    app.listen(port);
});