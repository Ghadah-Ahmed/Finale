const express = require("express")
const app = express()
const cors = require("cors");
const POTR = process.env.POTR || '8080';
const mongoose = require('mongoose');
const Menu = require('./router/menu')
const Users = require('./router/users')
const Missing = require('./router/missing')
const Admin = require('./router/admin')
const Section = require('./router/section')

app.use(express.json())
app.use(cors({origin: `http://localhost:${POTR}`}))

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/finale');
}


app.use('/admin', Admin)
app.use('/users', Users)
app.use('/menu', Menu)
app.use('/section', Section)
app.use('/missing', Missing)



app.listen(POTR, function () {
     console.log(`Example app listening on port 8080! ${POTR}`)
})