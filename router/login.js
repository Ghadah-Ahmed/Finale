const express = require("express");
const mongoose = require('mongoose');
const AdminSchema = require("../schema/AdminSchema");
const UserSchema = require("../schema/UserSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let router = express.Router();
const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);


router.post('/login', (req, res) => {
    Admin.findOne({email: req.body.email}, (err, dbUser) => {
        if (!dbUser) {
            User.findOne({email: req.body.email}, (err, dbUser) => {
                if (!dbUser) {
                    return res.status(404).json({message: "user not found"});
                } else {
                    passwordHash(dbUser, 'branch')
                };
              }); 
        } else {
            passwordHash(dbUser, 'admin')
        };
      }); 

      function passwordHash(dbUser, role) {
        bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
            if (err) { // error while comparing
                res.status(502).json({message: "error while checking user password"});
            } else if (compareRes) { // password match
                const token = jwt.sign({ email: req.body.email, role: role }, 'secret', { expiresIn: '1h' });
                res.status(200).json({message: "user logged in", "token": token, "dbUser": dbUser, "role": role});
            } else { // password doesnt match
                res.status(401).json({message: "invalid credentials"});
            };
        });
     }
  });
  


  router.post('/signup', (req, res) => {
    // checks if email already exists
    Admin.findOne({email: req.body.email}, (err, dbUser)=>{
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return Admin.create(({...req.body,
                        password: passwordHash
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
  });

  router.post('/signbranch', (req, res) => {
    // checks if email already exists
    User.findOne({email: req.body.email}, (err, dbUser)=>{
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({...req.body,
                        password: passwordHash
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
  });
  
  module.exports = router;