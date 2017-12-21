import { createSelector } from "reselect";
import { NOTES_FETCHED, NOTE_CREATED } from "../types";

export default function notes(state = {}, action = {}) {
  switch (action.type) {
    case NOTES_FETCHED:
    case NOTE_CREATED:
      return { ...state, ...action.data.entities.notes };
    default:
      return state;
  }
}

// SELECTORS

export const notesSelector = state => state.notes;

export const allNotesSelector = createSelector(notesSelector, notesHash =>
  Object.values(notesHash)
);
