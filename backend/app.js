const express = require('express');
const app = express();
const port = 3000;
const {MongoClient} = require('mongodb');
const mongoose= require('mongoose');
const authroutes = require('./routes/user')
const createRoutes = require('./routes/route');
const createFile = require('./routes/route2');
const createTest = require('./routes/route3');
const createQuestion = require('./routes/route4');
const cors = require('cors');
app.use(cors());

require('dotenv').config();

app.use(express.json());

const dbUrl = process.env.MONGO_URL;

app.get('/', (req, res) => {
  res.send('Hello Worldcourse!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

mongoose.connect(dbUrl)
.then(()=> {console.log("DB connected");})
.catch((e)=> {console.log(e);
});

app.use('/api/auth',authroutes);
app.use('/api/course',createRoutes);
app.use('/api/file',createFile);
app.use('/api/test',createTest);
app.use('/api/question',createQuestion);
