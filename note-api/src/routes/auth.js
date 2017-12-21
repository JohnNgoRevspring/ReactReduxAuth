import express from "express";
import jwt from "jsonwebtoken";
import AuthModel from "../models/AuthModel";
import { sendResetPasswordEmail } from "../mailer";

const queries = require('../db/queries');
const table = 'user';

const router = express.Router();

router.post("/reset_password", (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid token" } });
    } else {
      queries.getOne(table, decoded._id)
          .then(user => {
            var ur = new AuthModel(user);
            queries
              .update(table, user.id, {password_hash: ur.setPassword()})
              .then(() => res.json({}));
          }).catch(
            () => res.status(404).json({ errors: { global: "Invalid token" } })
          )
    }
  });
});

router.post("/reset_password_request", (req, res) => {
  queries.getOneByColumn(table, 'email', req.body.email)
      .then(user => {
        if (user) {
          sendResetPasswordEmail(user);
          res.json({});
          } else {
            res.status(400).json({ errors: { global: "There is no user with such email" } });
          }
      }).catch (() => res.status(400).json({ errors: { global: "Invalid credentials" } })
      )
});

router.post("/confirmation", (req, res) => {
  const token = req.body.token;
  queries.getOneByColumn(table, 'confirmation_token', token)
           .then(user => {
            queries
              .update(table,user.id,{confirmation_token:"", confirmed:true})
              .then(
                 u => {
                   var ur = new AuthModel(u);
                  res.json({ user: ur.toAuthJSON() });
              }).catch (
                () => 
                 res.status(400).json({})
               );
             }).catch (
               () => res.status(400).json({ errors: { global: "Invalid credentials" } })
             );
});

router.post("/", (req, res) => {
  const { credentials } = req.body;
  queries.getOneByColumn(table, 'email', credentials.email)
          .then(user => {
            var u = new AuthModel(user);
            if (user && u.isValidPassword(credentials.password)) {
                res.json({ user: u.toAuthJSON() });
              } else {
                res.status(400).json({ errors: { global: "Invalid credentials" } });
              }
            }).catch (
              () => res.status(400).json({ errors: { global: "Invalid credentials" } })
            );
});

router.post("/validate_token", (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  });
});

export default router;
