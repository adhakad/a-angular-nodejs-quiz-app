const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quiz', {useNewUrlParser: true, useUnifiedTopology: true,})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  
//   next();
// });


// app.use(express.static(path.join(__dirname, './dist/frontend')));
// app.use('/',express.static(path.join(__dirname,'./dist/frontend')));

app.use('/api',require('./modules/routes/question'));
app.use('/api',require('./modules/routes/quizDetail'));

// app.get('/*',(req,res) => {
//   res.sendFile(path.join(__dirname ,'./dist/frontend/index.html'));
// })


app.listen(port, () => {
  console.log(`server runing port on ${port}`);
})