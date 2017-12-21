import jwt from "jsonwebtoken";
import AuthModel from '../models/AuthModel';

const queries = require('../db/queries');
const table = 'user';

export default (req, res, next) => {
  console.log('authenticate.req.body=' + req.body)
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
        queries.getOneByColumn(table, 'email', decoded.email)
                .then(user => {
                  req.currentUser = user;
                  next();
                });
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
};
