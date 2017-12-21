import express from "express";
import request from "request-promise";
import { parseString } from "xml2js";
import authenticate from "../middlewares/authenticate";
//import Note from "../models/Note";
import parseErrors from "../utils/parseErrors";

const router = express.Router();
router.use(authenticate);

const queries = require('../db/queries');
const table = 'note';

function validNote(note) {
  return typeof note.title == 'string' &&
          note.title.trim() != '' &&
          typeof note.priority != 'undefined' &&
          !isNaN(Number(note.priority));
}

router.get('/', (req, res) => {
  console.log('get:/' + req.query);
  const limit = req.query.limit;
  let user_id = req.currentUser._id || 1;
  if (limit === undefined) {
    queries.getAllByUser(table, user_id)
      .then(notes => {
        res.json(notes);
      });
  } else {
    const start = req.query.start || 1;
    const order = req.query.order || 'desc';
    //console.log('limit:' + limit + ';start:'+ start + ';order:' + order + ';user_id:' + user_id);
    queries.getPageByUser(table, limit, start, order, user_id)
      .then(notes => {
        res.json(notes);
      });
  }
});

router.get("/", (req, res) => {
  queries.getAllByUser(table,req.currentUser._id)
          .then(notes => res.json({ notes }))
          .catch (
            () => res.status(400).json({ errors: { global: "get note by user error" } })
          );
  //Note.find({ userId: req.currentUser._id }).then(notes => res.json({ notes }));
});

router.post("/", (req, res) => {
  const note = {
    title : req.body.title,
    user_id: req.currentUser._id
  };
  if (req.body.id != undefined){
    note.id = req.body.id;
    note.created_at = new Date();
  }
  if (validNote(req.body)) {
    queries.create(table, note)
            .then(note => res.json({ note }))
            .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  } else {
    res.status(400).json({ errors: parseErrors(err.errors) });
  }
});

router.get("/search", (req, res) => {
  res.status(400).json({ errors: 'not implement note search yet' });
  // request
  //   .get(
  //     `https://www.goodreads.com/search/index.xml?key=${process.env
  //       .GOODREADS_KEY}&q=${req.query.q}`
  //   )
  //   .then(result =>
  //     parseString(result, (err, goodreadsResult) =>
  //       res.json({
  //         notes: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
  //           work => ({
  //             goodreadsId: work.best_note[0].id[0]._,
  //             title: work.best_note[0].title[0],
  //             authors: work.best_note[0].author[0].name[0],
  //             covers: [work.best_note[0].image_url[0]]
  //           })
  //         )
  //       })
  //     )
  //   );
});

router.get("/fetchPages", (req, res) => {
  res.status(400).json({ errors: 'not implement note fetchPages yet' });
  // const goodreadsId = req.query.goodreadsId;

  // request
  //   .get(
  //     `https://www.goodreads.com/note/show.xml?key=${process.env
  //       .GOODREADS_KEY}&id=${goodreadsId}`
  //   )
  //   .then(result =>
  //     parseString(result, (err, goodreadsResult) => {
  //       const numPages = goodreadsResult.GoodreadsResponse.note[0].num_pages[0];
  //       const pages = numPages ? parseInt(numPages, 10) : 0;
  //       res.json({
  //         pages
  //       });
  //     })
  //   );
});

export default router;
