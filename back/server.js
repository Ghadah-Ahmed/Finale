const express = require("express")
const app = express()
const cors = require("cors");
const POTR = process.env.POTR || '8080';
const mongoose = require('mongoose');

const Menu = require('./router/menu')
const Users = require('./router/users')

app.use(express.json())
app.use(cors({origin: `http://localhost:${POTR}`}))

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/finale');
}


app.use('/menu', Menu)
app.use('/users', Users)



app.listen(POTR, function () {
     console.log(`Example app listening on port 8080! ${POTR}`)
})