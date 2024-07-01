const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/userExerciseRoute');
const bodyParser = require('body-parser');

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



app.use('/api/users', router);



module.exports=app