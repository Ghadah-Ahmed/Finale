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
const Login = require('./router/login')
const auth = require("./middleware/auth");

app.use(express.json())
app.use(cors({origin: `http://localhost:${POTR}`}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/finale');
}


app.use('/admin', auth, Admin)
app.use('/users', Users)
app.use('/menu', Menu)
app.use('/section', Section)
app.use('/missing', auth, Missing)
app.use('/log', Login)



app.listen(POTR, function () {
     console.log(`Example app listening on port 8080! ${POTR}`)
})