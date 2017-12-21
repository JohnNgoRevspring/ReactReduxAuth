var NoteModel = class {
  constructor(note) {
   if (note) {
    this.id = note.id;
    this.title = note.email;
    this.created_at = note.created_at;
    this.user_id = note.user_id;
   }
  }
};


export default NoteModel;
