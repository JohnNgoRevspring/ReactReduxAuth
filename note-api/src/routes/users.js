import express from "express";
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../mailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthModel from "../models/AuthModel";

const queries = require('../db/queries');
const table = 'user';

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, password } = req.body.user;
  let user = {
    name: name,
    email: email,
    password: password
  };
  var u = new AuthModel(u);
  user.password_hash = u.setPassword(password);
  user.confirmation_token = u.setConfirmationToken();
  queries
      .create(table, user)
      .then(ids => {
        res.json({ user : u.toAuthJSON() });
      })
    .catch(err => {
      let errors = { global: 'db unable to create a new user' };
      if (err.constraint === 'user_email_unique') {
         errors = {email:'This email already taken'};
      }
      res.status(400).json({errors: errors});
    });
});

export default router;
