const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')

const connectDB = async() => {
  await mongoose.connect('mongodb+srv://bsmith672:smith123@cluster0.xdxj3gv.mongodb.net/test?retryWrites=true&w=majority');
  console.log(`the database is connected to the`);
  
}
connectDB();
app.get('/', (req, res) => {S
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})