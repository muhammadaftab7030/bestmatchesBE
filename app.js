
const express = require('express');
const app = express()
const profile_details = require('./profile');

// require('./src/db/conn');
// const searchPeople = require('./src/API/api_call');
  
  const port = process.env.PORT || 8000
// parses the JSON data and adds it into req body
app.use(express.json())

app.get("/", async (req,res)=>{
 const profile_detail = await profile_details()
   res.status(200).send(profile_detail) 
})

app.listen(port, ()=>{
    console.log(`I am listening to port ${port}`)
})