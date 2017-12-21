import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoteForm from "../forms/NoteForm";
import { createNote } from "../../actions/notes";

class NewNotePage extends React.Component {
  submit = data =>
    this.props.createNote(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
        <NoteForm submit={this.submit} />
      </div>
    );
  }
}

NewNotePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  createNote: PropTypes.func.isRequired
};

export default connect(null, { createNote })(NewNotePage);