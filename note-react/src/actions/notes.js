import { normalize } from "normalizr";
import { NOTES_FETCHED, NOTE_CREATED } from "../types";
import api from "../api";
import { noteSchema } from "../schemas";

// data.entities.notes
// const notesFetched = data => ({
//   type: NOTES_FETCHED,
//   data
// });

const noteCreated = data => ({
  type: NOTE_CREATED,
  data
});

export const fetchNotes = () => dispatch =>
  api.notes
    .fetchAll()
    .then(notes => {
      console.log(notes);
      //dispatch(notesFetched(normalize(notes, [noteSchema])));
    }
  );

export const createNote = data => dispatch =>
  api.notes
    .create(data)
    .then(note => dispatch(noteCreated(normalize(note, noteSchema))));
