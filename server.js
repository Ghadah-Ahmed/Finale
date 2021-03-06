const express = require("express")
const app = express()
const cors = require("cors");
const POTR = process.env.POTR || 8080;
const mongoose = require('mongoose');
const Menu = require('./router/menu')
const Users = require('./router/users')
const Missing = require('./router/missing')
const Admin = require('./router/admin')
const Section = require('./router/section')
const Login = require('./router/login')
const auth = require("./middleware/auth");
const path = require("path");

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

// app.use('/', express.static(path.join(__dirname, '/front/build')));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "front/build/index.html"));
// });



app.use('/admin', auth, Admin)
app.use('/users', Users)
app.use('/menu', Menu)
app.use('/section', Section)
app.use('/missing', auth, Missing)
app.use('/log', Login)

app.listen(process.env.PORT || 8080, () => {
  console.log("app work");
  if (process.env.NODE_ENV === "production") {
    // app.set(PORT, 3001);
    app.use("/", express.static(path.join(__dirname, "/front/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname + "/front/build", "index.html"));
    });
  } else app.set(PORT, process.env.PORT || 8080);
});

// app.listen(POTR, function () {
//      console.log(`Example app listening on port 8080! ${POTR}`)
// })