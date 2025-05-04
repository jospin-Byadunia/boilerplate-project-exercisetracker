const mongoose = require('mongoose');
const app = require('./index');
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });


const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  console.log(DB)
mongoose.connect(DB).then(() => console.log("DB connection successful")).catch((err)=>{
    console.log(`Error connecting to the DB`);
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })