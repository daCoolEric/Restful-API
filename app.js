const express = require ("express");
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors')
const postRoutes = require ('./routes/posts');
require('dotenv/config');

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postRoutes);
 
app.get('/', (req,res)=>{
    res.send("<h1>We are on home</h1>");
    
})

//connect to DB
mongoose.connect(process.env.DB_CONNECTION)
  .then(()=>console.log('connected to DB'))
  .catch(e=>console.log(e));

app.listen(3000);

