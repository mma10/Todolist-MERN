const express = require('express')
const mongoose = require('mongoose')
const auth = require('./middleware/authMiddleware')
const path =  require('path')
const cors = require('cors');

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
       
    app.use(cors());

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